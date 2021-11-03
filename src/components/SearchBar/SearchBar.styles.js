import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 90px;
  background: var(--darkGrey);
  padding: 0 20px;
`;

export const Content = styled.div`
  position: relative;
  max-width: (--maxWidth);
  width: 60%;
  height: 55px;
  background: var(--medGrey);

  margin: 0 auto;
  border-radius: 40px;

  img {
    position: absolute;
    top: 15px;
    left: 20px;
    width: 30px;

    color: var(--darkGrey);
  }

  input {
    background: transparent;
    
    top: 15px;
    left: 350px;
    margin: 8px 0;
    padding: 0 0 0 60px;
    color: var(--white);

    width: 100%;
    font-size: 1.5rem;
    height: 40px;
    border: 0;

    :focus {
      outline: 0;
    }
  }
`;
