import { Component, ReactNode } from 'react';
import './styles.scss';

interface SearchComponentProps {
  handleSearch: (query: string) => void;
}
interface SearchComponentState {
  query: string;
}

class SearchComponent extends Component<
  SearchComponentProps,
  SearchComponentState
> {
  constructor(props: SearchComponentProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value,
    });
  };

  //   componentDidUpdate(
  //     prevProps: Readonly<SearchComponentProps>,
  //     prevState: Readonly<SearchComponentState>,
  //     snapshot?: any
  //   ): void {
  //     if (prevState.query !== this.state.query) {
  //       this.props.handleSearch(this.state.query);
  //     }
  //   }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.handleSearch(this.state.query);
  };

  componentDidMount(): void {
    const savedQuery = localStorage.getItem('search_query') || '';

    this.setState({ query: savedQuery }, () => {
      this.props.handleSearch(savedQuery);
    });
  }
  render(): ReactNode {
    return (
      <form className="searh" onSubmit={this.handleSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="type to search"
          onChange={this.onType}
          value={this.state.query}
        ></input>
        <button type="submit" className="search__button">
          Search
        </button>
      </form>
    );
  }
}

export default SearchComponent;
