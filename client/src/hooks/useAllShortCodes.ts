import { useState, useEffect } from "react";
import { getAllShortCodes } from "../services/api";
import { ShortCode, UseAllShortCodesReturn } from "../types/types";

const useAllShortCodes = (): UseAllShortCodesReturn => {
  const [shortCodes, setShortCodes] = useState<ShortCode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const headers: string[] = ["Short Code", "Original URL", "Actions"];

  useEffect(() => {
    const fetchShortCodes = async (): Promise<void> => {
      try {
        const data: ShortCode[] = await getAllShortCodes();
        setShortCodes(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
        setLoading(false);
      }
    };

    fetchShortCodes();
  }, []);
  return { loading, error, shortCodes, headers };
};

export default useAllShortCodes;
