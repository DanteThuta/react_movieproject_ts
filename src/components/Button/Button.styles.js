import styled from "styled-components";

export const Wrapper = styled.button`
  display: block;
  background: var(--darkGrey);
  width: 25%;
  min-width: 200px;

  height: 60px;
  border-radius: 30px;
  color: var(--white);
  border: 0;

  font-size: va(--fontBig);
  margin: 20px auto;
  transition: all 0.3s;

  outline: 0;
  cursor: pointer;

  :hover {
    opacity: 0.78;
  }
`;
