import { Link } from "react-router-dom";
import { ShortCode } from "../types/types";
import ConfirmResetModal from "./modal/ConfirmResetModal";
import useShortCodeRow from "../hooks/useShortCodeRow";

type ShortCodeRowProps = {
  code: ShortCode;
  index: number;
  deleteShortCode: (short_code: string) => Promise<void>;
};

const ShortCodeRow = ({
  code,
  index,
  deleteShortCode,
}: ShortCodeRowProps): JSX.Element => {
  const {
    confirmText,
    confirmationKeyword,
    handleDelete,
    isModalOpen,
    setConfirmText,
    setModalOpen,
  } = useShortCodeRow(code, deleteShortCode);

  return (
    <>
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            View Analytics
          </Link>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </td>
      </tr>

      <ConfirmResetModal
        isOpen={isModalOpen}
        confirmText={confirmText}
        confirmationKeyword={confirmationKeyword}
        isConfirmEnabled={confirmText === confirmationKeyword}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        onTextChange={(text) => setConfirmText(text)}
      />
    </>
  );
};

export default ShortCodeRow;
