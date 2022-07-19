import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movei } from 'util/movie';
import { getTokenData, hasAnyRoles, isAuthenticated, requestBackend } from 'util/requests';
import './styles.css';

const Home = () => {
  const [movies, setMovies] = useState<Movei[]>([]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setMovies(response.data.content);
      console.log(response.data);
    });
  }, []);

  return (
    <>    
      <div className="home-container">
        <h1>Tela listagem de filmes</h1>

        {movies.map((movie) => {
          return (
            <div className="home-content" key={movie.id}>
              <Link to="/movies/1">Acessar: {movie.title}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
