import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getPopularMovies,
    getMovies,
    getUpcomingMovies,
    getGenres,
    getSearchedMovies
  } from '../tmdb-api';
  

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

router.get('/tmdb/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}))

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const movieGenres = await getGenres();
    res.status(200).json(movieGenres);
}));

router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));

router.get('/tmdb/search/:id', asyncHandler(async (req, res) => {
        const id = req.params.id;
        const searchedMovies = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${id}&page=1&include_adult=false`
        ).then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.status_message || "Something went wrong");
            }
            );
          }
          return response.json();
        })
        .catch((error) => {
            throw error
        });
        res.status(200).json(searchedMovies);
      }));

      router.get('/tmdb/:id', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const movie = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
        ).then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.status_message || "Something went wrong");
            }
            );
          }
          return response.json();
        })
        .catch((error) => {
            throw error
        });
        res.status(200).json(movie);
        }));



export default router;