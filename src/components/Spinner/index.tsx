import './styles.scss';

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className = '' }: SpinnerProps) => {
  return (
    <div className={`lds-ring ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
