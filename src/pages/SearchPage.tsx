import { useState, useEffect, useCallback, useMemo } from 'react';
import useQuery from '../hooks/useQuery';
import CharacterTable from '../components/Result';
import SearchComponent from '../components/Search';
import Spinner from '../components/Spinner';
import { getCharacters, GetCharactersResponse } from '../api/baseApi';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import './styles.scss';

const SearchPage = () => {
  const { page = '1' } = useParams();
  const navigate = useNavigate();
  const currentPage = Number(page);
  const { query, setQuery, handleQuerySave } = useQuery('search_query');
  const [searchResult, setSearchResult] = useState<GetCharactersResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const totalPages = useMemo(() => {
    if (!searchResult?.count) return 0;
    const total = Math.ceil(searchResult?.count / 10);
    return total;
  }, [searchResult]);
  const toggleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleSearch = useCallback(async () => {
    try {
      toggleLoading(true);
      navigate(`/search/1`, { replace: true });
      const result = await getCharacters('people', query);
      if (result) {
        setSearchResult(result);
        handleQuerySave();
      }
    } catch (e) {
      console.log(e);
    } finally {
      toggleLoading(false);
    }
  }, [query, handleQuerySave, navigate]);

  const handlePagination = useCallback(async () => {
    try {
      toggleLoading(true);
      const result = await getCharacters('people', query, currentPage);
      if (result) {
        setSearchResult(result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      toggleLoading(false);
    }
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      navigate(`/search/${newPage}`);
      handlePagination();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <section data-testid="search_page" className="search-page">
      <header className="search-page__header">
        <SearchComponent
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </header>
      <div className="search-page__pagination-controls">
        <button
          data-testid="pagi-prev-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <h5>Page: {currentPage}</h5>
        <button
          data-testid="pagi-next-btn"
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
          <>
            <CharacterTable
              characters={searchResult?.results || []}
              count={searchResult?.count || 0}
            />
            <Outlet></Outlet>
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
