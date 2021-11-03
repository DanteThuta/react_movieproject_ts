import React, { Component } from "react";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

//Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";

//API
import API from "../API";

//Image

import NoImage from "../images/no_image.jpg";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

class Home extends Component {
  state = {
    movies: initialState,
    searchTerm: "",
    setIsLoadingMore: false,
    loading: false,
    error: false,
  };

  fetchMovies = async (page, searchTerm = "") => {
    try {
      this.setState({ error: false, loading: true });

      const movies = await API.fetchMovies(searchTerm, page);
      // console.log(movies);

      //making parameters for earlier results
      this.setState((prev) => ({
        ...prev,
        movies: {
          ...movies,
          results:
            page > 1
              ? [...prev.movies.results, ...movies.results]
              : [...movies.results],
        },
        loading: false,
      }));
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  //Creating with React Classes
  handleSearch = (searchTerm) => {
    this.setState({ movies: initialState, searchTerm }, () =>
      this.fetchMovies(1, this.state.searchTerm)
    );
  };

  handleLoadMore = () => {
    this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);
  };

  componentDidMount() {
    this.fetchMovies(1);
  }

  //Creating with React Classes(End)

  render() {
    const { searchTerm, movies, loading, error } = this.state;

    return (
      <>
        {/* <h2>Test Mode</h2> */}
        {!searchTerm && movies.results[0] ? (
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
            title={movies.results[0].original_title}
            text={movies.results[0].overview}
          />
        ) : null}
        <SearchBar setSearchTerm={this.handleSearch} />
        <Grid header={!searchTerm ? "Popular Movies" : "Search Movies"}>
          {movies.results.map((movie) => (
            <Thumb
              key={movie.id}
              clickable
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movieId={movie.id}
            />
          ))}
        </Grid>
        {loading && <Spinner />}

        {movies.page < movies.total_pages && !loading && (
          <Button text="Load More" callback={this.handleLoadMore} />
        )}
      </>
    );
  }
}

export default Home;
