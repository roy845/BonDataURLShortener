interface FormButtonsProps {
  onSubmitDisabled: boolean;
  onReset: () => void;
}

const FormButtons = ({ onSubmitDisabled, onReset }: FormButtonsProps) => (
  <div className="flex space-x-4">
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
    <button
      type="button"
      onClick={onReset}
      className="flex-1 py-2 px-4 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
    >
      Reset Form
    </button>
  </div>
);

export default FormButtons;
