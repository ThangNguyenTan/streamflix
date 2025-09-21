import React, { useEffect, useState, useCallback } from "react";
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
  EpisodesSection,
  EpisodesHeader,
  EpisodesTitle,
  EpisodesControls,
  SeasonDropdown,
  EpisodeSearch,
  SortFilterButton,
  EpisodesList,
  EpisodeCard,
  EpisodeThumbnail,
  EpisodeImage,
  PlayIcon,
  EpisodeNumber,
  EpisodeDetails,
  EpisodeTitle,
  EpisodeDescription,
  EpisodeActions,
  DownloadButton,
  ActorsSection,
  ActorItem,
  ActorImage,
  ActorDetails,
  ActorName,
  ActorRole,
  SimilarsSection,
  MovieCardWrapper,
} from "./TVShowDetailsPage.styled";
import { API_KEY } from "../../utils/constants";
import { TVShowCard } from "../home/components";
import { NavigationBar } from "../../components";
import type { TVShow } from "../../types";

export interface TVShowDetails {
  id: number;
  name: string;
  overview: string;
  episode_run_time: number[]; // Runtime in minutes (array for different episode lengths)
  vote_average: number;
  first_air_date: string;
  genres: { id: number; name: string }[];
  backdrop_path: string | null; // Backdrop image for wallpaper
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null; // Profile picture (nullable)
  character: string; // Role in the TV show
}

export interface Episode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string | null;
  air_date: string;
  runtime: number;
}

export interface Season {
  id: number;
  season_number: number;
  name: string;
  overview: string;
  poster_path: string | null;
  air_date: string;
  episode_count: number;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const TVShowDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tvShow, setTVShow] = useState<TVShowDetails | null>(null);
  const [actors, setActors] = useState<Actor[]>([]); // Cast data
  const [logoUrl, setLogoUrl] = useState<string | null>(null); // State for the logo URL
  const [genresMap, setGenresMap] = useState<{ [key: number]: string }>({});
  const [similarTVShows, setSimilarTVShows] = useState<TVShow[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [episodeSearch, setEpisodeSearch] = useState<string>("");

  const fetchEpisodes = useCallback(async (seasonNumber: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
      );
      
      if (response.data.episodes) {
        setEpisodes(response.data.episodes);
      }
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        // Fetch TV show details
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
        );

        const tvShowData = response.data;

        // Save the TV show details
        setTVShow(tvShowData);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      }
    };

    const fetchTVShowLogo = async () => {
      try {
        // Fetch logos specifically from the "images" endpoint
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/images`,
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
        console.error(`Error fetching logo for TV show ID ${id}:`, error);
        setLogoUrl(null); // No logo found, fallback to TV show title text
      }
    };

    const fetchTVShowCredits = async () => {
      try {
        // Fetch credits data (cast and crew)
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`
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

    const fetchSimilarTVShows = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US`
        );

        const similarTVShows = response.data.results
          .slice(0, 14)
          .map((tvShow: any) => ({
            id: tvShow.id,
            name: tvShow.name,
            poster_path: tvShow.poster_path,
            backdrop_path: tvShow.backdrop_path,
            overview: tvShow.overview,
            vote_average: tvShow.vote_average,
            genre_ids: tvShow.genre_ids,
          }));

        setSimilarTVShows(similarTVShows);
      } catch (error) {
        console.error("Error fetching similar TV shows:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
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

    const fetchSeasons = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=seasons&language=en-US`
        );
        
        if (response.data.seasons) {
          setSeasons(response.data.seasons);
        }
      } catch (error) {
        console.error("Error fetching seasons:", error);
      }
    };



    fetchTVShowDetails();
    fetchTVShowLogo();
    fetchTVShowCredits();
    fetchSimilarTVShows();
    fetchGenres();
    fetchSeasons();
    fetchEpisodes(selectedSeason);
  }, [id]);

  useEffect(() => {
    if (selectedSeason > 0) {
      fetchEpisodes(selectedSeason);
    }
  }, [selectedSeason, id, fetchEpisodes]);

  if (!tvShow) {
    return <PageContainer>Loading...</PageContainer>;
  }

  const releaseYear = tvShow.first_air_date.split("-")[0] ?? "N/A";
  const episodeRuntime = tvShow.episode_run_time[0] || 0;
  const runtimeHours = Math.floor(episodeRuntime / 60);
  const runtimeMinutes = episodeRuntime % 60;

  return (
    <>
      <NavigationBar />
      <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        {tvShow.backdrop_path && (
          <img
            src={`${IMAGE_BASE_URL}${tvShow.backdrop_path}`}
            alt={`${tvShow.name} backdrop`}
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
          {/* TV Show Logo or Title */}
          {logoUrl ? (
            <LogoImage src={logoUrl} alt={`${tvShow.name} Logo`} />
          ) : (
            <h1>{tvShow.name}</h1>
          )}

          {/* Metadata (Year, Runtime, Rating) */}
          <MetadataRow>
            <MetadataItem>📅 {releaseYear}</MetadataItem>
            <MetadataItem>
              ⏱️ {runtimeHours}h {runtimeMinutes}m
            </MetadataItem>
            <MetadataItem>⭐ {tvShow.vote_average}/10</MetadataItem>
          </MetadataRow>

          {/* Genres */}
          <PillsRow>
            {tvShow.genres.map((genre) => (
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

      {/* Episodes Section */}
      <EpisodesSection>
        <EpisodesHeader>
          <EpisodesTitle>Episodes</EpisodesTitle>
        </EpisodesHeader>
        
        <EpisodesControls>
          <SeasonDropdown 
            value={selectedSeason} 
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
          >
            {seasons.map((season) => (
              season.season_number > 0 ? <option key={season.id} value={season.season_number}>
                Season {season.season_number}
              </option> : null
            ))}
          </SeasonDropdown>
          
          <EpisodeSearch
            type="text"
            placeholder="🔍 Search episode..."
            value={episodeSearch}
            onChange={(e) => setEpisodeSearch(e.target.value)}
          />
          
          <SortFilterButton>
            <span>☰</span>
            <span>↑</span>
          </SortFilterButton>
        </EpisodesControls>

        <EpisodesList>
          {episodes.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#ccc',
              fontSize: '1.1rem'
            }}>
              {seasons.length === 0 ? 'Loading seasons...' : 'No episodes found for this season.'}
            </div>
          ) : (() => {
            const filteredEpisodes = episodes.filter((episode) =>
              episode.name.toLowerCase().includes(episodeSearch.toLowerCase()) ||
              episode.overview.toLowerCase().includes(episodeSearch.toLowerCase())
            );
            
            if (filteredEpisodes.length === 0) {
              return (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#ccc',
                  fontSize: '1.1rem'
                }}>
                  No episodes match your search.
                </div>
              );
            }
            
            return filteredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id}>
                <EpisodeThumbnail>
                  {episode.still_path ? (
                    <EpisodeImage
                      src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                      alt={episode.name}
                    />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666'
                    }}>
                      No Image
                    </div>
                  )}
                  <PlayIcon>▶</PlayIcon>
                  <EpisodeNumber>{episode.episode_number}</EpisodeNumber>
                </EpisodeThumbnail>
                
                <EpisodeDetails>
                  <EpisodeTitle>{episode.name}</EpisodeTitle>
                  <EpisodeDescription>{episode.overview}</EpisodeDescription>
                </EpisodeDetails>
                
                <EpisodeActions>
                  <DownloadButton title="Download Episode">
                    ⬇
                  </DownloadButton>
                </EpisodeActions>
              </EpisodeCard>
            ));
          })()}
        </EpisodesList>
      </EpisodesSection>

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
        <h2>Similar TV Shows</h2>
        <MovieCardWrapper>
          {similarTVShows.map((tvShow) => (
            <TVShowCard key={tvShow.id} tvShow={tvShow} genresMap={genresMap} />
          ))}
        </MovieCardWrapper>
      </SimilarsSection>
      </PageContainer>
    </>
  );
};
