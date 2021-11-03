import React from "react";
import PropTypes from "prop-types";

//Helpers
import { calcTime, convertMoney } from "../../helpers";

//Styles
import { Wrapper, Content } from "./MovieInfoBar.styles";

const MovieInfoBar = ({ time, budget, revenue }) => {
  return (
    <Wrapper>
      <Content>
        <div className="column">{calcTime(time)}</div>
        <div className="column">{convertMoney(budget)}</div>
        <div className="column">{convertMoney(revenue)}</div>
      </Content>
    </Wrapper>
  );
};

MovieInfoBar.propTypes = {
  time: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number,
};

export default MovieInfoBar;
