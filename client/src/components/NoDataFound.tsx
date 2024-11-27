type NoDataFoundProps = {
  message: string;
};

const NoDataFound = ({ message }: NoDataFoundProps): JSX.Element => {
  return (
    <p className="text-center">
      <strong>{message}</strong>
    </p>
  );
};

export default NoDataFound;
