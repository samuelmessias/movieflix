import { AxiosRequestConfig } from 'axios';
import MovieCard from 'component/MovieCard';
import Pagination from 'component/Pagination';
import Searchbar, { FormSearchData } from 'component/Searchbar';
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

type ControlComponentsData = {
  activePage: number;
  filterData: FormSearchData;
};

const Home = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({ 
      activePage: 0, 
      filterData: {genre: null},
    });

  

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        sort:"title",
        genreId: controlComponentsData.filterData.genre?.id,
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

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData});
  };

  const handleSubmitFilter = (data: FormSearchData) => {
    setControlComponentsData({ activePage: 0, filterData: data });   
  };

  return (
    <>
      <div className="home-container">
        <Searchbar onSubmitFilter={handleSubmitFilter}/>
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
