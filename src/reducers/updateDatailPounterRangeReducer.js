import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateDetail: [],
  loading: false,
  error: false,
};

export const UpdateDetailPounterRangeSlice = createSlice({
  name: "UpdateDetailPounterRangeSlice",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUpdate: (state, action) => {
      state.updateDetail = action.payload;
      state.loading = false;
      console.log("sdihasoisaidash");
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loading, setUpdate, setError } =
UpdateDetailPounterRangeSlice.actions;

export default UpdateDetailPounterRangeSlice.reducer;
