import styled from "styled-components";

export const Wrapper = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 41%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(${({ image }) => image}), var(--darkGrey);
  background-size: 100%, cover;
  background-position: center;
  position: relative;
  height: 600px;
  animation: flashAni 2s;

  @keyframes flashAni {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Content = styled.div`
  padding: 40px;
  max-width: var(--maxWidth);
  margin: auto;
`;

export const Text = styled.div`
  z-index: 100;
  max-width: 900px;
  position: absolute;
  top:190px;
  margin-right: 20px;
  min-height: 10px;
  color: var(--white);
  h1 {
    font-size: var(--fontSuperBig);
    margin: 0;
    @media screen and (max-width: 720px) {
      font-size: var(--fontBig);
    }
  }
  p {
    font-size: var(--fontMed);
    color: var(--white);
    @media screen and (max-width: 720px) {
      font-size: var(--fontSmall);
    }
  }
  @media screen and (max-width: 720px) {
    max-width: 100%;
  }
`;
