import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Tabs } from "antd";
import type { Movie, TVShow } from "../../../../types";
import { MovieCard, TVShowCard } from "..";

// Interfaces
interface MovieRowProps {
  title: string; // Title of the row (e.g., "Top Rated")
  movies: Movie[]; // Movies data
  tvShows: TVShow[]; // TV Shows data (similar structure as movies)
}

const RowContainer = styled.div`
  max-width: 1680px;
  padding-top: 50px;
  padding-bottom: 50px;
  margin: 0 auto;

  .slick-prev,
  .slick-next {
    z-index: 2; /* Bring the arrows above the movie cards */
  }

  .slick-prev:before,
  .slick-next:before {
    color: white; /* Arrow color */
  }
`;

// Title and Tabs Row Styling
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-right: 30px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;

  span {
    background: ${({ theme }) => theme.colors.primary || "#e50914"};
    display: inline-block;
    width: 5px;
    height: 20px;
    margin-right: 10px;
    border-radius: 2px;
  }
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 0;
    .ant-tabs-tab {
      color: ${({ theme }) => theme.colors.text || "#ffffff"};
      font-size: 1rem;

      &:hover {
        color: ${({ theme }) => theme.colors.primary || "#e50914"};
      }

      &.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${({ theme }) => theme.colors.primary || "#e50914"};
      }
    }
    .ant-tabs-ink-bar {
      background: ${({ theme }) => theme.colors.primary || "#e50914"};
    }
  }
`;

// Slider Container
const MoviesSlider = styled(Slider)`
  .slick-list {
    margin: 0 -5px; /* Adjust margins for perfect spacing */
  }

  .slick-slide {
    width: auto; /* Auto-width for cards */
    padding: 0 5px; /* Spacing between cards */
  }

  .slick-arrow {
    position: absolute;
    bottom: 0;
    width: 50px;
    height: 100%; /* Full height of the slider */
    background-color: transparent; /* Transparent background */
    z-index: 10; /* Ensure it appears above other elements */
    cursor: pointer;
    transition: background-color 0.3s ease; /* Smooth transition for background color */
  }

  /* Positioning */
  .slick-arrow.slick-prev {
    left: -5px; /* Position it to the left side */
  }

  .slick-arrow.slick-next {
    right: 20px; /* Position it to the right side */
  }

  /* Hover effect */
  .slick-arrow:hover {
    background-color: rgba(0, 0, 0, 0.8); /* Faded black background */
  }

  /* Optional: Style for the actual arrow (icon or text) inside the button */
  .slick-arrow::before {
    content: ""; /* Placeholder for custom arrow */
    display: block; /* Treat it as a block element */
    width: 40px; /* Arrow thickness (adjust to taste) */
    height: 40px; /* Arrow thickness (adjust to taste) */
    border: solid white; /* Arrow color */
    border-width: 0 3px 3px 0; /* Create the arrow shape */
    transform: rotate(45deg); /* Default arrow pointing direction */
  }

  /* Adjust arrow directions */
  .slick-arrow.slick-prev::before {
    transform: rotate(135deg); /* Pointing left */
  }

  .slick-arrow.slick-next::before {
    transform: rotate(-45deg); /* Pointing right */
  }
`;

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  tvShows,
}) => {
  const [activeTab, setActiveTab] = useState<"movies" | "series">("movies");

  // Determine content based on activeTab
  const content = activeTab === "movies" ? movies : tvShows;

  const sliderSettings = {
    dots: false, // Disable dots
    infinite: false, // No infinite loop
    speed: 500, // Transition speed in ms
    slidesToShow: 7, // Number of visible cards
    slidesToScroll: 4, // Number of cards to scroll
    responsive: [
      {
        breakpoint: 1024, // Large devices
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    arrows: false, // Enable navigation arrows
  };

  return (
    <RowContainer>
      {/* Header Row with Title and Tabs */}
      <HeaderContainer>
        <Title>
          <span></span> {title}
        </Title>

        {/* Styled Ant Design Tabs */}
        <StyledTabs
          defaultActiveKey="movies"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as "movies" | "series")}
        >
          <Tabs.TabPane tab="Movies" key="movies" />
          <Tabs.TabPane tab="Series" key="series" />
        </StyledTabs>
      </HeaderContainer>

      {/* Movie Slider */}
      <MoviesSlider {...sliderSettings}>
        {content.map((item) =>
          activeTab === "movies" ? (
            <MovieCard key={item.id} movie={item as Movie} genresMap={{}} />
          ) : (
            <TVShowCard key={item.id} tvShow={item as TVShow} genresMap={{}} />
          )
        )}
      </MoviesSlider>
    </RowContainer>
  );
};
