import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbar';
import './styles.css';
const Home = () => {
  return (
    <>      
      <div className="home-container">
        <h1>Tela listagem de filmes</h1>
        <div className="home-content">
          <Link to="/lista">Acessar /movies/1</Link>
        </div>
        <div className="home-content">
        <Link to="/lista">Acessar /movies/2</Link>
        </div>       
      </div>
    </>
  );
};

export default Home;
