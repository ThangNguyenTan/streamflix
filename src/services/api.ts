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
  posterUrl?: string;
  backdropUrl?: string;
  releaseDate?: string;
  voteAverage?: number | null;
  popularity?: number | null;
  originalTitle?: string;
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
  item: Record<string, any>,
  override?: SupportedMediaType
): SearchResult => {
  const mediaType = resolveMediaType(item, override);
  const releaseDate =
    item.release_date ??
    item.first_air_date ??
    item.air_date ??
    item.episode_air_date ??
    undefined;

  const posterPath =
    item.poster_path ?? item.profile_path ?? item.still_path ?? null;

  return {
    id: item.id,
    media_type: mediaType,
    title:
      item.title ??
      item.name ??
      item.original_name ??
      item.original_title ??
      "Untitled",
    overview: item.overview ?? "",
    posterUrl: createImageUrl(
      posterPath,
      mediaType === "episode" ? "w300" : DEFAULT_POSTER_SIZE
    ),
    backdropUrl: createImageUrl(item.backdrop_path ?? null, "w780"),
    releaseDate,
    voteAverage:
      typeof item.vote_average === "number" ? item.vote_average : null,
    popularity: typeof item.popularity === "number" ? item.popularity : null,
    originalTitle:
      item.original_title ?? item.original_name ?? undefined,
  };
};

const applySearchFilters = (
  items: Record<string, any>[],
  filters?: SearchFilters
) => {
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
      const genreIds =
        item.genre_ids ??
        (Array.isArray(item.genres)
          ? item.genres.map((genre: { id: number }) => genre.id)
          : []);
      return Array.isArray(genreIds) && genreIds.includes(genreId);
    });
  }

  if (year) {
    filteredItems = filteredItems.filter((item) => {
      const dateString =
        item.release_date ??
        item.first_air_date ??
        item.air_date ??
        item.episode_air_date ??
        "";
      return typeof dateString === "string" && dateString.startsWith(year);
    });
  }

  if (sortBy) {
    const [field, direction] = sortBy.split(".");
    const multiplier = direction === "asc" ? 1 : -1;
    filteredItems = [...filteredItems].sort((a, b) => {
      const resolveValue = (entry: Record<string, any>) => {
        switch (field) {
          case "vote_average":
            return typeof entry.vote_average === "number"
              ? entry.vote_average
              : 0;
          case "release_date":
            return Date.parse(
              entry.release_date ??
                entry.first_air_date ??
                entry.air_date ??
                entry.episode_air_date ??
                "0"
            );
          default:
            return typeof entry.popularity === "number"
              ? entry.popularity
              : 0;
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

    const results =
      response.data.results?.map((item: Record<string, any>) => ({
        ...item,
        media_type: "episode",
      })) ?? [];

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

    const seedResults: Record<string, any>[] = seedResponse.data.results ?? [];
    const seedTitle = seedResults.find(
      (item) =>
        item && (item.media_type === "movie" || item.media_type === "tv")
    );

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

    const similarResults: Record<string, any>[] =
      similarResponse.data.results ?? [];
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

  let results: Record<string, any>[] = response.data.results ?? [];

  if (tab === "movie_tv") {
    results = results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );
  }

  const filtered = applySearchFilters(results, filters);

  return filtered.map((item) => mapSearchResult(item));
};

export const fetchDailyTrending = async (): Promise<SearchResult[]> => {
  const response = await apiClient.get("/trending/all/day", {
    params: { language: "en-US" },
  });

  const results: Record<string, any>[] = response.data.results ?? [];
  return results.map((item) => mapSearchResult(item));
};
