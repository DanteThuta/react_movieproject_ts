import styled from "styled-components";

export const Wrapper = styled.div`
  color: var(--darkGrey);
  background: var(--medGrey);
  border-radius: 20px;
  padding: 5px;
  text-align: center;

  h3 {
    margin: 10px 0 0 0;
  }

  p {
    padding: 5px;
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 200px;

  object-fit: cover;
  border-radius: 20px;
`;
