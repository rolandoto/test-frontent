import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  Items: [],
  reservationAll: [],
  filterRoom:[],
  loading: false,
  error: null,
  Room:[],
  ReservationContabilidad:[],


  Historyreservation:[],
  loadingHistoryreservation:false,
  errorHistoryreservation:false

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
    },
    setAddReservation: (state, action) => {
      state.Items.push(action.payload);
      state.loading = true;
    },
    setReservationFilter: (state, action) => {
      state.filterRoom = action.payload;
      state.loading = false;
    
    },
    setSaveReservation:(state,action)=>{
      state.Items = action.payload;
      state.loading = true;
    
    },
    setRoom :(state,action) =>{
      state.Room = action.payload;
      state.loading = false;
      
    },
    setReservationContabilidad:(state,action)=>{
      state.ReservationContabilidad = action.payload
      state.loading = false;
      
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setloadingHistoryreservation:(state,action)=>{
      state.errorHistoryreservation = false;
      state.loadingHistoryreservation = true;
    },
    setHistoryreservation:(state,action)=>{
      state.Historyreservation = action.payload
      state.loadingHistoryreservation = false;
    },
    setErrorHistoryReservation: (state, action) => {
      state.loadingHistoryreservation = false;
      state.errorHistoryreservation = false;
    },

  },
});

export const { loading, setReservation, setReservationFilter,setRoom, setError ,setAddReservation} =
  ReservationSlice.actions;

export default ReservationSlice.reducer;
