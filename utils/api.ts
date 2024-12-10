import axios from "axios";
import customFetch from "./axios";
import { RequestBody } from "./types";

export const fetchTrain = async () => {
  try {
    const response = await customFetch.get("/v2/tcdd/load/");

    return response.data?.response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.message;
    } else {
      return "Request failed";
    }
  }
};

export const searchTrain = async (requestBody: RequestBody) => {
  try {
    const response = await customFetch.post("/v2/tcdd/query", requestBody);
    console.log(response.data);
    return response.data.details;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.message;
    } else {
      return "Request failed";
    }
  }
};

export const ticketRequest = async ({ email }: { email: string }) => {
  try {
    const res = await customFetch.get(`/ticket-request/mail/${email}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.message;
    } else {
      return "Request failed";
    }
  }
};
