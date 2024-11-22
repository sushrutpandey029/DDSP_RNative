import { BaseUrl, loginApi } from "../api/Api";
import axios from "axios";

// user login api
export const authLogin = async (request) => {
  const api = `${BaseUrl}/${loginApi}`;
  try {
    const response = await axios.post(api, request);
    // console.warn('authserv-resp',response);
    // console.warn('authserv-data',response.data);
    return response.data;
  } catch (error) {
    // console.warn('srv-er',error)
    throw error;
  }
};
