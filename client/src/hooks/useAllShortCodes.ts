import { useState, useEffect, useCallback } from "react";
import {
  deleteAllShortCodesAPI,
  deleteShortCodeAPI,
  getAllShortCodes,
} from "../services/api";
import { ShortCode } from "../types/types";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

const useAllShortCodes = () => {
  const [shortCodes, setShortCodes] = useState<ShortCode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchShortCodes, setSearchShortCodes] = useState<string>("");

  const confirmationKeyword = "Delete All Short Codes";

  const headers: string[] = ["Short Code", "Original URL", "Actions"];

  const debouncedSearch = useCallback(
    debounce((keyword: string) => {
      setSearchShortCodes(keyword);
    }, 500),
    []
  );

  useEffect(() => {
    const fetchShortCodes = async (keyword: string = ""): Promise<void> => {
      setLoading(true);
      try {
        const data: ShortCode[] = await getAllShortCodes(keyword);
        setShortCodes(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
        setLoading(false);
      }
    };

    fetchShortCodes(searchShortCodes);
  }, [searchShortCodes]);

  useEffect(() => {
    debouncedSearch(searchKeyword);
  }, [searchKeyword, debouncedSearch]);

  const deleteShortCode = async (short_code: string): Promise<void> => {
    try {
      await deleteShortCodeAPI(short_code);
      setShortCodes((prev) =>
        prev.filter((code) => code.short_code !== short_code)
      );
      toast.success("Short code deleted successfully.");
    } catch (err: any) {
      setError(err.message || "Failed to delete the short code.");
    }
  };

  const deleteAllShortCodes = async (): Promise<void> => {
    try {
      await deleteAllShortCodesAPI();
      setShortCodes([]);
      toast.success("All short codes deleted successfully.");
    } catch (err: any) {
      setError(err.message || "Failed to delete all short codes.");
    }
  };

  const handleDeleteAll = async (): Promise<void> => {
    if (confirmText === confirmationKeyword) {
      await deleteAllShortCodes();
      setModalOpen(false);
      setConfirmText("");
    }
  };

  return {
    loading,
    error,
    shortCodes,
    headers,
    deleteShortCode,
    setModalOpen,
    isModalOpen,
    confirmText,
    confirmationKeyword,
    handleDeleteAll,
    setConfirmText,
    searchKeyword,
    setSearchKeyword,
  };
};

export default useAllShortCodes;
