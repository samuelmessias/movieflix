import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'util/genre';
import { requestBackend } from 'util/requests';
import './styles.css';


type FormSearchData = { 
  genre: Genre;
};

const Searchbar = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSearchData>();

  const onSubmit = (formData: FormSearchData) => {
console.log("Enviou", formData);
  }


  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  useEffect(() => {
    requestBackend({ url: '/genres', withCredentials: true }).then(
      (response) => {
        setSelectGenres(response.data);
      }
    );
  }, []);

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          options={selectGenres}
          getOptionLabel={(genre: Genre) => genre.name}
          getOptionValue={(genre: Genre) => String(genre.id)}
          classNamePrefix="serach-container-select"
        />
      </form>
    </div>
  );
};

export default Searchbar;
