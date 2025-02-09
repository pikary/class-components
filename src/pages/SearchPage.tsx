import { useState, useEffect } from 'react';
import useQuery from '../hooks/useQuery';
import CharacterTable from '../components/Result';
import { Character } from '../api/types';
import SearchComponent from '../components/Search';
import Spinner from '../components/Spinner';
import { getCharacters } from '../api/baseApi';
import './styles.scss';

const SearchPage = () => {
  const { query, setQuery, handleQuerySave } = useQuery('search_query');
  const [searchResult, setSearchResult] = useState<Array<Character>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [test, setTest] = useState<string | null>('');

  const toggleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleSearch = async () => {
    try {
      toggleLoading(true);
      const result = await getCharacters('people', query);
      if (result) {
        setSearchResult(result.results || []);
        console.log({ savingQuery: query });

        handleQuerySave();
      }
    } catch (e) {
      console.log(e);
    } finally {
      toggleLoading(false);
    }
  };

  const handleError = () => {
    setTest(null);
  };

  useEffect(() => {
    if (test === null) {
      throw new Error('TESTING ERROR BOUNDARY');
    }
  }, [test]);

  return (
    <>
      <header className="search-page__header">
        <SearchComponent
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </header>
      <div className="search-page__result-container">
        {isLoading ? (
          <Spinner className="search-page__result-container__spinner" />
        ) : (
          <CharacterTable characters={searchResult} />
        )}
      </div>

      <button className="search-page__error-btn" onClick={handleError}>
        Show error
      </button>
    </>
  );
};

export default SearchPage;
