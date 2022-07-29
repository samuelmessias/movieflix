import axios, { AxiosRequestConfig } from 'axios';
import Card from 'component/Card';
import MovieCard from 'component/MovieCard';
import MovieDetail from 'component/MovieDetail';
import ReviewForm from 'component/ReviewForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'util/movie';

import {
  BASE_URL,
  hasAnyRoles,
  requestBackend,
  requestBackendLogin,
} from 'util/requests';
import { Review } from 'util/review';
import './style.css';

type UrlParams = {
  movieId: string;
};

const Lista = () => {
  const { movieId } = useParams<UrlParams>();

  const [reviews, setReview] = useState<Review[]>([]);

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    const params2: AxiosRequestConfig = {
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReview(response.data);
    });

    requestBackend(params2).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReview(clone);
  };

  return (
    <div>
      <div className="list-main">
        {movie && (
          <div className="list-container" key={movie.id}>
            <MovieDetail movie={movie} />
          </div>
        )}
        {hasAnyRoles(['ROLE_MEMBER']) && (
          <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
        )}
        <div className="base-card list-card">
          {reviews.map((review) => {
            return (
              <div key={review.id}>
                <Card review={review} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Lista;
