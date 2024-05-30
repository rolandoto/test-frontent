import {createSlice}  from "@reduxjs/toolkit"

export  const initialState = {
    error:null,
    errorInvoince:false,
    ErrorTaxes:null,

    Loanding:false,
    loadingInvoinces:false,
    LoadingTaxes:false,


    Invoinces:[],
    seller:[],
    products:[],
    Dian:[],
    Payment:[],
    typeDocumentDian:[],
    Taxes:[],
   
    
   
    ListClient:[],
    loadingClient:false,
    errorClient:false,
    Pdf:[],
    sigoBYIDpdf:[],
    payabono:[],
    InvonceByIdReservation:[],
   
}



export const DianSlice = createSlice({
    name:"Dian",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.errorInvoince=null
        },

        //invoinces
        setInvoinces(state,action){
            state.Invoinces = action.payload
            state.loadingInvoinces = false
        },
        setLoadingInvonces:(state,action)=>{
            state.loadingInvoinces = true
            state.errorInvoince=null
        },
        setErrorInvoinces:(state,action)=>{
            state.loadingInvoinces = false
            state.errorInvoince= action.payload
        },

        //CLient
        setClient:(state,action) =>{
            state.loadingClient = false
            state.ListClient= action.payload
        },
        setClientLoading:(state,action) =>{
            state.loadingClient = true
            state.errorClient = null
        },
        setClientError:(state,action) =>{
            state.loadingClient = false
            state.errorClient= true 
        },

        //taxes 
        setTaxes:(state,action) =>{
            state.LoadingTaxes = false
            state.Taxes= action.payload
        },
        setTaxesLoading:(state,action) =>{
            state.LoadingTaxes = true
            state.ErrorTaxes = null
        },
        setTaxesError:(state,action) =>{
            state.LoadingTaxes = false
            state.ErrorTaxes= true 
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
        setDianSigoPdf:(state,action) =>{
            state.sigoBYIDpdf = action.payload
            state.loading = false
        },
        setPayabono:(state,action) =>{
            state.payabono = action.payload
            state.loading = false
        },
        setInvonceByIdReservation:(state,action) =>{
            state.InvonceByIdReservation = action.payload
            state.loading = false
        },
        setError:(state,action) =>{
            state.loading = false
            state.error = action.payload
        },
        
    },
    
})

export const {loading,
                setInvoinces,
                setLoadingInvonces,
                setErrorInvoinces,
                setClient,
                setClientError,
                setClientLoading,
                setTSeller,
                setError,
                setTypeDian,
                setProducts,
                setDian,
                setPayment,
                setDianSigoPdf,
                setPayabono,
                setPdf,
                setInvonceByIdReservation,
                setTaxes,
                setTaxesLoading,
                setTaxesError} = DianSlice.actions

export default DianSlice.reducer