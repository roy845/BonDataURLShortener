import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResponseData } from "../types/types";
import { shortenUrl } from "../services/api";
import { Utils } from "../utils/utils";

const useUrlShortener = () => {
  const [url, setUrl] = useState<string>("");
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const shorten = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    if (!url) {
      const errorMsg = "Please enter a URL.";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    if (!Utils.isValidUrl(url)) {
      const errorMsg = "Please enter a valid URL.";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    try {
      const result = await shortenUrl({ url });
      setResponse(result);
      toast.success("URL shortened successfully!");
    } catch (err: any) {
      const errorMsg = err.message || "An unexpected error occurred.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    shorten();
  };

  const reset = () => {
    setUrl("");
    setResponse(null);
    setError(null);
    toast.info("Form has been reset.");
  };

  return {
    url,
    setUrl,
    response,
    error,
    loading,
    reset,
    handleSubmit,
  };
};

export default useUrlShortener;
