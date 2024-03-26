import './Spinner.css';

type SpinnerProps = {
  size?: 'small' | 'medium' | 'big';
};

export const Spinner = ({ size = 'small' }: SpinnerProps) => {
  return <div className={`spinner ${size}`} />;
};
