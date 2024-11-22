import {
  BaseUrl,
  addFarmerInfoApi,
  adminUserUpdateApi,
  getFarmerApi,
  addCultivationCostDetailsApi,
  addCultivationCostDetailsPostApi,
  getProductionDetailsApi,
  addProductionDetailsApi,
  addWorkDetailsApi
} from "../api/Api";
import axios from "axios";

// add farmer infomation api
export const addFarmerInfo = async (request) => {
  const api = `${BaseUrl}/${addFarmerInfoApi}`;
  try {
    const response = await axios.post(api, request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

 // admin profile update api
export const adminUserUpdate = async (id, request) => {
  const api = `${BaseUrl}/${adminUserUpdateApi}/${id}`;
  try {
    const response = await axios.put(api, request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFarmerDetails = async (request) => {
  const api = `${BaseUrl}/${getFarmerApi}`;
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// cultivation cost details form api to get data from api
export const addCultivationCostDetails = async (id) => {
  const api = `${BaseUrl}/${addCultivationCostDetailsApi}/${id}`;
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// culvation cost details form api to submit data
export const addCultivationCostDetailsPost = async (id, request) => {
  const api = `${BaseUrl}/${addCultivationCostDetailsPostApi}/${id}`;
  try{
    const response = await axios.post(api,request);
    return response.data;
  }catch(error) {
    throw error;
  }
}

//get production details api
export const getProductionDetails = async (id) => {
  const api = `${BaseUrl}/${getProductionDetailsApi}/${id}`;
  try{
    const response = await axios.get(api);
    return response.data;
  }catch(error){
    throw error;
  }
}

// production details form api to submit data
export const addProductionDetails = async (id, request) => {
  const api = `${BaseUrl}/${addProductionDetailsApi}/${id}`;
  try{
    const response = await axios.post(api, request);
    return response.data;
  }catch(error) {
    throw error;
  }
}

// project coordination work api to submit data to add work details
export const addworkdetails = async (id, request) => {
  const api = `${BaseUrl}/${addWorkDetailsApi}/${id}`;
  try{
    const response = await axios.post(api,request);
    return response.data;
  }catch(error) {
    throw error;
  }
}
