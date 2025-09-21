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

// TV Show Logo
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

// Episodes Section
export const EpisodesSection = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  margin: 0px auto;
  margin-top: 50px;
`;

// Episodes Header
export const EpisodesHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const EpisodesTitle = styled.h2`
  font-size: 1.8rem;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  
  &::before {
    content: "";
    width: 5px;
    height: 25px;
    background: ${({ theme }) => theme.colors.primary || "#e50914"};
    margin-right: 15px;
    border-radius: 2px;
  }
`;

// Episodes Controls
export const EpisodesControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SeasonDropdown = styled.select`
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || "#e50914"};
  }
  
  option {
    background: #0D0D0D;
    color: white;
  }
`;

export const EpisodeSearch = styled.input`
  flex: 1;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || "#e50914"};
  }
`;

export const SortFilterButton = styled.button`
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

// Episodes List
export const EpisodesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 600px;
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary || "#e50914"};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #d70712;
  }
`;

// Episode Card
export const EpisodeCard = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

// Episode Thumbnail
export const EpisodeThumbnail = styled.div`
  position: relative;
  width: 200px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #333;
`;

export const EpisodeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
`;

export const EpisodeNumber = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

// Episode Details
export const EpisodeDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const EpisodeTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin: 0 0 10px 0;
  font-weight: bold;
`;

export const EpisodeDescription = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  line-height: 1.5;
  margin: 0;
  flex: 1;
`;

// Episode Actions
export const EpisodeActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const DownloadButton = styled.button`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;
