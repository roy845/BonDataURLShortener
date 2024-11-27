import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";

const NotFound = (): JSX.Element => {
  useDocumentTitle("Not Found");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <FaExclamationTriangle className="text-red-600 text-6xl mb-4" />{" "}
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
      >
        <span>Go Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
