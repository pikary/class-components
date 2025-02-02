import React, { Component } from 'react';
import './App.css';

interface AppProps {}
interface AppState {
  count: number;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleIncrement = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    return <></>;
  }
}

export default App;
