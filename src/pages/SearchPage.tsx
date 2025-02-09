import { useState, useEffect, useCallback } from 'react';
import useQuery from '../hooks/useQuery';
import CharacterTable from '../components/Result';
import { Character } from '../api/types';
import SearchComponent from '../components/Search';
import Spinner from '../components/Spinner';
import { getCharacters } from '../api/baseApi';
import { useSearchParams } from 'react-router-dom';
import './styles.scss';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [totalPages, setTotalPages] = useState<number>(1);

  const { query, setQuery, handleQuerySave } = useQuery('search_query');
  const [searchResult, setSearchResult] = useState<Array<Character>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [test, setTest] = useState<string | null>('');

  const toggleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleSearch = useCallback(async () => {
    try {
      toggleLoading(true);
      const result = await getCharacters('people', query, currentPage);
      if (result) {
        setSearchResult(result.results || []);
        console.log({ savingQuery: query });
        setTotalPages(Math.ceil(result?.count || 10 / 10));

        handleQuerySave();
      }
    } catch (e) {
      console.log(e);
    } finally {
      toggleLoading(false);
    }
  }, [currentPage, query]);

  const handleError = () => {
    setTest(null);
  };

  useEffect(() => {
    if (test === null) {
      throw new Error('TESTING ERROR BOUNDARY');
    }
  }, [test]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage.toString() });
    }
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);
  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);
  return (
    <>
      <header className="search-page__header">
        <SearchComponent
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </header>
      <div className="search-page__pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <h5>Page: {currentPage}</h5>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="search-page__result-container">
        {isLoading ? (
          <Spinner className="search-page__result-container__spinner" />
        ) : (
          <CharacterTable characters={searchResult} />
        )}
      </div>

      <button
        data-testid="error-btn"
        className="search-page__error-btn"
        onClick={handleError}
      >
        Show error
      </button>
    </>
  );
};

export default SearchPage;
