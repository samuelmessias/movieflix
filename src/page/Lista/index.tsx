import axios, { AxiosRequestConfig } from 'axios';
import Card from 'component/Card';
import ReviewForm from 'component/ReviewForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReview(response.data);
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
        <div className="list-container">
          <h1>Tela detalhe do filme id: {movieId}</h1>
        </div>
        {hasAnyRoles(['ROLE_MEMBER']) && (
          <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
        )}
        <div className="base-card list-card">
          {reviews.map((review) => {
            return <Card review={review} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Lista;
