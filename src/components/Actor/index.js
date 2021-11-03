import React from "react";
import PropTypes from "prop-types";

//Styles
import { Wrapper, Image } from "./Actor.styles";

const Actor = ({ name, character, imageUrl }) => {
  return (
    <Wrapper>
      <Image src={imageUrl} alt="Actor-image" />
      <h3>{name}</h3>
      <p>{character}</p>
    </Wrapper>
  );
};

Actor.propTypes = {
  name: PropTypes.string,
  character: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default Actor;
