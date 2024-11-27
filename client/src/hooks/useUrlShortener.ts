import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResponseData, UseUrlShortenerReturn } from "../types/types";
import { shortenUrl } from "../services/api";
import { Utils } from "../utils/utils";

const useUrlShortener = (): UseUrlShortenerReturn => {
  const [url, setUrl] = useState<string>("");
  const [customSlug, setCustomSlug] = useState<string>("");
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  let errorMsg: string = "";

  const shorten = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setResponse(null);

    if (!url) {
      errorMsg = "Please enter a URL.";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    if (!Utils.isValidUrl(url)) {
      errorMsg = "Please enter a valid URL.";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    try {
      const result: ResponseData = await shortenUrl({
        url,
        custom_slug: customSlug || "",
      });
      setResponse(result);
      toast.success("URL shortened successfully!");
    } catch (err: any) {
      errorMsg = err.message || "An unexpected error occurred.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    shorten();
  };

  const reset = (): void => {
    setUrl("");
    setCustomSlug("");
    setResponse(null);
    setError(null);
    toast.info("Form has been reset.");
  };

  return {
    url,
    setUrl,
    customSlug,
    setCustomSlug,
    response,
    error,
    loading,
    reset,
    handleSubmit,
  };
};

export default useUrlShortener;
