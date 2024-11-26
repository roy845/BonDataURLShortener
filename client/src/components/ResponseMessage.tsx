interface ResponseMessageProps {
  response?: string;
  error?: string | null;
}

const ResponseMessage = ({
  response,
  error,
}: ResponseMessageProps): JSX.Element | null => {
  if (response) {
    return (
      <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-md">
        <p className="text-green-700 font-semibold">Shortened URL:</p>
        <a
          href={response}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {response}
        </a>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-100 border border-red-400 rounded-md">
        <p className="text-red-700 font-semibold">{error}</p>
      </div>
    );
  }

  return null;
};

export default ResponseMessage;
