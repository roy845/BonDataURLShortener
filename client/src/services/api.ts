import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";
import { ResponseData, ShortenRequest } from "../types/types";

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