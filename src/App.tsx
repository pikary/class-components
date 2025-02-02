import { Component } from 'react';
import SearchComponent from './components/Search';
import { getCharacters } from './api/baseApi';
import { Character } from './api/types';
import Spinner from './components/Spinner';
import CharacterTable from './components/Result';

interface AppState {
  searchResult: Array<Character>;
  isLoading: boolean;
  test: string | null;
}

class App extends Component<_, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchResult: [],
      isLoading: false,
      test: '',
    };
  }

  toggleLoading = (value: boolean) => {
    this.setState({ isLoading: value });
  };

  handleSearch = async (query: string) => {
    try {
      this.toggleLoading(true);
      const result = await getCharacters('people', query);
      if (result) {
        this.setState({
          searchResult: result.results || [],
        });
        //save query to localstorage
        localStorage.setItem('search_query', query);
      }
    } catch (e) {
      alert(e);
      console.log(e);
    } finally {
      this.toggleLoading(false);
    }
  };

  handleError = () => {
    this.setState({ test: null });
  };
  shouldComponentUpdate(nextProps: _, nextState: Readonly<AppState>): boolean {
    if (nextState.test === null) {
      throw new Error('TESTING ERROR BOUNDARY');
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { searchResult, isLoading } = this.state;

    return (
      <main>
        <header>
          <SearchComponent handleSearch={this.handleSearch} />
        </header>
        <div className="result-container">
          {isLoading ? (
            <Spinner className="result-container__spinner" />
          ) : (
            <CharacterTable characters={searchResult}></CharacterTable>
          )}
        </div>

        <button className="error-btn" onClick={this.handleError}>
          Show error
        </button>
      </main>
    );
  }
}

export default App;
