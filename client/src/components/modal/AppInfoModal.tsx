import { IoIosClose, IoIosInformationCircle } from "react-icons/io";
import useAppInfoModal from "../../hooks/useAppInfoModal";
import CloseButton from "../common/CloseButton";
import { closeModal, toggleDoNotShowAgain } from "../../features/modalSlice";

const AppInfoModal = () => {
  const { isOpen, doNotShowAgain, dispatch } = useAppInfoModal();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div
        className="relative rounded-lg w-3/4 max-w-lg p-6 shadow-lg bg-white text-gray-900"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <CloseButton />

        <h2 className="text-center text-2xl font-bold mb-4 flex items-center justify-center gap-2">
          About URL Shortener
          <IoIosInformationCircle size={28} />
        </h2>
        <p className="mb-4">
          The URL Shortener app provides a simple way to shorten long URLs,
          track analytics, and manage custom slugs for easy sharing and
          monitoring.
        </p>
        <h3 className="text-xl font-semibold mb-2">How to Use the App</h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            Enter a long URL in the input field and click "Shorten URL" to
            generate a shortened link.
          </li>
          <li>
            Optionally, specify a custom slug for your shortened URL to make it
            more recognizable.
          </li>
          <li>
            View analytics for your shortened URLs, including the number of
            clicks and the last accessed time.
          </li>
          <li>Search by short_code</li>
          <li>Delete short code</li>
          <li>Delete ALL short codes</li>
        </ul>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="doNotShowAgain"
            checked={doNotShowAgain}
            onChange={() => dispatch(toggleDoNotShowAgain())}
            className="h-5 w-5 border-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-gray-700 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="doNotShowAgain"
            className="ml-2 cursor-pointer select-none text-gray-700"
          >
            Do not show this again
          </label>
        </div>
        <button
          onClick={() => dispatch(closeModal())}
          className="mt-6 px-4 py-2 rounded transition bg-blue-600 text-white hover:bg-blue-700"
        >
          <span className="flex justify-center gap-4">
            Close
            <span className="mt-1.5">
              <IoIosClose />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default AppInfoModal;
