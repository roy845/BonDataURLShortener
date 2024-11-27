import { TailSpin } from "react-loader-spinner";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner = ({ size = 50 }: SpinnerProps): JSX.Element => {
  const spinnerColor: string = "blue";

  return (
    <div className="flex justify-center items-center mt-24">
      <TailSpin
        height={size}
        width={size}
        color={spinnerColor}
        ariaLabel="loading"
      />
    </div>
  );
};

export default Spinner;
