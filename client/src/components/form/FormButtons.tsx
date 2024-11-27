import useConfirmReset from "../../hooks/useConfirmReset";
import ConfirmResetModal from "../modal/ConfirmResetModal";

interface FormButtonsProps {
  onSubmitDisabled: boolean;
  isShown: boolean;
  onReset: () => void;
}

const FormButtons = ({
  onSubmitDisabled,
  isShown,
  onReset,
}: FormButtonsProps): JSX.Element => {
  const {
    isModalOpen,
    confirmText,
    isConfirmEnabled,
    openModal,
    closeModal,
    setConfirmText,
    handleConfirm,
  } = useConfirmReset(onReset);

  return (
    <div className="flex justify-between gap-8 mt-6">
      <button
        type="submit"
        disabled={onSubmitDisabled}
        className={`flex-1 py-2 px-4 rounded-md text-white font-semibold ${
          onSubmitDisabled
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {onSubmitDisabled ? "Shortening..." : "Shorten URL"}
      </button>

      {isShown && (
        <button
          type="button"
          onClick={openModal}
          className="flex-1 py-2 px-4 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
        >
          Reset Form
        </button>
      )}
      <ConfirmResetModal
        isOpen={isModalOpen}
        confirmText={confirmText}
        isConfirmEnabled={isConfirmEnabled}
        onClose={closeModal}
        onConfirm={handleConfirm}
        onTextChange={setConfirmText}
      />
    </div>
  );
};

export default FormButtons;
