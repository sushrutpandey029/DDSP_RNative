import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authLogin, authLogout } from "../../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const userData = await authLogin(credentials);
      console.log("login-user-data", userData);
       if (userData.status === true) {
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        return userData;
      } else {
        return rejectWithValue("Login failed. Please check your credentials.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.errormessage ||
        "User not found. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const initializeUser = createAsyncThunk(
  "auth/initializeUser",
  async ( _, {rejectWithValue}) =>{
    try{
      const userData = await AsyncStorage.getItem("userData");
      if(userData) {
        return JSON.parse(userData);
      }
      return null;
    }catch(error) {
      console.error("Error fetching user data from AsyncStorage",error);
      return rejectWithValue("Failed to load user data.");
    }
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue}) => {
    try{
      const response = await authLogout();
      console.log('logout-resp',response)
      if(response.success === true) {
        await AsyncStorage.removeItem("userData");
        return true;
      }else{
        return rejectWithValue("Failed to logout. Pleaser try again.");
      }
    }catch(error) {
      const errorMessage = error.response?.data?.message || "An error occured during logout.";
      return rejectWithValue(errorMessage);
    }
  }
) 

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user.user = {
        ...state.user.user, // Keep existing fields
        ...action.payload, // Overwrite or add updated fields
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(initializeUser.fulfilled, (state, action) => {
        if(action.payload) {
          state.isLoggedIn = true;
          state.user = action.payload;
        }
      })
      .addCase(initializeUser.rejected, (state , action) => {
        console.error("Failed to initialize user", action.payload)
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout, setUser, updateUser } = authSlice.actions;

export default authSlice.reducer;
