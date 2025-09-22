import styled from "styled-components";

export const PageWrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  padding: 4.75rem 3.5rem 5rem;

  @media (max-width: 1200px) {
    padding: 4rem 2.75rem 4.5rem;
  }

  @media (max-width: 900px) {
    padding: 3.5rem 2rem 4rem;
  }

  @media (max-width: 640px) {
    padding: 3rem 1.25rem 3.5rem;
  }
`;

export const SearchHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 1680px;
  margin: 0 auto 2.5rem;

  @media (max-width: 900px) {
    margin-bottom: 2rem;
  }
`;

export const SearchBarForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  width: 100%;
  max-width: 560px;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  transition: border-color 0.2s ease, background 0.2s ease,
    box-shadow 0.2s ease;

  &:focus-within {
    border-color: rgba(229, 9, 20, 0.9);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 44px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 640px) {
    border-radius: 18px;
    padding: 0.85rem;
    gap: 0.65rem;
  }
`;

export const SearchBarIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  pointer-events: none;
`;

export const SearchBarInput = styled.input`
  flex: 1 1 220px;
  min-width: 0;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1rem;
  line-height: 1.4;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.55);
  }

  @media (max-width: 640px) {
    flex-basis: 100%;
  }
`;

export const SearchBarButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  padding: 0.55rem 1.35rem;
  border: none;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, opacity 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    background: rgba(229, 9, 20, 0.92);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    transform: none;
    background: rgba(255, 255, 255, 0.18);
    color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const QueryTitle = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const QuerySubtitle = styled.p`
  margin: 0;
  max-width: 720px;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
`;

export const ContentLayout = styled.div`
  max-width: 1680px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
  gap: 3rem;

  @media (max-width: 1200px) {
    gap: 2.5rem;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const TabsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  padding: 0.65rem 1.2rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(229, 9, 20, 0.85)" : "rgba(255, 255, 255, 0.14)"};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "rgba(255, 255, 255, 0.06)"};
  color: ${({ $active }) => ($active ? "#fff" : "rgba(255, 255, 255, 0.85)")};
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: transform 0.2s ease, background 0.2s ease,
    border-color 0.2s ease, color 0.2s ease;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border-color: rgba(229, 9, 20, 0.85);
  }
`;

export const FiltersPanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const FiltersTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const FiltersTitle = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FilterLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.6);
`;

export const FilterChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const FilterChip = styled.button<{ $active?: boolean }>`
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : "rgba(255, 255, 255, 0.16)"};
  background: ${({ $active }) =>
    $active ? "rgba(229, 9, 20, 0.9)" : "rgba(255, 255, 255, 0.08)"};
  color: ${({ $active }) => ($active ? "#fff" : "rgba(255, 255, 255, 0.85)")};
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: transform 0.2s ease, background 0.2s ease,
    border-color 0.2s ease, color 0.2s ease;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

export const ResetButton = styled.button`
  align-self: flex-start;
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
`;

export const ResultsPanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.75rem;
  justify-items: center;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
`;

export const ResultCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ResultCard = styled.article`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 1.25rem;
  padding: 1.1rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  min-height: 160px;

  @media (max-width: 768px) {
    grid-template-columns: 90px 1fr;
    gap: 1rem;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  aspect-ratio: 2 / 3;
`;

export const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PosterFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
`;

export const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

export const ResultTitle = styled.h2`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
`;

export const ResultMeta = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ResultOverview = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.76);
  max-height: 4.5em;
  overflow: hidden;
`;

export const RatingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.8rem;
  font-weight: 600;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 3rem 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  color: rgba(255, 255, 255, 0.8);
`;

export const EmptyTitle = styled.h3`
  margin: 0;
  font-size: 1.35rem;
`;

export const EmptySubtitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.5;
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SidebarCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.75rem 1.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const SidebarHeading = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
`;

export const TrendingList = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
`;

export const TrendingItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.85rem;
  align-items: center;
`;

export const TrendingRank = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

export const TrendingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const TrendingTitle = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.92);
`;

export const TrendingMeta = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

export const SidebarEmptyState = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.68);
`;
