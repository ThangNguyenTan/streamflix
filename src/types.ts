export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string; // Image path from TMDB API
  backdrop_path: string; // For hero banner background
  release_date: string; // For hero banner background
  vote_average: number; // For hero banner background
  genre_ids: number[]; // Array of genre IDs
  runtime?: number; // (optional)
}

export interface TVShow {
  id: number;
  name: string; // Title for TV shows
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

// Strongly-typed Category Interface
export interface MovieCategory {
  title: string;
  movies: Movie[];
}

export interface Video {
  key: string; // YouTube video key
  site: string; // e.g., "YouTube"
  type: string; // e.g., "Trailer", "Teaser"
}
