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
  PosterFallback,
  PosterImage,
  PosterWrapper,
  QuerySubtitle,
  QueryTitle,
  RatingBadge,
  ResetButton,
  ResultCard,
  ResultContent,
  ResultMeta,
  ResultOverview,
  ResultTitle,
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
  TabButton,
  TabsList,
  TrendingInfo,
  TrendingItem,
  TrendingList,
  TrendingMeta,
  TrendingRank,
  TrendingTitle,
} from "./SearchPage.styled";

const SEARCH_TABS: { label: string; value: SearchTab }[] = [
  { label: "All", value: "all" },
  { label: "Movies & TV", value: "movie_tv" },
  { label: "Episodes", value: "episodes" },
  { label: "Similars", value: "similars" },
];

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
  const [activeTab, setActiveTab] = useState<SearchTab>("all");
  const [filters, setFilters] = useState<SearchFilters>({ ...DEFAULT_FILTERS });

  useEffect(() => {
    setSearchInput(queryParam);
  }, [queryParam]);

  const normalizedQuery = queryParam.trim();
  const debouncedQuery = useDebouncedValue(normalizedQuery, 450);

  useEffect(() => {
    setActiveTab("all");
  }, [normalizedQuery]);

  const { data: genreOptions = [] } = useQuery({
    queryKey: ["genres", "combined"],
    queryFn: fetchCombinedGenres,
    staleTime: 1000 * 60 * 60,
  });

  const topGenres = useMemo(
    () => (genreOptions.length > 0 ? genreOptions.slice(0, 12) : []),
    [genreOptions]
  );

  const { data: searchResults = [], isPending: isSearchPending } = useQuery({
    queryKey: ["search", { query: debouncedQuery, tab: activeTab, filters }],
    queryFn: () =>
      fetchSearchResults({
        query: debouncedQuery,
        tab: activeTab,
        filters,
      }),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60,
  });

  const { data: trendingResults = [] } = useQuery({
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
  const hasResults = searchResults.length > 0;

  return (
    <>
      <NavigationBar />
      <PageWrapper>
        <SearchHeader>
          <QueryTitle>Search</QueryTitle>
          <QuerySubtitle>
            {hasQuery
              ? `Results for "${debouncedQuery}"`
              : "Use the search bar to discover movies, shows, and more."}
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
            <TabsList role="tablist">
              {SEARCH_TABS.map((tab) => (
                <TabButton
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.value}
                  $active={activeTab === tab.value}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </TabButton>
              ))}
            </TabsList>

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

            <ResultsPanel>
              {!hasQuery && (
                <EmptyState>
                  <EmptyTitle>Ready to explore?</EmptyTitle>
                  <EmptySubtitle>
                    Start typing in the search bar to look for titles, genres, or
                    people. We&rsquo;ll surface the best matches instantly.
                  </EmptySubtitle>
                </EmptyState>
              )}

              {hasQuery && isSearchPending && <LoadingState>Loading results…</LoadingState>}

              {hasQuery && !isSearchPending && !hasResults && (
                <EmptyState>
                  <EmptyTitle>No matches just yet</EmptyTitle>
                  <EmptySubtitle>
                    We couldn&rsquo;t find anything for "{debouncedQuery}" with the
                    current filters. Try adjusting them or searching for another
                    title.
                  </EmptySubtitle>
                </EmptyState>
              )}

              {hasResults && (
                <ResultsGrid>
                  {searchResults.map((result) => {
                    const mediaLabel = formatMediaLabel(result.media_type);
                    const releaseYear = formatYear(result.releaseDate);
                    const posterInitial = result.title.charAt(0).toUpperCase();

                    return (
                      <ResultCard
                        key={`${result.media_type}-${result.id}`}
                        aria-label={`${mediaLabel}: ${result.title}`}
                      >
                        <PosterWrapper>
                          {result.posterUrl ? (
                            <PosterImage
                              src={result.posterUrl}
                              alt={result.title}
                              loading="lazy"
                            />
                          ) : (
                            <PosterFallback aria-hidden="true">
                              {posterInitial}
                            </PosterFallback>
                          )}
                        </PosterWrapper>
                        <ResultContent>
                          <ResultTitle>{result.title}</ResultTitle>
                          <ResultMeta>
                            <span>{mediaLabel}</span>
                            {releaseYear && <span>{releaseYear}</span>}
                            {typeof result.voteAverage === "number" && result.voteAverage > 0 && (
                              <RatingBadge>⭐ {result.voteAverage.toFixed(1)}</RatingBadge>
                            )}
                          </ResultMeta>
                          <ResultOverview>
                            {result.overview || fallbackOverview}
                          </ResultOverview>
                        </ResultContent>
                      </ResultCard>
                    );
                  })}
                </ResultsGrid>
              )}
            </ResultsPanel>
          </MainColumn>

          <Sidebar>
            <SidebarCard>
              <SidebarHeading>Trending Today</SidebarHeading>
              {trendingResults.length === 0 ? (
                <SidebarEmptyState>
                  Trending titles are warming up. Check back soon!
                </SidebarEmptyState>
              ) : (
                <TrendingList>
                  {trendingResults.slice(0, 8).map((item, index) => {
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
