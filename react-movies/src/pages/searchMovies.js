import React from "react";
import { getSearchedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddMustWatchIcon from '../components/cardIcons/addMustWatch'
import { get } from "react-hook-form";
import { useParams } from "react-router-dom";


const SearchPage = (props) => {

    const query = useParams();
    const { data, error, isLoading, isError } = useQuery(
    ['search', query],
    getSearchedMovies
    );

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const mustWatch = movies.filter(m => m.mustWatch)
  localStorage.setItem('mustWatch', JSON.stringify(mustWatch))
  const addMustWatch = (movieId) => true 

  return (
    <PageTemplate
      title="Search Results"
      movies={movies}
      action={(movie) => {
        return <AddMustWatchIcon movie={movie} />
      }}
    />
);
};
export default SearchPage;