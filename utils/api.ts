import axios from "axios";
import customFetch from "./axios";

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
