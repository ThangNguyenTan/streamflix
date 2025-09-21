import React, { useState } from "react";
import {
  MovieCardContainer,
  PosterImage,
  BackdropImage,
  HoverContent,
  UpperSection,
  LowerSection,
  MovieTitle,
  InfoRow,
  MovieOverview,
} from "./MovieCard.styled";
import type { Movie } from "../../../../types";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
  genresMap: { [key: number]: string }; // Maps genre IDs to genre names
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, genresMap }) => {
  const [dragging, setDragging] = useState(false); // Track if the user is dragging
  const [startX, setStartX] = useState(0); // Track the mousedown X position
  const [startY, setStartY] = useState(0); // Track the mousedown Y position
  const navigate = useNavigate();

  // On card click, navigate to the movie details page if not dragged
  const handleCardClick = () => {
    if (!dragging) {
      navigate(`/movie/${movie.id}`);
    }
  };

  // Handle mouse down to track drag start position
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(false); // Reset dragging state
    setStartX(e.clientX); // Track the X position
    setStartY(e.clientY); // Track the Y position
  };

  // Handle mouse up to detect drag
  const handleMouseUp = (e: React.MouseEvent) => {
    const threshold = 10; // Set a threshold for drag detection
    const diffX = Math.abs(e.clientX - startX); // Difference in X position
    const diffY = Math.abs(e.clientY - startY); // Difference in Y position

    if (diffX > threshold || diffY > threshold) {
      setDragging(true); // User dragged the card
    } else {
      setDragging(false); // User clicked the card
    }
  };

  // Map genre IDs to their corresponding names
  const genres = movie.genre_ids
    .map((id) => genresMap[id] || "Unknown")
    .join(", ");

  return (
    <MovieCardContainer
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleCardClick}
    >
      {/* Poster Image - Default View */}
      <PosterImage
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      {/* Overlay Content (Shown on Hover) */}
      <HoverContent>
        {/* Upper Section Showing Backdrop */}
        <UpperSection>
          <BackdropImage
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
          />
        </UpperSection>

        {/* Lower Section Showing Additional Info */}
        <LowerSection>
          <MovieTitle>{movie.title}</MovieTitle>
          {/* Rating and Runtime */}
          <InfoRow>
            ⭐ {movie.vote_average}/10
            {movie.runtime && <> • {movie.runtime} mins</>}
          </InfoRow>
          {/* Genres */}
          <InfoRow>
            <strong>Genres:</strong> {genres}
          </InfoRow>
          {/* Movie Overview */}
          <MovieOverview>{movie.overview}</MovieOverview>
        </LowerSection>
      </HoverContent>
    </MovieCardContainer>
  );
};
