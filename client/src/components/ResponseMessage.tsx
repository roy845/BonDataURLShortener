import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

interface ResponseMessageProps {
  response?: string;
  error?: string | null;
}

const ResponseMessage = ({
  response,
  error,
}: ResponseMessageProps): JSX.Element | null => {
  const { copyStatus, copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    if (response) {
      copyToClipboard(response);
    }
  };

  if (response) {
    return (
      <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-md">
        <p className="text-green-700 font-semibold">Shortened URL:</p>
        <div className="flex items-center space-x-2">
          <a
            href={response}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {response}
          </a>
          <button
            onClick={handleCopy}
            className="px-2 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 flex items-center"
          >
            Copy
          </button>
          {copyStatus === "success" && (
            <FaCheckCircle className="text-green-500 text-lg" />
          )}
          {copyStatus === "error" && (
            <FaTimesCircle className="text-red-500 text-lg" />
          )}
        </div>
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
