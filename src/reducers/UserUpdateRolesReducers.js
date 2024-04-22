import {createSlice}  from "@reduxjs/toolkit"

const initialState = {
    updateRoles: [],
    loading: false,
    error: false,
};

export const UserUpdateRolesSlice = createSlice({
    name: "Formats",
    initialState,
    reducers: {
      loading: (state) => {
        state.loading = true;
        state.error = null;
      },
      setUpdateRoles: (state, action) => {
        state.updateRoles = action.payload;
        state.loading = false;
      },
      setError: (state, action) => {
        state.loading = true;
        state.error = action.payload;
      },
    },
  });
  
  export const { loading, setUpdateRoles, setError } =UserUpdateRolesSlice.actions;
  
  export default UserUpdateRolesSlice.reducer;
  