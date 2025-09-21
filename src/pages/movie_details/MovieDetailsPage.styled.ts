import styled from "styled-components";

// Main page container
export const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background || "#0D0D0D"};
  color: ${({ theme }) => theme.colors.text || "#FFF"};
  min-height: 100vh;
`;

// Hero Section Container
export const HeroSection = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; /* Video fills the entire Hero Section */
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(13, 13, 13, 0.1) 50%,
      rgba(13, 13, 13, 1) 90%
    ); /* Dark gradient overlay */
    z-index: 2;
  }
`;

// Content wrapper (for details inside the Hero Section)
export const ContentWrapper = styled.div`
  position: absolute;
  bottom: 100px;
  left: 100px;
  z-index: 3;
  max-width: 600px;
`;

// Movie Logo
export const LogoImage = styled.img`
  width: auto;
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

// Metadata Row (Release Year, Runtime, Rating)
export const MetadataRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 1rem;
`;

export const MetadataItem = styled.span`
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

// Genres Row (Pills)
export const PillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1.5rem;
`;

export const Pill = styled.span`
  padding: 8px 15px;
  font-size: 0.9rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
`;

// Buttons (Play and Add to Watchlist)
export const ButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const PlayButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.primary || "#e50914"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #d70712;
  }
`;

export const AddToWatchlistCircle = styled.button`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

// Actors Section Wrapper
export const ActorsSection = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  margin: 0px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25vw, 1fr));
  gap: 20px;
  margin-top: 50px;
`;

// Actor Item
export const ActorItem = styled.div`
  display: flex; /* Arrange image and details horizontally */
  gap: 15px;
  align-items: center;
  background: rgba(
    255,
    255,
    255,
    0.05
  ); /* Subtle difference for item background */
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Optional shadow for depth */
`;

// Actor Image
export const ActorImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0; /* Prevent shrinking when container resizes */
`;

// Actor Details
export const ActorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Actor Name
export const ActorName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  margin: 0;
`;

// Actor Role
export const ActorRole = styled.p`
  font-size: 1rem;
  color: gray;
  margin: 0;
`;

// Similars Section Wrapper
export const SimilarsSection = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  margin: 0px auto;
  margin-top: 50px;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: white;
  }
`;

// Wrapper for the Movie Cards
export const MovieCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding-bottom: 50px;
`;
