interface FormInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  label,
  value,
  placeholder,
  onChange,
}: FormInputProps): JSX.Element => (
  <>
    <label htmlFor="url-input" className="block text-gray-700 font-semibold">
      {label}
    </label>
    <input
      id="url-input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || ""}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </>
);

export default FormInput;
