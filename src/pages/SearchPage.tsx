import { useEffect, useMemo } from 'react';
import useQuery from '../hooks/useQuery';
import CharacterTable from '../components/Result';
import SearchComponent from '../components/Search';
import Spinner from '../components/Spinner';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useGetCharactersQuery } from '../store/apiSlice';
import './styles.scss';

const SearchPage = () => {
  const { page = '1' } = useParams();
  const navigate = useNavigate();
  const currentPage = Number(page);
  const { query, setQuery, handleQuerySave } = useQuery('search_query');

  // rtk qurya
  const {
    data: searchResult,
    error,
    isLoading,
    refetch,
  } = useGetCharactersQuery({
    url: 'people',
    query,
    page: currentPage,
  });

  const totalPages = useMemo(() => {
    if (!searchResult?.count) return 0;
    return Math.ceil(searchResult.count / 10);
  }, [searchResult]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      navigate(`/search/${newPage}`);
    }
  };

  useEffect(() => {
    handleQuerySave();
  }, []);
  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);
  return (
    <section data-testid="search_page" className="search-page">
      <header className="search-page__header">
        <SearchComponent
          query={query}
          setQuery={setQuery}
          handleSearch={() => navigate('/search/1')}
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
        ) : error ? (
          <p>Error fetching characters</p>
        ) : (
          <>
            <CharacterTable
              characters={searchResult?.results || []}
              count={searchResult?.count || 0}
            />
            <Outlet />
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
