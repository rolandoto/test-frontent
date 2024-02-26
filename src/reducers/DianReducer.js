import {createSlice}  from "@reduxjs/toolkit"

export  const DEFAULT_STATE = {
    ListClient:[],
    Loanding:false,
    error:null,
    typeDocumentDian:[],
    seller:[],
    products:[],
    Dian:[],
    Payment:[],
    loadingInvoinces:false,
    Pdf:[]
}

const initialState = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).Dian : DEFAULT_STATE;
})();

export const DianSlice = createSlice({
    name:"Dian",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error=null
        },
        setLoadingInvonces:(state,action)=>{
            state.loadingInvoinces = true
            state.error=null
        },
        setErrorInvoinces:(state,action)=>{
            state.loadingInvoinces = false
            state.error= action.payload
        },
        setClient:(state,action) =>{
            state.ListClient = action.payload
            state.loading = false
        },
        setTypeDian:(state,action) =>{
            state.typeDocumentDian = action.payload
            state.loading = false
        },
        setTSeller:(state,action) =>{
            state.seller = action.payload
            state.loading = false
        },
        setProducts:(state,action) =>{
            state.products = action.payload
            state.loading = false
        },
        setPdf:(state,action) =>{
            state.Pdf = action.payload
            state.loading = false
        },
        setDian:(state,action) =>{
            state.Dian = action.payload
            state.loadingInvoinces = false
        },
        setPayment:(state,action) =>{
            state.Payment = action.payload
            state.loading = false
        },
        setError:(state,action) =>{
            state.loading = false
            state.error = action.payload
        },
        
    }
})

export const {loading,
                setClient,
                setTSeller,
                setError,
                setTypeDian,
                setProducts,
                setDian,
                setPayment,
                setLoadingInvonces,
                setErrorInvoinces,
                setPdf} = DianSlice.actions

export default DianSlice.reducer