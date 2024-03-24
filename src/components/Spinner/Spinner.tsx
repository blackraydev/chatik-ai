import './Spinner.css';

type SpinnerProps = {
  size?: 'small' | 'big';
};

export const Spinner = ({ size = 'small' }: SpinnerProps) => {
  return <div className={`spinner ${size}`} />;
};
