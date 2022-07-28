import { AxiosRequestConfig } from 'axios';
import MovieCard from 'component/MovieCard';
import Pagination from 'component/Pagination';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'util/movie';

import {
  getTokenData,
  hasAnyRoles,
  isAuthenticated,
  requestBackend,
} from 'util/requests';
import { SpringPage } from 'util/vendor/spring';
import './styles.css';

const Home = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/movies?genreId=1',
      params: {
        page: 0,
        size: 4,
      },
      withCredentials: true,
    };

    setIsLoading(true);
    requestBackend(params).then((response) => {
      setPage(response.data);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="home-container">
        <h1>Tela listagem de filmes</h1>
        <div className="home-content">
          <div className="row">
          {isLoading ? <></> : (
            page?.content.map((movie) => (
              <div className="col-sm-6  col-xl-3">
                <Link to="/movies/1">
                  <MovieCard movie={movie} />
                </Link>
              </div>
            )))}           
            <Pagination />
          </div>         
        </div>        
      </div>
    </>
  );
};

export default Home;
