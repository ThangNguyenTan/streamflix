import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  PageContainer,
  HeroSection,
  ContentWrapper,
  LogoImage,
  MetadataRow,
  MetadataItem,
  PillsRow,
  Pill,
  ButtonsRow,
  PlayButton,
  AddToWatchlistCircle,
  ActorsSection,
  ActorItem,
  ActorImage,
  ActorDetails,
  ActorName,
  ActorRole,
  SimilarsSection,
  MovieCardWrapper,
} from "./MovieDetailsPage.styled";
import { API_KEY } from "../../utils/constants";
import { MovieCard } from "../home/components";
import { NavigationBar } from "../../components";
import type { Movie } from "../../types";

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  runtime: number; // Runtime in minutes
  vote_average: number;
  release_date: string;
  genres: { id: number; name: string }[];
  backdrop_path: string | null; // Backdrop image for wallpaper
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null; // Profile picture (nullable)
  character: string; // Role in the movie
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [actors, setActors] = useState<Actor[]>([]); // Cast data
  const [logoUrl, setLogoUrl] = useState<string | null>(null); // State for the logo URL
  const [genresMap, setGenresMap] = useState<{ [key: number]: string }>({});
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );

        const movieData = response.data;

        // Save the movie details
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchMovieLogo = async () => {
      try {
        // Fetch logos specifically from the "images" endpoint
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/images`,
          { params: { api_key: API_KEY } }
        );

        // Try to find an English logo, fallback to the first available
        const logo =
          response.data.logos.find((logo: any) => logo.iso_639_1 === "en") ??
          response.data.logos[0];

        // Update the logo URL state
        if (logo) {
          setLogoUrl(`${IMAGE_BASE_URL}${logo.file_path}`);
        }
      } catch (error) {
        console.error(`Error fetching logo for movie ID ${id}:`, error);
        setLogoUrl(null); // No logo found, fallback to movie title text
      }
    };

    const fetchMovieCredits = async () => {
      try {
        // Fetch credits data (cast and crew)
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const castData = response.data.cast;

        // Limit to the top 9 actors for the Actors Section
        const actors = castData.slice(0, 9).map((actor: any) => ({
          id: actor.id,
          name: actor.name,
          profile_path: actor.profile_path,
          character: actor.character,
        }));
        setActors(actors);
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`
        );

        const similarMovies = response.data.results
          .slice(0, 14)
          .map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            vote_average: movie.vote_average,
            genre_ids: movie.genre_ids,
          }));

        setSimilarMovies(similarMovies);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );

        const genres = response.data.genres.reduce(
          (map: { [key: number]: string }, genre: any) => {
            map[genre.id] = genre.name; // Map genre ID to genre name
            return map;
          },
          {}
        );

        setGenresMap(genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieLogo();
    fetchMovieCredits();
    fetchSimilarMovies();
    fetchGenres();
  }, [id]);

  if (!movie) {
    return <PageContainer>Loading...</PageContainer>;
  }

  const releaseYear = movie.release_date.split("-")[0] ?? "N/A";
  const runtimeHours = Math.floor(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;

  return (
    <>
      <NavigationBar />
      <PageContainer>
        {/* Hero Section */}
        <HeroSection>
          {movie.backdrop_path && (
            <img
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={`${movie.title} backdrop`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1
              }}
            />
          )}

          {/* Content in Bottom Left */}
          <ContentWrapper>
            {/* Movie Logo or Title */}
            {logoUrl ? (
              <LogoImage src={logoUrl} alt={`${movie.title} Logo`} />
            ) : (
              <h1>{movie.title}</h1>
            )}

            {/* Metadata (Year, Runtime, Rating) */}
            <MetadataRow>
              <MetadataItem>📅 {releaseYear}</MetadataItem>
              <MetadataItem>
                ⏱️ {runtimeHours}h {runtimeMinutes}m
              </MetadataItem>
              <MetadataItem>⭐ {movie.vote_average}/10</MetadataItem>
            </MetadataRow>

            {/* Genres */}
            <PillsRow>
              {movie.genres.map((genre) => (
                <Pill key={genre.id}>{genre.name}</Pill>
              ))}
            </PillsRow>

            {/* Buttons */}
            <ButtonsRow>
              <PlayButton>▶ Play</PlayButton>
              <AddToWatchlistCircle>+</AddToWatchlistCircle>
            </ButtonsRow>
          </ContentWrapper>
        </HeroSection>

        {/* Actors Section */}
        <ActorsSection>
          {actors.map((actor) => (
            <ActorItem key={actor.id}>
              <ActorImage
                src={
                  actor.profile_path
                    ? `${IMAGE_BASE_URL}${actor.profile_path}`
                    : "https://via.placeholder.com/100x150.png?text=No+Photo" // Fallback for missing actor image
                }
                alt={actor.name}
              />
              <ActorDetails>
                <ActorName>{actor.name}</ActorName>
                <ActorRole>{actor.character}</ActorRole>
              </ActorDetails>
            </ActorItem>
          ))}
        </ActorsSection>

        {/* Similars Section */}
        <SimilarsSection>
          <h2>Similar Movies</h2>
          <MovieCardWrapper>
            {similarMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genresMap={genresMap} />
            ))}
          </MovieCardWrapper>
        </SimilarsSection>
      </PageContainer>
    </>
  );
};
