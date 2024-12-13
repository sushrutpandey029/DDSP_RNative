import { ThemeProvider } from "@react-navigation/native";
import {
  BaseUrl,
  addFarmerInfoApi,
  adminUserUpdateApi,
  getFarmerApi,
  addCultivationCostDetailsApi,
  addCultivationCostDetailsPostApi,
  getProductionDetailsApi,
  addProductionDetailsApi,
  addWorkDetailsApi,
  getFarmerByIdApi,
  addFieldOfficerWorkDetailApi,
  changePasswordApi,
  detailofproductionandcultivationApi,
  workDetailApi,
  getWorkDetailByIdApi,
  updateFarmerDetailsByIdApi,
  updateWorkDetailsByIdApi,
  getLocationApi,
  getLocationByUserIdApi,
  addUserLocationApi,
  deleteLocationByIdApi,
  addInteractionApi,
  getFarmerListByUserIdApi
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
    // console.log('addProd-resp-api',response);
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

export const getFarmerById = async (id) => {
  const api = `${BaseUrl}/${getFarmerByIdApi}/${id}`;
  try{
    const response = await axios.get(api);
    return response.data;
  }catch(error){
    throw error.response;
  }
}

export const addFieldOfficerWorkDetail = async (id, request) => {
  const api = `${BaseUrl}/${addFieldOfficerWorkDetailApi}/${id}`;
  try{
    const response = await axios.post(api,request);
    return response.data;
  }catch(error) {
    throw error;
  }
}

export const changePassword =async (id, request) => {
  const api = `${BaseUrl}/${changePasswordApi}/${id}`;
  try{
    const response = await axios.put(api, request);
    return response.data;
  }catch(error) {
    throw error;
  }
}

export const detailOfProductionandCultivation = async (id) => {
  const api = `${BaseUrl}/${detailofproductionandcultivationApi}/${id}`;
  try{
    const response = await axios.get(api);
    return response.data;
  }catch(error) {
    throw error;
  }
}

export const getWorkDetail = async () => {
  const api = `${BaseUrl}/${workDetailApi}`;
  try{
    const response = await axios.get(api);
    return response.data;
  }catch(error){
    throw error.response;
  }
}

export const getWorkDetailById = async (id) => {
  const api = `${BaseUrl}/${getWorkDetailByIdApi}/${id}`;
  try{
    const response = await axios.get(api);
    return response.data;
  }catch(error) {
    throw error.response;
  }
}

export const updateFarmerDetailsById= async (id, request) => {
  const api = `${BaseUrl}/${updateFarmerDetailsByIdApi}/${id}`;
  try{
    const response = await axios.put(api, request);
    return response.data;
  }catch(error) {
    throw error;
  }
}

export const updateWorkDetailsById = async (id, request) => {
  const api = `${BaseUrl}/${updateWorkDetailsByIdApi}/${id}`;
  try{
    const response = await axios.put(api, request);
    return response.data;
  }catch(error){
    throw error;
  }
}

export const getLocation = async () => {
  const api = `${BaseUrl}/${getLocationApi}`;
  try{
    const response = await axios.get(api);
    return response.data;
  }catch(error) {
    throw error;
  }
}


export const getLocationByUserId = async (id) => {
  const api = `${BaseUrl}/${getLocationByUserIdApi}/${id}`;
  try{
    const response = await axios.get(api);
    return response.data;
  }catch(error) {
    throw error;
  }
}

 // api for adding attendace
export const addUserLocation = async (request) => {
  const api = `${BaseUrl}/${addUserLocationApi}`;
  try{
    const response = await axios.post(api,request);
    return response.data;
  }catch(err) {
    throw err;
  }
}

 // api for deleting attendance list by id
export const deleteLocationById = async (id) => {
  const api = `${BaseUrl}/${deleteLocationByIdApi}/${id}`;
  try{
    const response = await axios.delete(api);
    return response.data;
  }catch(err){  
    throw err;
  }
}

// add interaction with farmer api
export const addInteraction = async (request) => {
  const api = `${BaseUrl}/${addInteractionApi}`;
  try{
    const response = await axios.post(api,request);
    return response.data;
  }catch(err){
    throw err;
  }
}

// get farmerlist by user id api
export const getFarmerListByUserId = async(id) => {
  const api = `${BaseUrl}/${getFarmerListByUserIdApi}/${id}`;
  try{
    const response = await axios.get(api);
     return response.data;
  }catch(err){
     throw err;
  }
}