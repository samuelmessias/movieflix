import { AxiosRequestConfig } from 'axios';
import MovieCard from 'component/MovieCard';
import Pagination from 'component/Pagination';
import Searchbar from 'component/Searchbar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Genre } from 'util/genre';
import { Movie } from 'util/movie';

import {
  getTokenData,
  hasAnyRoles,
  isAuthenticated,
  requestBackend,
} from 'util/requests';
import { SpringPage } from 'util/vendor/spring';
import './styles.css';

type ControlComponentsData = {
  actiovePage: number;
};

const Home = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({ actiovePage: 0 });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ actiovePage: pageNumber });
  };

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      params: {
        page: controlComponentsData.actiovePage,
        size: 4,
        sort:"title",
        genreId: 0,
      },
      withCredentials: true,
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [controlComponentsData]);

  return (
    <>
      <div className="home-container">
        <Searchbar />
        <div className="home-content">
          <div className="row">
            {isLoading ? (
              <></>
            ) : (
              page?.content.map((movie) => (
                <div className="col-sm-6  col-xl-3" key={movie.id}>
                  <Link to={`/movies/${movie.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                </div>
              ))
            )}
            <Pagination
              pageCount={page ? page.totalPages : 0}
              range={3}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
