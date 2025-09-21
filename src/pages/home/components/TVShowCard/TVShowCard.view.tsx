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
} from "./TVShowCard.styled";
import type { TVShow } from "../../../../types";
import { useNavigate } from "react-router-dom";

interface TVShowCardProps {
  tvShow: TVShow;
  genresMap: { [key: number]: string }; // Maps genre IDs to genre names
}

export const TVShowCard: React.FC<TVShowCardProps> = ({ tvShow, genresMap }) => {
  const [dragging, setDragging] = useState(false); // Track if the user is dragging
  const [startX, setStartX] = useState(0); // Track the mousedown X position
  const [startY, setStartY] = useState(0); // Track the mousedown Y position
  const navigate = useNavigate();

  // On card click, navigate to the TV show details page if not dragged
  const handleCardClick = () => {
    if (!dragging) {
      navigate(`/tvshow/${tvShow.id}`);
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
  const genres = tvShow.genre_ids
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
        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
        alt={tvShow.name}
      />

      {/* Overlay Content (Shown on Hover) */}
      <HoverContent>
        {/* Upper Section Showing Backdrop */}
        <UpperSection>
          <BackdropImage
            src={`https://image.tmdb.org/t/p/w780${tvShow.backdrop_path}`}
            alt={tvShow.name}
          />
        </UpperSection>

        {/* Lower Section Showing Additional Info */}
        <LowerSection>
          <MovieTitle>{tvShow.name}</MovieTitle>
          {/* Rating and Runtime */}
          <InfoRow>
            ⭐ {tvShow.vote_average}/10
          </InfoRow>
          {/* Genres */}
          <InfoRow>
            <strong>Genres:</strong> {genres}
          </InfoRow>
          {/* TV Show Overview */}
          <MovieOverview>{tvShow.overview}</MovieOverview>
        </LowerSection>
      </HoverContent>
    </MovieCardContainer>
  );
};
