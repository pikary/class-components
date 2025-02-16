import { useState } from 'react';
import './styles.scss';

interface SearchComponentProps {
  initialQuery: string;
  handleSearch: (query: string) => void;
}

const SearchComponent = ({
  initialQuery,
  handleSearch,
}: SearchComponentProps) => {
  const [query, setQuery] = useState(initialQuery);
  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

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
