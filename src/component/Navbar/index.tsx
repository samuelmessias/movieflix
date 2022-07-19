import { useEffect, useState } from 'react';
import history from 'util/history';
import {
  getTokenData,
  isAuthenticated,
  removeAuthData,
  TokenData,
} from 'util/requests';
import './styles.css';

type AuthData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

const Navbar = () => {
  const [authData, SetAuthData] = useState<AuthData>({ authenticated: false });

  useEffect(() => {
    if (isAuthenticated()) {
      SetAuthData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      SetAuthData({
        authenticated: false,
      });
    }
  }, []);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    SetAuthData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="bg-primary">
      <div className="nav-container">
        <a href="link">
          <h4>MovieFlix</h4>
        </a>

        {authData.authenticated ? (
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
