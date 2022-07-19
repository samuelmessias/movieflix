import { AxiosRequestConfig } from 'axios';
import ButtonIcon from 'component/ButtonIcon';
import Card from 'component/Card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movei } from 'util/movie';
import {
  hasAnyRoles,
  requestBackend,
  requestBackendLogin,
} from 'util/requests';
import './style.css';

type UrlParams = {
  movieId: string;
};

const Lista = () => {
  const { movieId } = useParams<UrlParams>();

  const [movie, setMovie] = useState<Movei>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setMovie(response.data);
    });
  }, []);

  return (
    <div>
      <div className="list-main">
        <div className="list-container">
          <h1>
            {movie?.title} {movie?.subTitle}
          </h1>
        </div>
        {hasAnyRoles(['ROLE_MEMBER']) && (
          <div className="base-card list-form">
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control base-input"
                  placeholder="Email"
                  name="pesquisar"
                />
              </div>

              <div className="login-submit">
                <ButtonIcon text="SALVAR AVALIAÇÃO" />
              </div>
            </form>
          </div>
        )}
        <div className="base-card list-card">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Lista;
