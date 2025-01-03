import React from "react";
import { getPopularActors } from "../api/tmdb-api";
import PageTemplate from '../components/templateActorListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddMustWatchIcon from '../components/cardIcons/addMustWatch'


const ActorPopularPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('popular_actors', getPopularActors)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const actors = data.results;

  /*
  // Redundant, but necessary to avoid app crashing.
  const mustWatch = actors.filter(m => m.mustWatch)
  localStorage.setItem('mustWatch', JSON.stringify(mustWatch))
  const addMustWatch = (actorId) => true 
  */

  return (
    <PageTemplate
      title="Popular Actors"
      actors={actors}
      action={(actor) => {
        return <AddMustWatchIcon actor={actor} />
      }}
    />
);
};
export default ActorPopularPage;