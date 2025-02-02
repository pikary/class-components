import React, { Component } from 'react';
import SearchComponent from './components/Search';

interface AppProps {}
interface AppState {
  count: number;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('search_query') || '',
      searchResult: [],
    };
  }

  handleIncrement = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    return (
      <main>
        <header>
          <SearchComponent></SearchComponent>
        </header>
        <div></div>
      </main>
    );
  }
}

export default App;
