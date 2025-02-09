import './styles.scss';

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className = '' }: SpinnerProps) => {
  return (
    <div data-testid="spinner" className={`lds-ring ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
