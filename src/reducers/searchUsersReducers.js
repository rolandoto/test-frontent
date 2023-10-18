import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  search: [],
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.loading = false;
      console.log({ "---payload": state.search });
    },
    setError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { loading, setSearch, setError } = searchSlice.actions;

export default searchSlice.reducer;
