import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'util/genre';
import { requestBackend } from 'util/requests';
import './styles.css';

export type FormSearchData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: FormSearchData) => void;
};

const Searchbar = ({ onSubmitFilter }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues, 
    control,
  } = useForm<FormSearchData>();

  const onSubmit = (formData: FormSearchData) => {
    console.log('Enviou', formData);
  };

  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  useEffect(() => {
    requestBackend({ url: '/genres', withCredentials: true }).then(
      (response) => {
        setSelectGenres(response.data);
      }
    );
  }, []);

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value);

    const obj: FormSearchData = {     
      genre: getValues('genre'),
    };

    onSubmitFilter(obj);
  };




  return (
    <div className="search-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <Select {...field}
              options={selectGenres}
              placeholder="Gênero"
              onChange={(value) => handleChangeGenre(value as Genre)}
              getOptionLabel={(genre: Genre) => genre.name}
              getOptionValue={(genre: Genre) => String(genre.id)}
              classNamePrefix="serach-container-select"
            />
          )}
        />
      </form>
    </div>
  );
};

export default Searchbar;
