import { useState, useEffect } from "react";

//Helpers
import { isPersistedState } from "../helpers";

//API
import API from "../API";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
 
  // console.log(searchTerm);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      // console.log(movies);

      //making parameters for earlier results
      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  //Retriving the Default page and Search Term
  useEffect(() => {
    if (!searchTerm) {
      //to retrive Data from Session (Not from API)
      const sessionState = isPersistedState("homeState");

      if (sessionState) {
        console.log("Fetched from Session");
        setState(sessionState);
        return;
      }
    }
    console.log("Fetched From API");
    setState(initialState);
    fetchMovies(1, searchTerm);
    // console.log(state.movieId);
  }, [searchTerm]);

  //to retrieve load More
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]); //when data Changing

  //Writing to SessionStorage (need to Stringfy State)
  useEffect(() => {
    if (!searchTerm) sessionStorage.setItem("homeState", JSON.stringify(state));
  }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};

// export default useHomeFetch;
