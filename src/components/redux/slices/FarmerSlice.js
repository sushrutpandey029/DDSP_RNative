import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFarmerListByUserId } from "../../services/ApiFile";
 
 
export const getFarmerById = createAsyncThunk(
    "farmer/getFarmerById",
    async (credentials, {rejectWithValue}) => {
        try{
              const response = await getFarmerListByUserId(credentials);
            if(response.success) {
                return response;
            }else{
              return  rejectWithValue("Error loading farmer list.")
            }
        }catch(error) {
            return rejectWithValue("Farmers list not loaded. Please try again.")
        }
    }
)

const initialState = {
    loading:false,
    farmerList:null,
    error:null
}

const farmerSlice = createSlice({
    name:'farmer',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFarmerById.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getFarmerById.fulfilled, (state, action) => {
                state.loading = false;
                state.farmerList = action.payload;
                state.error = null
            })
            .addCase(getFarmerById.rejected, (state, action) => {
                state.loading = false;
                 state.error = action.payload    
            })
    }
})

export default farmerSlice.reducer