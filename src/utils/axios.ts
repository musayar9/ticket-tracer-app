import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://api.biletio.xyz",
});

export default customFetch;
