import { Component, ReactNode } from 'react';
import './styles.scss';

interface SpinnerProps {
  className?: string;
}

class Spinner extends Component<SpinnerProps> {
  render(): ReactNode {
    return (
      <div className={`lds-ring ${this.props.className}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
export default Spinner;
