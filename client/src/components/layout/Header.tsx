import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps): JSX.Element => {
  const location = useLocation();

  return (
    <header className="w-full bg-blue-600 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className={"px-3 py-2 rounded"}>
          <h1 className="text-lg font-semibold">{title}</h1>
        </Link>

        <nav className="flex space-x-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded ${
              location.pathname === "/"
                ? "bg-gray-100 text-black"
                : "hover:bg-gray-100 hover:text-black"
            }`}
          >
            Home
          </Link>
          <Link
            to="/short-codes"
            className={`px-3 py-2 rounded ${
              location.pathname === "/short-codes"
                ? "bg-gray-100 text-black"
                : "hover:bg-gray-100 hover:text-black"
            }`}
          >
            Analytics
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
