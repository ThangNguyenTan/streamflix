import styled from "styled-components";

export const RowContainer = styled.div`
  max-width: 1680px;
  margin: 0px auto;
  padding-top: 50px;
  padding-bottom: 50px;

  h2 {
    margin-bottom: 10px;
    font-size: 1.5rem;
    color: white;
  }

  .slick-slider {
    margin-top: 1rem;
  }

  .slick-prev,
  .slick-next {
    z-index: 2; /* Ensure arrows appear above the cards */
  }

  .slick-prev:before,
  .slick-next:before {
    color: white; /* Customize arrow colors */
  }
`;
