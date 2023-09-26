import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  Items: [],
  reservationAll: [],
  filterRoom:[],
  loading: false,
  error: null,
  Room:[]
};

const initialState = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).ReservationSlice : DEFAULT_STATE;
})();

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
      state.loading = true;
      console.log({ "---payload": state.entities });
    },
    setReservationFilter: (state, action) => {
      state.filterRoom = action.payload;
      state.loading = false;
      console.log({ "---payload filter room": state.filterRoom });
    },
    setSaveReservation:(state,action)=>{
      state.Items = action.payload;
      state.loading = true;
      console.log({ "---save": state.entities });
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
