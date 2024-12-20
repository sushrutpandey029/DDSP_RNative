import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAsstPC, getAllFieldOfficer } from "../../services/ApiFile";

export const getFieldOfficerList = createAsyncThunk(
  "officer/getFieldOfficerList",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await getAllFieldOfficer();
      console.log("getfieldofficerlist-resp", response);
      if (response.success) {
        return response;
      } else {
        return rejectWithValue("Failed to load Field Officer List.");
      }
    } catch (error) {
      return rejectWithValue(
        "Field Officer List not loaded, please try again later."
      );
    }
  }
);

export const getAsstPCList = createAsyncThunk(
  "officer/getAsstPCList",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await getAllAsstPC();
      console.log("getassitprocor-resp", response);
      if (response.success) {
        return response;
      } else {
        return rejectWithValue(
          "Failed to load Assistant Project Coordinator List."
        );
      }
    } catch (err) {
      return rejectWithValue(
        "Assistant Project Coordinator List not loaded, please try again later."
      );
    }
  }
);

const initialState = {
  FOlist: {
    loading: false,
    data: null,
    error: null,
  },
  APClist: {
    loading: false,
    data: null,
    error: null,
  },
};

const officerSlice = createSlice({
  name: "officer",
  initialState,
  extraReducers: (builder) => {
    // handle FOlist
    builder
      .addCase(getFieldOfficerList.pending, (state) => {
        state.FOlist.loading = true;
        state.FOlist.error = null;
      })

      .addCase(getFieldOfficerList.fulfilled, (state, action) => {
        state.FOlist.loading = false;
        state.FOlist.data = action.payload;
      })

      .addCase(getFieldOfficerList.rejected, (state, action) => {
        state.FOlist.loading = false;
        state.FOlist.error = action.payload;
      });

    // handle APClist
    builder
      .addCase(getAsstPCList.pending, (state) => {
        state.APClist.loading = true;
        state.APClist.error = null;
      })

      .addCase(getAsstPCList.fulfilled, (state, action) => {
        state.APClist.loading = false;
        state.APClist.data = action.payload;
      })

      .addCase(getAsstPCList.rejected, (state, action) => {
        state.APClist.loading = false;
        state.APClist.error = action.payload;
      });
  },
});

export default officerSlice.reducer
