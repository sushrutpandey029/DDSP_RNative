import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authLogin } from "../../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const userData = await authLogin(credentials);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
       return userData;
    } catch (error) {
      const errorMessage =
        error.response?.data?.errormessage || "User not found. Please try again";
        console.warn('er', error);
       console.warn('emsg',errorMessage)
      return rejectWithValue(errorMessage);
    }
  }
);

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
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.loading = false;
      AsyncStorage.removeItem("userData");
    },
    setUser : (state, action) => {
      state.isLoggedIn = true,
      state.user = action.payload
    },
    updateUser: (state, action) => {
      state.user = action.payload
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
      });
  },
});

export const { logout, setUser, updateUser } = authSlice.actions;

export default authSlice.reducer;
