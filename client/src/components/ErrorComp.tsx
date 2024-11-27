type ErrorCompProps = {
  error: string;
};

const ErrorComp = ({ error }: ErrorCompProps): JSX.Element => {
  return (
    <p className="text-red-500 text-center">
      <strong>{error}</strong>
    </p>
  );
};

export default ErrorComp;
