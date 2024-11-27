import { Link } from "react-router-dom";
import { ShortCode } from "../types/types";

type ShortCodeRowProps = {
  code: ShortCode;
  index: number;
};

const ShortCodeRow = ({ code, index }: ShortCodeRowProps): JSX.Element => {
  return (
    <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
      <td className="border border-gray-300 px-4 text-center py-2">
        <Link
          to={`/analytics/${code.short_code}`}
          className="text-blue-600 hover:underline"
        >
          {code.short_code}
        </Link>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center truncate max-w-xs">
        <a
          href={code.original_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {code.original_url}
        </a>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <Link
          to={`/analytics/${code.short_code}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Analytics
        </Link>
      </td>
    </tr>
  );
};

export default ShortCodeRow;
