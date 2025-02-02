import { Component, ReactNode } from 'react';
import './styles.scss';

class SearchComponent extends Component {
  render(): ReactNode {
    return (
      <form className="searh">
        <input
          className="search__input"
          type="text"
          placeholder="type to search"
        ></input>
        <button className="search__button">Search</button>
      </form>
    );
  }
}

export default SearchComponent;
