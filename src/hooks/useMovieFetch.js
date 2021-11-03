import { useState, useEffect } from "react";

//Helpers
import { isPersistedState } from "../helpers";

//API
import API from "../API";

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);

        //for Directors
        const directors = credits.crew.filter(
          (member) => member.job === "Director"
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors,
        });

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    //for Fetching Movie from Session (not from API)
    const sessionState = isPersistedState(movieId);
    if (sessionState) {
      console.log("fetching from session");
      setState(sessionState);
      setLoading(false);
      return;
    }
    console.log("fetching from API");
    fetchMovie();
  }, [movieId]);

  //Writing to Session Storage for Single Movie
  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state]);

  return { state, loading, error };
};
