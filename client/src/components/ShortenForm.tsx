import useUrlShortener from "../hooks/useUrlShortener";
import FormInput from "./FormInput";
import FormButtons from "./FormButtons";
import ResponseMessage from "./ResponseMessage";

const ShortenForm: React.FC = () => {
  const { url, setUrl, response, error, loading, reset, handleSubmit } =
    useUrlShortener();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput value={url} onChange={(e) => setUrl(e.target.value)} />
        <FormButtons onSubmitDisabled={loading} onReset={reset} />
      </form>
      <ResponseMessage response={response?.short_url} error={error} />
    </div>
  );
};

export default ShortenForm;
