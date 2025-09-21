import React, { useEffect, useState } from "react";
import {
  fetchGenres,
  fetchMoviesByCategory,
  fetchTVShowsByCategory,
} from "../../services/api";
import { HeroSlider } from "./components";
import { HomePageContainer } from "./HomePage.styled";
import { NavigationBar } from "../../components";
import type { Movie, TVShow } from "../../types";
import { MovieRow } from "./components/MovieRow";

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<
    {
      title: string;
      movies: Movie[];
      tvShows: TVShow[];
    }[]
  >([]);
  const [genresMap, setGenresMap] = useState<{ [key: number]: string }>({}); // Genre mapping

  useEffect(() => {
    const loadGenres = async () => {
      const genres = await fetchGenres();
      const mappedGenres = genres.reduce(
        (acc: { [key: number]: string }, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        },
        {}
      );
      setGenresMap(mappedGenres);
    };

    const loadContent = async () => {
      // Fetch movies and TV shows for each category
      const trendingMovies = await fetchMoviesByCategory("popular");
      const trendingTVShows = await fetchTVShowsByCategory("popular");

      const topRatedMovies = await fetchMoviesByCategory("top_rated");
      const topRatedTVShows = await fetchTVShowsByCategory("top_rated");

      const upcomingMovies = await fetchMoviesByCategory("upcoming");
      const onTheAirTVShows = await fetchTVShowsByCategory("on_the_air");

      // Store categories with both movies and TV shows data
      setCategories([
        {
          title: "Trending Now",
          movies: trendingMovies,
          tvShows: trendingTVShows,
        },
        {
          title: "Top Rated",
          movies: topRatedMovies,
          tvShows: topRatedTVShows,
        },
        {
          title: "Upcoming",
          movies: upcomingMovies,
          tvShows: onTheAirTVShows,
        },
      ]);
    };

    loadContent();
    loadGenres();
  }, []);

  return (
    <>
      <NavigationBar />
      <HomePageContainer>
        <HeroSlider movies={categories[0]?.movies ?? []} genresMap={genresMap} />

        {/* {categories.map((category) => (
          <MovieRow key={category.title}>
            <RowHeading>{category.title}</RowHeading>
            <div className="movie-row">
              {category.movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} genresMap={genresMap} />
              ))}
            </div>
          </MovieRow>
        ))} */}

        {/* {categories.map((category) => (
          <MovieRowWithTabs
            key={category.title}
            title={category.title}
            movies={category.movies}
            tvShows={category.tvShows}
            genresMap={genresMap}
          />
        ))} */}

        {categories.map((category) => (
          <MovieRow
            key={category.title}
            title={category.title}
            movies={category.movies}
            tvShows={category.tvShows}
          />
        ))}
      </HomePageContainer>
    </>
  );
};
