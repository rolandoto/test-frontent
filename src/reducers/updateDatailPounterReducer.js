import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateDetail: [],
  loading: false,
  error: "",
};

export const UpdateDetailPounterSlice = createSlice({
  name: "UpdateDetailPounterSlice",
  initialState,
  reducers: {
    loading:(state) =>{
      state.loading=true
      state.error=null
  },
    setUpdate: (state, action) => {
      state.updateDetail = action.payload;
      state.loading = false;
      console.log({ "---payload": state.updateDetail });
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = "sdasdsajdsad"
    },
  },
});

export const { loading, setUpdate, setError } =
  UpdateDetailPounterSlice.actions;

export default UpdateDetailPounterSlice.reducer;
