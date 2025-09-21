import styled from "styled-components";

// Hover Content
export const HoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Match card dimensions */
  height: 100%;
  display: flex;
  flex-direction: column;
  opacity: 0; /* Hidden initially */
  transform: translateY(10px); /* Offset for animation */
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

// TV Show Card Container
export const MovieCardContainer = styled.div`
  display: block;
  position: relative;
  width: 200px; /* Default width */
  height: 300px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 8px;
  transition: width 0.3s ease, /* Smooth width expansion */ transform 0.3s ease,
    /* Smooth scaling effect */ box-shadow 0.3s ease; /* Smooth box-shadow effect */

  &:hover {
    width: 435px; /* Width expands smoothly */
    transform: scale(1.05); /* Slight scaling effect */
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); /* Box shadow for a floating effect */
    z-index: 10; /* Ensures it hovers above others */
  }

  &:hover ${HoverContent} {
    opacity: 1;
    transform: translateY(0); /* Show hover content */
  }
`;

// Default Poster Image
export const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0; /* Fade poster image on hover */
  }
`;

// Upper Section (Backdrop Image)
export const UpperSection = styled.div`
  flex: 1; /* Take up the upper half of the card */
  border-radius: 8px 8px 0 0; /* Rounded top corners */
  overflow: hidden;
`;

export const BackdropImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(0.7); /* Darken the backdrop slightly */
  }
`;

// Lower Section (TV Show Info)
export const LowerSection = styled.div`
  flex: 1; /* Take up lower part of card */
  background: rgba(0, 0, 0, 0.85); /* Semi-transparent black for readability */
  padding: 10px;
  border-radius: 0 0 8px 8px; /* Rounded bottom corners */
  box-shadow: inset 0px -10px 20px rgba(0, 0, 0, 0.5); /* Inner box shadow */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px; /* Add spacing between rows */
  overflow: hidden;
`;

// Title of the TV Show
export const MovieTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 5px;
  line-height: 1.2;
  text-align: left;

  /* Truncate the title to 1 line with ellipsis */
  width: 100%; /* Ensure a constrained width (necessary for ellipsis to work) */
  white-space: nowrap; /* Force the text to remain in a single line */
  overflow: hidden; /* Prevent overflow */
  text-overflow: ellipsis; /* Add ellipsis (...) when the title overflows */
`;

// A row to include runtime and/or rating
export const InfoRow = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight || "#ccc"};
  font-weight: 500;
  display: flex;
  gap: 5px;
  align-items: center;
`;

// Overview Text (Clipped for Length)
export const MovieOverview = styled.p`
  font-size: 0.85rem;
  color: #ccc;
  line-height: 1.4; /* Adjust line height for better readability */
  text-overflow: ellipsis;
  overflow: hidden;

  /* Truncate text to 3 lines */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Clamp to 3 lines */
`;
