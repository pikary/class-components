import React, { Component } from 'react';
import SearchComponent from './components/Search';
import { getCharacters } from './api/baseApi';
import { Character } from './api/types';

interface AppProps {}
interface AppState {
  searchResult: Array<Character>;
  isLoading: boolean;
}

class App extends Component<_, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchResult: [],
      isLoading: false,
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
      }
    } catch (e) {
      throw new Error(e);
    } finally {
      this.toggleLoading(false);
    }
  };

  render() {
    return (
      <main>
        <header>
          <SearchComponent handleSearch={this.handleSearch} />
        </header>
        <div>
          {this.state.searchResult &&
            this.state.searchResult.map((item) => (
              <p key={item.url}>{item.name}</p>
            ))}
        </div>
      </main>
    );
  }
}

export default App;
