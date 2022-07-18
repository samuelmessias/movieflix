import { ReactComponent as StarImage } from 'assets/images/image3.svg';
import './styles.css';


const Card = () => {
  return (
    <div className="card-container">
          <div className="card-head">
            <StarImage />
            <h3>Maria silva</h3>
          </div>
          <div className="card-content">
            <p>Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.</p>
          </div>
    </div>
  );
};

export default Card;
