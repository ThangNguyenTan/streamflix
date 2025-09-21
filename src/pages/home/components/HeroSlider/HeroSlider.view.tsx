import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { API_KEY, IMAGE_BASE_URL } from "../../../../utils/constants";
import axios from "axios";

export interface Movie {
  id: number;
  release_date: string;
  title: string;
  backdrop_path?: string;
  vote_average: number; // Rating
  overview: string;
  genre_ids: number[]; // Array of genre IDs
}

interface HeroSliderProps {
  movies: Movie[];
  genresMap: { [key: number]: string }; // Map genre IDs to genre names
}

// Styled Components
const HeroSliderContainer = styled.div`
  width: 100%;
  overflow: hidden;

  .slick-dots {
    bottom: 20px;

    li button:before {
      color: white; /* Adjust dot color */
    }
  }

  .slick-prev:before,
  .slick-next:before {
    color: white; /* Adjust arrow colors */
  }
`;

const Slide = styled.div<{ background: string }>`
  height: 90vh; /* Takes up the majority of the screen */
  /* Full height of the HeroSlider */
  background-image: linear-gradient(
      to top,
      rgba(13, 13, 13, 1),
      rgba(13, 13, 13, 0.1) /* Lighter upper part */
    ),
    /* Make the lower part darker */ url(${(props) => props.background}); /* Backdrop from TMDB */
  background-size: cover; /* Adjust image to cover full container */
  background-position: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Align content to the bottom */
  align-items: flex-start;
  padding: 0 50px 100px 50px; /* Adds padding for text and buttons */
`;

const Content = styled.div`
  max-width: 600px;
  margin-top: 35vh;
  margin-left: 25rem;

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  span {
    display: inline-block;
    font-size: 0.9rem;
    font-weight: bold;
    color: #f1f1f1;
    margin-right: 15px;
  }
`;

const LogoImage = styled.img`
  max-width: 36rem;
  max-height: 10rem;
  margin-bottom: 1rem;
`;

const MovieTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:first-child {
      background: ${({ theme }) =>
        theme.colors.primary || "#e50914"}; /* Netflix Red */
      color: white;

      &:hover {
        background: #d70712;
      }
    }

    &:last-child {
      background: rgba(255, 255, 255, 0.8); /* Light background */
      color: black;

      &:hover {
        background: rgba(255, 255, 255, 1);
      }
    }
  }
`;

const PillContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow pills to wrap onto the next line if needed */
  margin-bottom: 1.5rem;
`;

const Pill = styled.span`
  display: flex;
  align-items: center;
  gap: 5px; /* Space between icon/text within the pill */
  padding: 8px 15px; /* Inside spacing for the pill */
  font-size: 0.9rem;
  font-weight: 500;
  background: hsla(0, 0%, 100%, 0.03);
  backdrop-filter: blur(16px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle border effect */
  border-radius: 50px; /* Makes it a pill shape */
`;

export const HeroSlider: React.FC<HeroSliderProps> = ({
  movies,
  genresMap,
}) => {
  const [logos, setLogos] = useState<{ [key: number]: string }>({}); // Map movie IDs to logo URLs

  // Fetch movie logos during render
  useEffect(() => {
    const fetchLogos = async () => {
      const logoMap: { [key: number]: string } = {};

      for (const movie of movies) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/images`,
            { params: { api_key: API_KEY } }
          );

          const logo =
            response.data.logos.find((logo: any) => logo.iso_639_1 === "en") ??
            response.data.logos[0]; // Pick English logo
          if (logo) {
            logoMap[movie.id] = `${IMAGE_BASE_URL}${logo.file_path}`;
          }
        } catch (error) {
          console.error(`Error fetching logo for movie ID ${movie.id}:`, error);
        }
      }

      setLogos(logoMap); // Update state with logo URLs
    };

    fetchLogos();
  }, [movies]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <HeroSliderContainer>
      <Slider {...settings}>
        {movies.map((movie) => {
          const releaseYear = movie.release_date
            ? movie.release_date.split("-")[0]
            : "N/A"; // Extract year (YYYY)

          return (
            <Slide
              key={movie.id}
              background={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            >
              <Content>
                {/* Movie Logo or Fallback to Title */}
                {logos[movie.id] ? (
                  <LogoImage
                    src={logos[movie.id]}
                    alt={`${movie.title} Logo`}
                  />
                ) : (
                  <MovieTitle>{movie.title}</MovieTitle>
                )}

                {/* Pills for Rating, Year, and Genres */}
                <PillContainer>
                  {/* Rating */}
                  <Pill>⭐ {movie.vote_average}/10</Pill>

                  {/* Release Year */}
                  <Pill>📅 {releaseYear}</Pill>

                  {/* Genres */}
                  {movie.genre_ids.slice(0, 3).map((id) => (
                    <Pill key={id}>{genresMap[id]}</Pill>
                  ))}
                </PillContainer>

                <p>{movie.overview}</p>
                <ButtonGroup>
                  <button>Play Now</button>
                  <button>See More</button>
                </ButtonGroup>
              </Content>
            </Slide>
          );
        })}
      </Slider>
    </HeroSliderContainer>
  );
};
