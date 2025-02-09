import { useEffect } from 'react';
import './styles.scss';

interface SearchComponentProps {
  query: string;
  setQuery: (val: string) => void;
  handleSearch: (query: string) => void;
}

const SearchComponent = ({
  handleSearch,
  query,
  setQuery,
}: SearchComponentProps) => {
  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

  useEffect(() => {
    handleSearch(query);
  }, []);

  return (
    <form data-testid="search-form" className="searh" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        data-testid="search-input"
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
