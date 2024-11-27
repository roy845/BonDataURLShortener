import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";
import {
  AnalyticsType,
  ResponseData,
  ShortCode,
  ShortenRequest,
} from "../types/types";

export const shortenUrl = async (
  requestData: ShortenRequest
): Promise<ResponseData> => {
  try {
    const response: AxiosResponse<ResponseData> = await axiosInstance.post(
      "/shorten/",
      requestData
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // API responded with a status other than 2xx
      throw new Error(
        error.response.data.message ||
          "An error occurred while shortening the URL"
      );
    } else if (error.request) {
      // No response was received from the server
      throw new Error(
        "No response received. Please check your network connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

/**
 * Fetch analytics data for a given short code.
 * @param short_code - The short code of the URL.
 * @returns The analytics data as a promise.
 */
export const getAnalytics = async (
  short_code: string
): Promise<AnalyticsType> => {
  try {
    const response: AxiosResponse<AnalyticsType> = await axiosInstance.get(
      `/analytics/${short_code}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to fetch analytics data."
      );
    } else if (error.request) {
      throw new Error(
        "No response received. Please check your network connection."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

/**
 * Fetch all short codes from the server.
 * @returns An array of short codes and their associated URLs.
 */
export const getAllShortCodes = async (
  keyword: string = ""
): Promise<ShortCode[]> => {
  try {
    const response = await axiosInstance.get<ShortCode[]>(
      `/analytics/short-codes${keyword ? `?keyword=${keyword}` : ""}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to fetch short codes."
      );
    } else if (error.request) {
      throw new Error(
        "No response received. Please check your network connection."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

/**
 * Delete a specific short code from the server.
 * @param short_code - The short code to delete.
 * @returns A success message or error.
 */
export const deleteShortCodeAPI = async (
  short_code: string
): Promise<string> => {
  try {
    const response = await axiosInstance.delete(`/analytics/${short_code}`);
    return response.data.message || "Short code deleted successfully.";
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to delete short code."
      );
    } else if (error.request) {
      throw new Error(
        "No response received. Please check your network connection."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

/**
 * Delete all short codes from the server.
 * @returns A success message or error.
 */
export const deleteAllShortCodesAPI = async (): Promise<string> => {
  try {
    const response = await axiosInstance.delete("/analytics/short-codes");
    return response.data.message || "All short codes deleted successfully.";
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to delete all short codes."
      );
    } else if (error.request) {
      throw new Error(
        "No response received. Please check your network connection."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};
