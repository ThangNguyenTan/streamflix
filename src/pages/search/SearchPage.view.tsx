import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { NavigationBar } from "../../components";
import {
  fetchCombinedGenres,
  fetchDailyTrending,
  fetchSearchResults,
  type SearchFilters,
  type SearchResult,
  type SearchTab,
} from "../../services/api";
import { MovieCard, TVShowCard } from "../home/components";
import type { Movie, TVShow } from "../../types";
import {
  ContentLayout,
  EmptyState,
  EmptySubtitle,
  EmptyTitle,
  FilterChip,
  FilterChipsRow,
  FilterGroup,
  FilterLabel,
  FiltersPanel,
  FiltersTitle,
  FiltersTopRow,
  LoadingState,
  MainColumn,
  PageWrapper,
  QuerySubtitle,
  QueryTitle,
  ResetButton,
  ResultCardWrapper,
  ResultsGrid,
  ResultsPanel,
  SearchBarButton,
  SearchBarForm,
  SearchBarIcon,
  SearchBarInput,
  SearchHeader,
  Sidebar,
  SidebarCard,
  SidebarEmptyState,
  SidebarHeading,
  TrendingInfo,
  TrendingItem,
  TrendingList,
  TrendingMeta,
  TrendingRank,
  TrendingTitle,
} from "./SearchPage.styled";

const DEFAULT_SEARCH_TAB: SearchTab = "movie_tv";
const DEFAULT_RESULTS_LIMIT = 18;

const TYPE_FILTERS: { label: string; value: NonNullable<SearchFilters["type"]> }[] = [
  { label: "All Types", value: "all" },
  { label: "Movies", value: "movie" },
  { label: "TV Shows", value: "tv" },
];

const SORT_FILTERS: { label: string; value: NonNullable<SearchFilters["sortBy"]> }[] = [
  { label: "Most Popular", value: "popularity.desc" },
  { label: "Top Rated", value: "vote_average.desc" },
  { label: "Newest First", value: "release_date.desc" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_FILTERS: string[] = Array.from({ length: 8 }, (_, index) =>
  String(CURRENT_YEAR - index)
);

const DEFAULT_FILTERS: Required<Pick<SearchFilters, "type" | "sortBy">> &
  Partial<SearchFilters> = {
  type: "all",
  sortBy: "popularity.desc",
};

const useDebouncedValue = <T,>(value: T, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

const formatMediaLabel = (mediaType: SearchResult["media_type"]) => {
  switch (mediaType) {
    case "movie":
      return "Movie";
    case "tv":
      return "TV";
    case "episode":
      return "Episode";
    case "person":
      return "Person";
    default:
      return mediaType;
  }
};

const formatYear = (date?: string) => {
  if (!date) {
    return undefined;
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return String(parsed.getFullYear());
};

const fallbackOverview = "No synopsis available yet. Check back soon!";

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";
  const [searchInput, setSearchInput] = useState(queryParam);
  const [filters, setFilters] = useState<SearchFilters>({ ...DEFAULT_FILTERS });

  useEffect(() => {
    setSearchInput(queryParam);
  }, [queryParam]);

  const normalizedQuery = queryParam.trim();
  const debouncedQuery = useDebouncedValue(normalizedQuery, 450);

  const { data: genreOptions = [] } = useQuery({
    queryKey: ["genres", "combined"],
    queryFn: fetchCombinedGenres,
    staleTime: 1000 * 60 * 60,
  });

  const topGenres = useMemo(
    () => (genreOptions.length > 0 ? genreOptions.slice(0, 12) : []),
    [genreOptions]
  );

  const genresMap = useMemo(
    () =>
      genreOptions.reduce(
        (map, genre) => {
          map[genre.id] = genre.name;
          return map;
        },
        {} as Record<number, string>
      ),
    [genreOptions]
  );

  const { data: searchResults = [], isPending: isSearchPending } = useQuery({
    queryKey: [
      "search",
      { query: debouncedQuery, tab: DEFAULT_SEARCH_TAB, filters },
    ],
    queryFn: () =>
      fetchSearchResults({
        query: debouncedQuery,
        tab: DEFAULT_SEARCH_TAB,
        filters,
      }),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60,
  });

  const {
    data: trendingResults = [],
    isPending: isTrendingPending,
  } = useQuery({
    queryKey: ["trending", "daily"],
    queryFn: fetchDailyTrending,
    staleTime: 1000 * 60 * 60,
  });

  const trimmedInput = searchInput.trim();
  const isSubmitDisabled =
    trimmedInput.length === 0 && normalizedQuery.length === 0;
  const submitLabel =
    normalizedQuery.length > 0 && trimmedInput.length === 0
      ? "Clear"
      : "Search";

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedInput = searchInput.trim();
    const nextParams = new URLSearchParams(searchParams);

    if (normalizedInput) {
      nextParams.set("query", normalizedInput);
    } else {
      nextParams.delete("query");
    }

    setSearchParams(nextParams);
  };

  const handleTypeChange = (value: NonNullable<SearchFilters["type"]>) => {
    setFilters((previous) => ({ ...previous, type: value }));
  };

  const handleGenreToggle = (genreId: number) => {
    setFilters((previous) => ({
      ...previous,
      genreId: previous.genreId === genreId ? undefined : genreId,
    }));
  };

  const handleYearToggle = (year: string) => {
    setFilters((previous) => ({
      ...previous,
      year: previous.year === year ? undefined : year,
    }));
  };

  const handleSortChange = (value: NonNullable<SearchFilters["sortBy"]>) => {
    setFilters((previous) => ({ ...previous, sortBy: value }));
  };

  const handleResetFilters = () => {
    setFilters({ ...DEFAULT_FILTERS });
  };

  const hasQuery = debouncedQuery.length > 0;

  const trendingMedia = useMemo(
    () =>
      trendingResults.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      ),
    [trendingResults]
  );

  const defaultResults = useMemo(
    () => trendingMedia.slice(0, DEFAULT_RESULTS_LIMIT),
    [trendingMedia]
  );

  const filteredDefaultResults = useMemo(() => {
    if (hasQuery) {
      return defaultResults;
    }

    const { type, genreId, year, sortBy } = filters;
    let filtered = defaultResults;

    if (type && type !== "all") {
      filtered = filtered.filter((item) => {
        if (type === "movie") {
          return item.media_type === "movie";
        }

        if (type === "tv") {
          return item.media_type === "tv";
        }

        return true;
      });
    }

    if (genreId) {
      filtered = filtered.filter(
        (item) => Array.isArray(item.genreIds) && item.genreIds.includes(genreId)
      );
    }

    if (year) {
      filtered = filtered.filter(
        (item) =>
          typeof item.releaseDate === "string" &&
          item.releaseDate.startsWith(year)
      );
    }

    if (sortBy) {
      const [field, direction] = sortBy.split(".");
      const multiplier = direction === "asc" ? 1 : -1;

      filtered = [...filtered].sort((a, b) => {
        const resolveValue = (entry: SearchResult) => {
          switch (field) {
            case "vote_average":
              return typeof entry.voteAverage === "number"
                ? entry.voteAverage
                : 0;
            case "release_date":
              return entry.releaseDate ? Date.parse(entry.releaseDate) : 0;
            default:
              return typeof entry.popularity === "number"
                ? entry.popularity
                : 0;
          }
        };

        return (resolveValue(a) - resolveValue(b)) * multiplier;
      });
    }

    return filtered;
  }, [defaultResults, filters, hasQuery]);

  const displayedResults = hasQuery ? searchResults : filteredDefaultResults;

  const supportedResults = useMemo(
    () =>
      displayedResults.filter(
        (result) =>
          (result.media_type === "movie" || result.media_type === "tv") &&
          Boolean(result.posterPath)
      ),
    [displayedResults]
  );

  const isLoading = hasQuery ? isSearchPending : isTrendingPending;
  const hasDisplayResults = supportedResults.length > 0;

  return (
    <>
      <NavigationBar />
      <PageWrapper>
        <SearchHeader>
          <QueryTitle>Search</QueryTitle>
          <QuerySubtitle>
            {hasQuery
              ? `Results for "${debouncedQuery}"`
              : "Explore trending movies and shows or use the search bar to find something specific."}
          </QuerySubtitle>
          <SearchBarForm role="search" onSubmit={handleSearchSubmit}>
            <SearchBarIcon aria-hidden="true">🔍</SearchBarIcon>
            <SearchBarInput
              type="search"
              placeholder="Search for titles, people, or genres"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              aria-label="Search StreamFlix"
            />
            <SearchBarButton type="submit" disabled={isSubmitDisabled}>
              {submitLabel}
            </SearchBarButton>
          </SearchBarForm>
        </SearchHeader>

        <ContentLayout>
          <MainColumn>
            <ResultsPanel>
              {isLoading && (
                <LoadingState>
                  {hasQuery ? "Loading results…" : "Loading trending titles…"}
                </LoadingState>
              )}

              {!isLoading && !hasDisplayResults && (
                <EmptyState>
                  <EmptyTitle>
                    {hasQuery ? "No matches just yet" : "No titles match right now"}
                  </EmptyTitle>
                  <EmptySubtitle>
                    {hasQuery
                      ? `We couldn’t find anything for "${debouncedQuery}" with the current filters. Try adjusting them or searching for another title.`
                      : "Try adjusting the filters to explore more trending titles or start a search above."}
                  </EmptySubtitle>
                </EmptyState>
              )}

              {!isLoading && hasDisplayResults && (
                <ResultsGrid>
                  {supportedResults.map((result) => {
                    if (result.media_type === "movie") {
                      const movie: Movie = {
                        id: result.id,
                        title: result.title,
                        overview: result.overview || fallbackOverview,
                        poster_path: result.posterPath ?? "",
                        backdrop_path:
                          result.backdropPath ?? result.posterPath ?? "",
                        release_date: result.releaseDate ?? "",
                        vote_average: result.voteAverage ?? 0,
                        genre_ids: result.genreIds ?? [],
                      };

                      return (
                        <ResultCardWrapper key={`movie-${result.id}`}>
                          <MovieCard movie={movie} genresMap={genresMap} />
                        </ResultCardWrapper>
                      );
                    }

                    if (result.media_type === "tv") {
                      const tvShow: TVShow = {
                        id: result.id,
                        name: result.title,
                        overview: result.overview || fallbackOverview,
                        poster_path: result.posterPath ?? "",
                        backdrop_path:
                          result.backdropPath ?? result.posterPath ?? "",
                        vote_average: result.voteAverage ?? 0,
                        genre_ids: result.genreIds ?? [],
                      };

                      return (
                        <ResultCardWrapper key={`tv-${result.id}`}>
                          <TVShowCard tvShow={tvShow} genresMap={genresMap} />
                        </ResultCardWrapper>
                      );
                    }

                    return null;
                  })}
                </ResultsGrid>
              )}
            </ResultsPanel>
          </MainColumn>

          <Sidebar>
            <FiltersPanel>
              <FiltersTopRow>
                <FiltersTitle>Filters</FiltersTitle>
                <ResetButton type="button" onClick={handleResetFilters}>
                  Reset
                </ResetButton>
              </FiltersTopRow>

              <FilterGroup>
                <FilterLabel>Type</FilterLabel>
                <FilterChipsRow>
                  {TYPE_FILTERS.map((option) => (
                    <FilterChip
                      key={option.value}
                      type="button"
                      $active={filters.type === option.value}
                      onClick={() => handleTypeChange(option.value)}
                    >
                      {option.label}
                    </FilterChip>
                  ))}
                </FilterChipsRow>
              </FilterGroup>

              {topGenres.length > 0 && (
                <FilterGroup>
                  <FilterLabel>Genre</FilterLabel>
                  <FilterChipsRow>
                    {topGenres.map((genre) => (
                      <FilterChip
                        key={genre.id}
                        type="button"
                        $active={filters.genreId === genre.id}
                        onClick={() => handleGenreToggle(genre.id)}
                      >
                        {genre.name}
                      </FilterChip>
                    ))}
                  </FilterChipsRow>
                </FilterGroup>
              )}

              <FilterGroup>
                <FilterLabel>Year</FilterLabel>
                <FilterChipsRow>
                  {YEAR_FILTERS.map((year) => (
                    <FilterChip
                      key={year}
                      type="button"
                      $active={filters.year === year}
                      onClick={() => handleYearToggle(year)}
                    >
                      {year}
                    </FilterChip>
                  ))}
                </FilterChipsRow>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Sort By</FilterLabel>
                <FilterChipsRow>
                  {SORT_FILTERS.map((option) => (
                    <FilterChip
                      key={option.value}
                      type="button"
                      $active={filters.sortBy === option.value}
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.label}
                    </FilterChip>
                  ))}
                </FilterChipsRow>
              </FilterGroup>
            </FiltersPanel>

            <SidebarCard>
              <SidebarHeading>Trending Today</SidebarHeading>
              {isTrendingPending ? (
                <SidebarEmptyState>Loading trending titles…</SidebarEmptyState>
              ) : trendingMedia.length === 0 ? (
                <SidebarEmptyState>
                  Trending titles are warming up. Check back soon!
                </SidebarEmptyState>
              ) : (
                <TrendingList>
                  {trendingMedia.slice(0, 8).map((item, index) => {
                    const mediaLabel = formatMediaLabel(item.media_type);
                    const releaseYear = formatYear(item.releaseDate);

                    return (
                      <TrendingItem key={`${item.media_type}-${item.id}`}>
                        <TrendingRank>{index + 1}</TrendingRank>
                        <TrendingInfo>
                          <TrendingTitle>{item.title}</TrendingTitle>
                          <TrendingMeta>
                            {[mediaLabel, releaseYear]
                              .filter(Boolean)
                              .join(" • ")}
                          </TrendingMeta>
                        </TrendingInfo>
                      </TrendingItem>
                    );
                  })}
                </TrendingList>
              )}
            </SidebarCard>
          </Sidebar>
        </ContentLayout>
      </PageWrapper>
    </>
  );
};
