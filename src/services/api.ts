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
