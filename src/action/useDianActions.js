import { useHistory } from "react-router-dom/cjs/react-router-dom";
import HttpClient from "../HttpClient"
import { useAppDispatch } from "../hooks/redux"
import { setClient,
        loading, 
        setTypeDian,
        setError,
        setTSeller ,
        setProducts,
        setPayment,
        setLoadingInvonces,
        setErrorInvoinces,
        setDianSigoPdf,
        setPayabono,
        setInvonceByIdReservation,
        setInvoinces,
        setClientLoading,
        setClientError,
        setTaxesError,
        setTaxes,
        setTaxesLoading,
        setLoadingDashboard,
        setDashboard,
        setErrorDashboard,
        setPorductsError,
        setProductsLoading,
        setLoadingProductMinibar,
        setErrorProductMinibar,
        setProductMinibar,
        RegisterClientLoading,
        RegisterClientError,
        setRegisterClient
        } from "../reducers/DianReducer"
import { toast } from "react-hot-toast";
import { useCallback } from "react";

const UseDianActions =() =>{

    const history = useHistory()
  
    const dispatch =  useAppDispatch()
    
    const GetCLientDian =async({token,document}) =>{
        dispatch(setClientLoading())
        try {
            const response =  await  HttpClient.GetLisClienteDian({token,document})
            if(response){
                dispatch(setClient(response.data))
            }else{
                dispatch(setClient(""))
                dispatch(setError("no found"))
            }
        } catch (error) {
            dispatch(  setClientError("no found")) 
        }
    }

    const GetTypeDian =async({token}) =>{
        dispatch(loading())
        try {
            const response =  await  HttpClient.GetTypeDocuments({token})
          

            if(response){
                dispatch(setTypeDian(response))
            }else{
                dispatch(setError("no found"))
            }
        } catch (error) {
            
        }
    }

    const GetTSeller =async({token}) =>{
        dispatch(loading())
        try {
            const response =  await  HttpClient.GetSellerDian({token})
            
            if(response){
                dispatch(setTSeller(response))
            }else{
                dispatch(setError("no found"))
            }
        } catch (error) {
            
        }
    }

    const GetTProductsDian =async({token}) =>{
        dispatch(setProductsLoading())
        try {
            const response =  await  HttpClient.GetProducts({token})
            if(response){
                dispatch(setProducts(response))
            }else{
                dispatch(setPorductsError("no found"))
            }
        } catch (error) {
            
        }
    }

    const PostSendInvoinces = useCallback(async({ token,body,id_Reserva,id_user,fecha,Retention}) => {
        dispatch(setLoadingInvonces());
        try {
            const response = await HttpClient.PostSigoBYClient({ token,body,id_Reserva,id_user,fecha,Retention})
            if(response){
                dispatch(setInvoinces(response)) 
                toast.success("Exitos: ");
                history.push(`/DetailDashboard/${id_Reserva}`)
            }else{
                toast.error("error en el peticion")
                dispatch(setErrorInvoinces("error"));
            }
        } catch (error) {
            toast.error("Error en HttpClient.PostCreatebill: " + error.message);
            dispatch(setErrorInvoinces("error"));
        }
    }, []);
    
    


    const GetPayment =async({token}) =>{
        dispatch(loading())
        try {
            const response =  await  HttpClient.GetTypePayment({token})
           
            if(response){
                dispatch(setPayment(response))
            }else{
                dispatch(setError("no found"))
                
            }
        } catch (error) {
            toast.error("envio error")
        }
    }


    const getPdfSigo =async({token,id}) =>{
        dispatch(loading())
        try {
            const response =  await  HttpClient.GetSalesInvoice({token,id})
        
            if(response.Status !==500){
                dispatch(setDianSigoPdf(response))
                return response
            }else{
                toast.error("envio error")
               dispatch(setError("error no found"))
            }
        } catch (error) {
            toast.error("envio error")
            dispatch(setError("error no found"))
           
        }
    }

    const GetPayAbono =async({id}) =>{
        dispatch(loading())
        try {
            const response = await HttpClient.GetPayAbono({id})
           
            if(response){
                dispatch(setPayabono(response))
            }else{
                toast.error("envio error")
                dispatch(setError("no found"))
            }
        } catch (error) {
            toast.error("envio service")
            dispatch(setError("no found Service "))
        }
    }
   

    const GetInvonceByIdReservation=async({id}) =>{
        dispatch(loading())
        try {
            const response = await HttpClient.GetInvoincesByReservationDian({id})
          
            if(response){
                dispatch(setInvonceByIdReservation(response))
                toast.success("envio")
            }else{
                toast.error("envio error")
                dispatch(setError("no found"))
            }
        } catch (error) {
            toast.error("envio service")
            dispatch(setError("no found Service "))
        }
    }


    const GetTaxesDian=async({token}) =>{
        dispatch(setTaxesLoading())
        try {
            const response = await HttpClient.GetTaxesDian({token})
            if(response){
                dispatch(setTaxes(response))
                toast.success("envio")
            }else{
                toast.error("envio error")
                dispatch(setTaxesError("no found"))
            }
        } catch (error) {
            toast.error("envio service")
            dispatch(setTaxesError("no found Service "))
        }
    }
   
    const GetProductDashboard=async() =>{
        dispatch(setLoadingDashboard())
        try {
            const response = await HttpClient.GetPorductoSigoDashboard()
            console.log(response)
            if(response){
                dispatch(setDashboard(response))
                toast.success("envio")
            }else{
                toast.error("envio error asdsadsa")
                dispatch(setErrorDashboard("no found"))
            }
        } catch (error) {
            toast.error("envio service")
            dispatch(setErrorDashboard("no found Service "))
        }
    }


    const GetProductMinibar=async({id}) =>{
        dispatch(setLoadingProductMinibar())
        try {
            const response = await HttpClient.PostProductRoomDetail({id})
          
            if(response){
                dispatch(setProductMinibar(response))
                toast.success("envio")
            }else{
                toast.error("envio error")
                dispatch(setErrorProductMinibar("no found"))
            }
        } catch (error) {
            toast.error("envio service")
            dispatch(setErrorProductMinibar("no found Service "))
        }
    }


    const PostCLienteRegister=async({body,token}) =>{
        dispatch(RegisterClientLoading())
        try {
            const response = await HttpClient.PostClientSigo({body,token})
            console.log(response)
            if(response){
                dispatch(setRegisterClient(response))
                toast.success("envio")
            }else{
                toast.error("envio el registrar la empresa")
                dispatch(RegisterClientError("no found"))
            }
        } catch (error) {
            toast.error("envio service")
            dispatch(RegisterClientError("no found Service "))
        }
    }
   

    return {GetCLientDian,
            GetTypeDian,
            GetTSeller,
            GetTProductsDian,
            PostSendInvoinces,
            GetPayment,
            getPdfSigo,
            GetPayAbono,
            GetInvonceByIdReservation,
            GetTaxesDian,
            GetProductDashboard,
            GetProductMinibar,
            PostCLienteRegister
           }
}

export default  UseDianActions
