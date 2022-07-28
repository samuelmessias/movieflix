import { AuthContext } from 'AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import history from 'util/history';
import {
  getTokenData,
  isAuthenticated,
  removeAuthData,
  TokenData,
} from 'util/requests';
import './styles.css';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="bg-primary">
      <div className="nav-container">
        <Link to="/movies">
          <h4>MovieFlix</h4>
        </Link>

        {authContextData.authenticated ? (
          <div className="nav-sair">
            <a href="#" onClick={handleLogoutClick}>
              Sair
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
