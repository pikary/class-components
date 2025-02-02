import { Component, ReactNode } from 'react';
import './styles.scss';

class Spinner extends Component {
  render(): ReactNode {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
export default Spinner;
