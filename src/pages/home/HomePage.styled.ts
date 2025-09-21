import styled from "styled-components";

export const HomePageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const MovieRow = styled.div`
  max-width: 1680px;
  margin: 0px auto;
  padding-top: 50px;
  padding-bottom: 50px;

  .movie-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;

    /* Responsive layout */
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
`;

export const RowHeading = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

export const TabsContainer = styled.div`
  max-width: 1680px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin: 0px auto;

  button {
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background: ${({ theme }) => theme.colors.primary || "#e50914"};
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.active {
      background: #d70712;
    }

    &:hover {
      background: #d70712;
    }
  }
`;
