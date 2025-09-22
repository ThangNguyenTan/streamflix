import axios from "axios";
import type { Movie, TVShow } from "../types";

// API Configuration
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Access your API key

// TMDB API Instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const DEFAULT_POSTER_SIZE = "w500";

export type SupportedMediaType = "movie" | "tv" | "person" | "episode";

type RawMedia = Record<string, unknown>;

const isRecord = (value: unknown): value is RawMedia =>
  typeof value === "object" && value !== null;

const toMediaArray = (value: unknown): RawMedia[] =>
  Array.isArray(value) ? (value.filter(isRecord) as RawMedia[]) : [];

const getString = (item: RawMedia, key: string): string | undefined => {
  const value = item[key];
  return typeof value === "string" ? value : undefined;
};

const getNumber = (item: RawMedia, key: string): number | undefined => {
  const value = item[key];
  return typeof value === "number" ? value : undefined;
};

const getArray = (item: RawMedia, key: string): unknown[] | undefined => {
  const value = item[key];
  return Array.isArray(value) ? value : undefined;
};

export interface SearchFilters {
  type?: "all" | "movie" | "tv";
  genreId?: number;
  year?: string;
  sortBy?: "popularity.desc" | "vote_average.desc" | "release_date.desc";
}

export type SearchTab = "all" | "movie_tv" | "episodes" | "similars";

export interface SearchResult {
  id: number;
  media_type: SupportedMediaType;
  title: string;
  overview: string;
  posterPath?: string | null;
  backdropPath?: string | null;
  posterUrl?: string;
  backdropUrl?: string;
  releaseDate?: string;
  voteAverage?: number | null;
  popularity?: number | null;
  originalTitle?: string;
  genreIds?: number[];
}

export interface SearchQueryOptions {
  query: string;
  tab: SearchTab;
  filters?: SearchFilters;
}

const createImageUrl = (path?: string | null, size: string = DEFAULT_POSTER_SIZE) =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : undefined;

const resolveMediaType = (
  item: Record<string, unknown>,
  override?: SupportedMediaType
): SupportedMediaType => {
  if (override) {
    return override;
  }

  if (typeof item.media_type === "string") {
    return item.media_type as SupportedMediaType;
  }

  if ("episode_type" in item) {
    return "episode";
  }

  if ("title" in item || "original_title" in item) {
    return "movie";
  }

  return "tv";
};

const mapSearchResult = (
  item: RawMedia,
  override?: SupportedMediaType
): SearchResult => {
  const mediaType = resolveMediaType(item, override);
  const releaseDate =
    getString(item, "release_date") ??
    getString(item, "first_air_date") ??
    getString(item, "air_date") ??
    getString(item, "episode_air_date");

  const posterPath =
    getString(item, "poster_path") ??
    getString(item, "profile_path") ??
    getString(item, "still_path") ??
    null;

  const backdropPath =
    getString(item, "backdrop_path") ??
    getString(item, "still_path") ??
    getString(item, "poster_path") ??
    null;

  const directGenreIds = getArray(item, "genre_ids")?.filter(
    (value): value is number => typeof value === "number"
  );

  const fallbackGenreIds = getArray(item, "genres")
    ?.map((genre) => (isRecord(genre) ? getNumber(genre, "id") : undefined))
    .filter((value): value is number => typeof value === "number");

  const genreIds = directGenreIds ?? fallbackGenreIds;

  return {
    id: getNumber(item, "id") ?? 0,
    media_type: mediaType,
    title:
      getString(item, "title") ??
      getString(item, "name") ??
      getString(item, "original_name") ??
      getString(item, "original_title") ??
      "Untitled",
    overview: getString(item, "overview") ?? "",
    posterPath,
    backdropPath,
    posterUrl: createImageUrl(
      posterPath,
      mediaType === "episode" ? "w300" : DEFAULT_POSTER_SIZE
    ),
    backdropUrl: createImageUrl(backdropPath ?? null, "w780"),
    releaseDate,
    voteAverage: getNumber(item, "vote_average") ?? null,
    popularity: getNumber(item, "popularity") ?? null,
    originalTitle:
      getString(item, "original_title") ?? getString(item, "original_name") ?? undefined,
    genreIds,
  };
};

const applySearchFilters = (items: RawMedia[], filters?: SearchFilters) => {
  if (!filters) {
    return items;
  }

  const { type, genreId, year, sortBy } = filters;
  let filteredItems = items;

  if (type && type !== "all") {
    filteredItems = filteredItems.filter((item) => {
      const mediaType = resolveMediaType(item);
      if (type === "movie") {
        return mediaType === "movie";
      }
      if (type === "tv") {
        return mediaType === "tv" || mediaType === "episode";
      }
      return true;
    });
  }

  if (genreId) {
    filteredItems = filteredItems.filter((item) => {
      const resolvedGenreIds =
        getArray(item, "genre_ids")?.filter(
          (value): value is number => typeof value === "number"
        ) ??
        getArray(item, "genres")
          ?.map((genre) =>
            isRecord(genre) ? getNumber(genre, "id") : undefined
          )
          .filter((value): value is number => typeof value === "number") ??
        [];
      return resolvedGenreIds.includes(genreId);
    });
  }

  if (year) {
    filteredItems = filteredItems.filter((item) => {
      const dateString =
        getString(item, "release_date") ??
        getString(item, "first_air_date") ??
        getString(item, "air_date") ??
        getString(item, "episode_air_date");
      return typeof dateString === "string" && dateString.startsWith(year);
    });
  }

  if (sortBy) {
    const [field, direction] = sortBy.split(".");
    const multiplier = direction === "asc" ? 1 : -1;
    filteredItems = [...filteredItems].sort((a, b) => {
      const resolveValue = (entry: RawMedia) => {
        switch (field) {
          case "vote_average":
            return getNumber(entry, "vote_average") ?? 0;
          case "release_date":
            {
              const value =
                getString(entry, "release_date") ??
                getString(entry, "first_air_date") ??
                getString(entry, "air_date") ??
                getString(entry, "episode_air_date");
              return value ? Date.parse(value) : 0;
            }
          default:
            return getNumber(entry, "popularity") ?? 0;
        }
      };

      const aValue = resolveValue(a);
      const bValue = resolveValue(b);
      return (aValue - bValue) * multiplier;
    });
  }

  return filteredItems;
};

// Fetch Movie API Data by Category
export const fetchMoviesByCategory = async (
  category: string
): Promise<Movie[]> => {
  try {
    const response = await apiClient.get(`/movie/${category}`, {
      params: { language: "en-US", page: 1 }, // Use page=1 for now
    });

    // Return movies array
    return response.data.results.map((movie: Movie) => ({
      ...movie,
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Full poster path
      backdrop_path: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`, // Full backdrop path
    }));
  } catch (err) {
    console.error("Error while fetching movies:", err);
    return [];
  }
};

export const fetchTVShowsByCategory = async (
  category: string
): Promise<TVShow[]> => {
  try {
    const response = await apiClient.get(`/tv/${category}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching TV shows for category ${category}:`, error);
    return [];
  }
};

// Fetch genres
export const fetchGenres = async (): Promise<
  { id: number; name: string }[]
> => {
  const response = await apiClient.get("/genre/movie/list", {
    params: { language: "en-US" },
  });
  return response.data.genres;
};

export const fetchCombinedGenres = async (): Promise<
  { id: number; name: string }[]
> => {
  const [movieGenresResponse, tvGenresResponse] = await Promise.all([
    apiClient.get("/genre/movie/list", { params: { language: "en-US" } }),
    apiClient.get("/genre/tv/list", { params: { language: "en-US" } }),
  ]);

  const genresMap = new Map<number, { id: number; name: string }>();

  (movieGenresResponse.data.genres ?? []).forEach(
    (genre: { id: number; name: string }) => {
      genresMap.set(genre.id, genre);
    }
  );

  (tvGenresResponse.data.genres ?? []).forEach(
    (genre: { id: number; name: string }) => {
      if (!genresMap.has(genre.id)) {
        genresMap.set(genre.id, genre);
      }
    }
  );

  return Array.from(genresMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

export const fetchSearchResults = async ({
  query,
  tab,
  filters,
}: SearchQueryOptions): Promise<SearchResult[]> => {
  const sanitizedQuery = query.trim();

  if (!sanitizedQuery) {
    return [];
  }

  if (tab === "episodes") {
    const response = await apiClient.get("/search/tv", {
      params: {
        query: sanitizedQuery,
        include_adult: false,
        language: "en-US",
        search_type: "episode",
      },
    });

    const results = toMediaArray(response.data.results).map((item) => ({
      ...item,
      media_type: "episode",
    }));

    const filtered = applySearchFilters(results, filters);
    return filtered.map((item) => mapSearchResult(item, "episode"));
  }

  if (tab === "similars") {
    const seedResponse = await apiClient.get("/search/multi", {
      params: {
        query: sanitizedQuery,
        include_adult: false,
        language: "en-US",
      },
    });

    const seedResults = toMediaArray(seedResponse.data.results);
    const seedTitle = seedResults.find((item) => {
      const mediaType = resolveMediaType(item);
      return mediaType === "movie" || mediaType === "tv";
    });

    if (!seedTitle) {
      return [];
    }

    const similarResponse = await apiClient.get(
      `/${seedTitle.media_type}/${seedTitle.id}/similar`,
      {
        params: {
          language: "en-US",
        },
      }
    );

    const similarResults = toMediaArray(similarResponse.data.results);
    const filtered = applySearchFilters(similarResults, filters);

    return filtered.map((item) =>
      mapSearchResult(item, seedTitle.media_type as SupportedMediaType)
    );
  }

  const response = await apiClient.get("/search/multi", {
    params: {
      query: sanitizedQuery,
      include_adult: false,
      language: "en-US",
    },
  });

  let results = toMediaArray(response.data.results);

  if (tab === "movie_tv") {
    results = results.filter(
      (item) => {
        const mediaType = resolveMediaType(item);
        return mediaType === "movie" || mediaType === "tv";
      }
    );
  }

  const filtered = applySearchFilters(results, filters);

  return filtered.map((item) => mapSearchResult(item));
};

export const fetchDailyTrending = async (): Promise<SearchResult[]> => {
  const response = await apiClient.get("/trending/all/day", {
    params: { language: "en-US" },
  });

  const results = toMediaArray(response.data.results);
  return results.map((item) => mapSearchResult(item));
};
