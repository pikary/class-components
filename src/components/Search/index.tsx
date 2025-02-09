import { useState, useEffect } from 'react';
import './styles.scss';

interface SearchComponentProps {
  handleSearch: (query: string) => void;
}

const SearchComponent = ({ handleSearch }: SearchComponentProps) => {
  const [query, setQuery] = useState<string>('');

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('search_query') || '';
    setQuery(savedQuery);
    handleSearch(savedQuery);
  }, []);

  return (
    <form className="searh" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        placeholder="type to search"
        onChange={onType}
        value={query}
      />
      <button type="submit" className="search__button">
        Search
      </button>
    </form>
  );
};

export default SearchComponent;
