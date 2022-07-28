import { Movie } from 'util/movie';
import './styles.css';

type Props = {
  movie: Movie;
}


const MovieCard = ( {movie} : Props) => {
  return (
    <div className="movie-card-content">
      <div className="movie-card-img">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-description">
        <h2>{movie.title}</h2>
        <span>{movie.year}</span>
        <h3>{movie.subTitle}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
