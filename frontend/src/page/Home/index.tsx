import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getTokenData, hasAnyRoles, isAuthenticated, requestBackend } from 'util/requests';
import './styles.css';

const Home = () => {
 

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
     
    });
  }, []);

  return (
    <>    
      <div className="home-container">
        <h1>Tela listagem de filmes</h1>         
            <div className="home-content">
              <Link to="/movies/1">Acessar:/movies/1</Link>
            </div>
            <div className="home-content">
              <Link to="/movies/2">Acessar:/movies/2</Link>
            </div>  
      </div>
    </>
  );
};

export default Home;
