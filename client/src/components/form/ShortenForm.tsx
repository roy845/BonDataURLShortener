import FormInput from "./FormInput";
import FormButtons from "./FormButtons";
import ResponseMessage from "./ResponseMessage";
import useUrlShortener from "../../hooks/useUrlShortener";
import MainLayout from "../layout/MainLayout";
import SecondaryHeader from "../layout/SecondaryHeader";
import AppInfoModal from "../modal/AppInfoModal";

const ShortenForm = (): JSX.Element => {
  const {
    url,
    setUrl,
    customSlug,
    setCustomSlug,
    response,
    error,
    loading,
    reset,
    handleSubmit,
  } = useUrlShortener();

  return (
    <MainLayout title="URL Shortener Form">
      <AppInfoModal />
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <SecondaryHeader title="URL Shorten Form" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Enter a URL to shorten:"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
          <FormInput
            label="Custom Slug (optional):"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="your-custom-slug"
          />
          <FormButtons
            onSubmitDisabled={loading}
            onReset={reset}
            isShown={
              Boolean(url) ||
              Boolean(customSlug) ||
              Boolean(response) ||
              Boolean(error)
            }
          />
        </form>
        <ResponseMessage response={response?.short_url} error={error} />
      </div>
    </MainLayout>
  );
};

export default ShortenForm;
