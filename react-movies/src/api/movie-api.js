export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const getMovies = async () => {
    const response = await fetch('http://localhost:8080/api/movies/tmdb/discover', {
        headers: {
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
  };

  export const getMovie = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}`, {
        headers: {
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const getUpcomingMovies = async () => {
    const response = await fetch('http://localhost:8080/api/movies/tmdb/upcoming', {
        headers: {
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const getGenres = async () => {
    const response = await fetch('http://localhost:8080/api/movies/tmdb/genres', {
        headers: {
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const getPopularMovies = async () => {
    const response = await fetch('http://localhost:8080/api/movies/tmdb/popular', {
        headers: {
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const getPopularActors = async () => {
    const response = await fetch('http://localhost:8080/api/actors/tmdb/popular', {
        headers: {
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const getSearchedMovies = async (req, res) => {
    const id = req.params.id; 
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/search/${id}`, {
        headers: {
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
};

export const getActor = async (req, res) => {
    const id = req.params.id;
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/${id}`, {
        headers: {
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get'
    });
    return response.json();
}