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
        setInvoinces
        } from "../reducers/DianReducer"
import { toast } from "react-hot-toast";
import { useCallback, useContext, useState } from "react";
import  AutoProvider  from "../privateRoute/AutoProvider";
import moment from "moment";
import ServiceInfomeMovimiento from "../service/ServiceInformeMovimiento";
import { useSelector } from "react-redux";

const UseDianActions =() =>{

    const history = useHistory()
  
    const dispatch =  useAppDispatch()
    
    const GetCLientDian =async({token,document}) =>{
    
        dispatch(loading())

        try {
            const response =  await  HttpClient.GetLisClienteDian({token,document})
            if(response){
                dispatch(setClient(response))
            }else{
                dispatch(setError("no found"))
            }
        } catch (error) {
            
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
        dispatch(loading())
        try {
            const response =  await  HttpClient.GetProducts({token})
           
            if(response){
                dispatch(setProducts(response))
            }else{
                dispatch(setError("no found"))
            }
        } catch (error) {
            
        }
    }

    const PostSendInvoinces = useCallback(async({ token,body,id_Reserva,id_user,fecha}) => {
        dispatch(setLoadingInvonces());
        try {
            const response = await HttpClient.PostSigoBYClient({ token,body,id_Reserva,id_user,fecha})
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

    const saveSettings = async (settings) => {
        // Simula una promesa de guardado
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (settings) {
              resolve();
            } else {
              reject();
            }
          }, 2000);
        });
      };


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
            console.log(response)
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
   

    return {GetCLientDian,
            GetTypeDian,
            GetTSeller,
            GetTProductsDian,
            PostSendInvoinces,
            GetPayment,
            getPdfSigo,
            GetPayAbono,
            GetInvonceByIdReservation,
           }
}

export default  UseDianActions
