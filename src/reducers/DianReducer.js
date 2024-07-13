import {createSlice}  from "@reduxjs/toolkit"

export  const initialState = {
    error:null,
    errorInvoince:false,
    ErrorTaxes:null,
    ErrordashboardSigo:false,
    ErrorProducts:false,
    ErrorProductMinibar:false,
    ErrorRegisterClient:false,

    Loanding:false,
    loadingInvoinces:false,
    LoadingTaxes:false,
    LoadingdashboardSigo:false,
    LoadingProducts:false,
    LoadingProductsMinibar:false,
    loadingRegisterClient:false,

    Invoinces:[],
    seller:[],
    products:[],
    Dian:[],
    Payment:[],
    typeDocumentDian:[],
    Taxes:[],
    dashboardSigo:[],
    ProductsMinibar:[],
    RegisterClient:false,
    
   
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

         //minibar
         setProductMinibar(state,action){
            state.ProductsMinibar = action.payload
            state.LoadingProductsMinibar = false
        },
        setLoadingProductMinibar:(state,action)=>{
            state.LoadingProductsMinibar = true
            state.ErrorProductMinibar=null
        },
        setErrorProductMinibar:(state,action)=>{
            state.LoadingProductsMinibar = false
            state.ErrorProductMinibar= action.payload
        },

        //Daashboard
        setDashboard(state,action){
            state.dashboardSigo = action.payload
            state.LoadingdashboardSigo = false
        },
        setLoadingDashboard:(state,action)=>{
            state.LoadingdashboardSigo = true
            state.ErrordashboardSigo=null
        },
        setErrorDashboard:(state,action)=>{
            state.LoadingdashboardSigo = false
            state.ErrordashboardSigo= action.payload
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

        //products
        setProducts:(state,action) =>{
            state.products = action.payload
            state.LoadingProducts = false
        },
        setProductsLoading:(state,action) =>{
            state.LoadingProducts = true
            state.ErrorProducts = null
        },
        setPorductsError:(state,action) =>{
            state.LoadingProducts = false
            state.ErrorProducts= true 
        },
    
        //register client
        setRegisterClient:(state,action) =>{
            state.RegisterClient = action.payload
            state.loadingRegisterClient = false
        },
        RegisterClientLoading:(state,action) =>{
            state.loadingRegisterClient = true
            state.ErrorRegisterClient = null
        },
        RegisterClientError:(state,action) =>{
            state.loadingRegisterClient = false
            state.ErrorRegisterClient= true 
        },
        


        setTypeDian:(state,action) =>{
            state.typeDocumentDian = action.payload
            state.loading = false
        },
        setTSeller:(state,action) =>{
            state.seller = action.payload
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
                setTaxesError,
                setDashboard,
                setLoadingDashboard,
                setErrorDashboard,
                setProductsLoading,
                setPorductsError,
                setProductMinibar,
                setLoadingProductMinibar,
                setErrorProductMinibar,
                setRegisterClient,
                RegisterClientLoading,
                RegisterClientError
            } = DianSlice.actions

export default DianSlice.reducer