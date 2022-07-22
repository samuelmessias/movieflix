import { AxiosRequestConfig } from "axios";
import ButtonIcon from "component/ButtonIcon";
import { useForm } from "react-hook-form";
import { requestBackend } from "util/requests";
import { Review } from "util/review";
import './style.css';


type Props = {
    movieId: string;
    onInsertReview: (review : Review) => void;
}


type FormData = {
  text: string;
  movieId: number;
};

const ReviewForm = ( {movieId, onInsertReview} : Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    console.log(formData);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `/reviews`,
      withCredentials: true,
      data: formData,
    };

    requestBackend(config)
      .then((response) => {
        setValue('text', '');
        onInsertReview(response.data);
        console.log('SUCESSO ao salvar', response);
      })
      .catch((error) => {
        console.log('Erro ao salvar', error);
      });
  };

  return (
    <div className="base-card list-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('text', {
              required: 'Campo ogrigatório',
            })}
            type="text"
            className="form-control base-input"
            placeholder="Comentário"
            name="text"
          />
        </div>

        <div className="login-submit">
          <ButtonIcon text="SALVAR AVALIAÇÃO" />
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
