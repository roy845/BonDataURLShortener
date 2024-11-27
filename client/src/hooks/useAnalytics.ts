import { useState, useEffect } from "react";
import { AnalyticsType } from "../types/types";
import { getAnalytics } from "../services/api";

export const useAnalytics = (shortCode: string | undefined) => {
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const headers: string[] = ["Field", "Value"];

  const items = [
    { field: "Original URL", value: analytics?.original_url },
    { field: "Short Code", value: analytics?.short_code },
    { field: "Access Count", value: analytics?.access_count },
    {
      field: "Last Accessed",
      value: analytics?.last_accessed
        ? new Date(analytics?.last_accessed).toLocaleString()
        : "Never",
    },
  ];

  useEffect(() => {
    const fetchAnalytics = async (): Promise<void> => {
      try {
        if (!shortCode) {
          throw new Error("Invalid short code.");
        }
        const data: AnalyticsType = await getAnalytics(shortCode);
        setAnalytics(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [shortCode]);

  return { analytics, loading, error, headers, items };
};
