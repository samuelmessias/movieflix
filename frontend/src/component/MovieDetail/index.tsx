import { Movie } from 'util/movie';
import './styles.css';

type Props = {
  movie: Movie;
}


const MovieDetail = ( {movie} : Props) => {
  return (
    <div className="row movie-detail-content">
      <div className="movie-detail-img col-lg-6">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-detail-description col-lg-6">
        <h2>{movie.title}</h2>
        <span>{movie.year}</span>
        <h3>{movie.subTitle}</h3>
        <div className="movie-detail-description-synopsis">
          <p>{movie.synopsis}</p>          
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
