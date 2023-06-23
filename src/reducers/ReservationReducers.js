import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Items: [],
  reservationAll: [],
  loading: false,
  error: null,
  Room:[]
};

export const ReservationSlice = createSlice({
  name: "Formats",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setReservation: (state, action) => {
      state.Items = action.payload;
      state.loading = false;
      console.log({ "---payload": state.entities });
    },
    setReservationFilter: (state, action) => {
      state.reservationAll = action.payload;
      state.loading = false;
      console.log({ "---payload actions": state.Items });
    },
    setRoom :(state,action) =>{
      state.Room = action.payload;
      state.loading = false;
      console.log({ "---payload actions": state.Room });
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loading, setReservation, setReservationFilter,setRoom, setError } =
  ReservationSlice.actions;

export default ReservationSlice.reducer;
