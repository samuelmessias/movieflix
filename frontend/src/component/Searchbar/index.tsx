import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Genre } from 'util/genre';
import { requestBackend } from 'util/requests';
import './styles.css';

const Searchbar = () => {
  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  useEffect(() => {  
    requestBackend({url: '/genres', withCredentials: true}).then((response) => {
      setSelectGenres(response.data);     
    });
  }, []);

  return (
    <div className="search-container">
      <Select
        options={selectGenres}        
        getOptionLabel={(genre: Genre) => genre.name}
        getOptionValue={(genre: Genre) => String(genre.id)}
        classNamePrefix="serach-container-select"
      />
    </div>
  );
};

export default Searchbar;
