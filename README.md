# Assignment 2 - Web API.

Student ID: 20102083

## Features.

- Previously used routes are now directed through the Movies API
- Actors tab using the /actors endpoint of the TMDB API

## Setup requirements.

This web app requires a TMDB API key and MongoDB environment set up before it can successfully be run. Your TMDB API key can be found at [this link](https://www.themoviedb.org/settings/api). MongoDB can be found at [this link](https://www.mongodb.com/).

## API Configuration

After cloning this repository, in order to successfully run the web app, create a `.env` file in both the `react-movies` and `movies-api` folders, and put the following variables into each file respectively:
```
REACT_APP_TMDB_KEY=...YOUR KEY HERE...
FAST_REFRESH=false
```
```
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=...LINK TO YOUR MONGO INSTANCE HERE...
TMDB_KEY=...YOUR KEY HERE...
SECRET=...YOUR JWT SECRET HERE...
```

## API Design
API endpoints present in the app:

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/actors | GET | Gets a list of actors 
- /api/actors/{actorid} | GET | Gets a single actor
- /api/users/?action=authenticate | POST | Allow user to authenticate their profile
- /api/users/?action=register | POST | Allow user to register an account on the web app
- /api/users | POST | if authenticated, returns the user's token, used for protected routes
## Security and Authentication

Basic login and registration supported on the website. All routes besides homepage now protected, trying to browse the site requires you to log in or make an account first. Use of JWT tokens to facilitate authentication.

## Integrating with React App

React app is fully integrated with the web API, all calls previously made directly to the TMDB API are now sent through the web API, which communicates with TMDB and MongoDB.

## Issues

Parameterized endpoints, namely the one to return movie details and search for movies, do not function when using the frontend interface. However, requests made directly to the API function as normal, as seen in the demonstration video.
