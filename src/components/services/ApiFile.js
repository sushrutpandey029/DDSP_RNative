import { BaseUrl, addFarmerInfoApi, adminUserUpdateApi } from "../api/Api";
import axios from "axios";

export const addFarmerInfo = async (request) => {
  const api = `${BaseUrl}/${addFarmerInfoApi}`;
  try {
    const response = await axios.post(api, request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminUserUpdate = async (id, request) => {
  const api = `${BaseUrl}/${adminUserUpdateApi}/${id}`;
  try {
    const response = await axios.put(api, request);
    return response.data;
  } catch (error) {
    throw error;
  }
};
