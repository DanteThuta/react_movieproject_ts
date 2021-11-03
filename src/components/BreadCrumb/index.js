import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

//Components
import { Wrapper, Content, HomeBtn } from "./BreadCrumb.styles";

const BreadCrumb = ({ movieTitle }) => {
  return (
    <Wrapper>
      <Content>
        <HomeBtn>
        <Link to="/">Home</Link>
        </HomeBtn>
        <span>|</span>
        <span>{movieTitle}</span>
      </Content>
    </Wrapper>
  );
};

BreadCrumb.propTypes = {
  movieTitle: PropTypes.string,
};

export default BreadCrumb;
