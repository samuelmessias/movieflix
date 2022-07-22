import { type } from '@testing-library/user-event/dist/type';
import { ReactComponent as StarImage } from 'assets/images/image3.svg';
import { Review } from 'util/review';
import './styles.css';

type Props = {
  review : Review;
}

const Card = ( {review} : Props) => {
  return (
    <div className="card-container">
          <div className="card-head">
            <StarImage />
            <h3>{review.user.name}</h3>
          </div>
          <div className="card-content">
            <p>{review.text}</p>
          </div>
    </div>
  );
};

export default Card;
