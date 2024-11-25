interface FormInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ value, onChange }: FormInputProps) => (
  <div>
    <label htmlFor="url-input" className="block text-gray-700 font-semibold">
      Enter a URL to shorten:
    </label>
    <input
      id="url-input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="https://example.com"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default FormInput;
