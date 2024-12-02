import axios from "axios";
import customFetch from "./axios";
import { RequestBody } from "./types";

export const fetchTrain = async () => {
  try {
    const response = await customFetch.get("/tcdd/load/");

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
    const response = await customFetch.post("/tcdd/query", requestBody);
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


