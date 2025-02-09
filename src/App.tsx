import { useState, useEffect } from 'react';
import SearchComponent from './components/Search';
import { getCharacters } from './api/baseApi';
import { Character } from './api/types';
import Spinner from './components/Spinner';
import CharacterTable from './components/Result';

const App = () => {
  const [searchResult, setSearchResult] = useState<Array<Character>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [test, setTest] = useState<string | null>('');

  const toggleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleSearch = async (query: string) => {
    try {
      toggleLoading(true);
      const result = await getCharacters('people', query);
      if (result) {
        setSearchResult(result.results || []);
        localStorage.setItem('search_query', query);
      }
    } catch (e) {
      alert(e);
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
    <main>
      <header>
        <SearchComponent handleSearch={handleSearch} />
      </header>
      <div className="result-container">
        {isLoading ? (
          <Spinner className="result-container__spinner" />
        ) : (
          <CharacterTable characters={searchResult} />
        )}
      </div>

      <button className="error-btn" onClick={handleError}>
        Show error
      </button>
    </main>
  );
};

export default App;
