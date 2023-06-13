import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateDetail: [],
  loading: false,
  error: false,
};

export const UpdateDetailPounterSlice = createSlice({
  name: "Formats",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUpdate: (state, action) => {
      state.updateDetail = action.payload;
      state.loading = false;
      console.log({ "---payload": state.updateDetail });
    },
    setError: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export const { loading, setUpdate, setError } =
  UpdateDetailPounterSlice.actions;

export default UpdateDetailPounterSlice.reducer;
