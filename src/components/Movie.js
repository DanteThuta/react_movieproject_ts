import React, { Component } from "react";

//Routing
import { useParams } from "react-router-dom";

//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

//Components Section
import Spinner from "./Spinner";
import Grid from "./Grid";
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";

//API
import API from "../API";

//Image
import NoImage from "../images/no_image.jpg";

class Movie extends Component {
  state = {
    movies: {},
    loading: true,
    error: false,
  };

  fetchMovie = async () => {
    const { movieId } = this.props.params;
    try {
      this.setState({ error: false, loading: true });

      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);

      //for Directors
      const directors = credits.crew.filter(
        (member) => member.job === "Director"
      );

      this.setState({
        movie: {
          ...movie,
          actors: credits.cast,
          directors,
        },
        loading: false,
      });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  componentDidMount() {
    this.fetchMovie();
  }

  render() {
    const { movie, loading, error } = this.state;
    if (loading) return <Spinner />;
    if (error) return <div>Something went wrong.</div>;

    return (
      <>
        <BreadCrumb movieTitle={movie.original_title} />
        <MovieInfo movie={movie} />
        <MovieInfoBar
          time={movie.runtime}
          budget={movie.budget}
          revenue={movie.revenue}
        />
        <Grid header="Casts">
          {movie.actors.map((actor) => (
            <Actor
              key={actor.credit_id}
              name={actor.name}
              character={actor.character}
              imageUrl={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                  : NoImage
              }
            />
          ))}
        </Grid>
      </>
    );
  }
}

const MovieWithParams = (props) => <Movie {...props} params={useParams()} />;

export default MovieWithParams;
