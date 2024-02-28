import { useHistory } from "react-router-dom/cjs/react-router-dom";
import HttpClient from "../HttpClient"
import { useAppDispatch } from "../hooks/redux"
import { setClient,
        loading, 
        setTypeDian,
        setError,
        setTSeller ,
        setProducts,
        setDian,
        setPayment,
        setLoadingInvonces,
        setErrorInvoinces,
        setPdf,
        setDianSigoPdf
        } from "../reducers/DianReducer"
import { toast } from "react-hot-toast";

const UseDianActions =() =>{

    const history = useHistory()

    const dispatch =  useAppDispatch()
    
    const GetCLientDian =async({token}) =>{
    
        dispatch(loading())

        try {
            const response =  await  HttpClient.GetLisClienteDian({token})
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

    const PostSendInvoinces =async({token,body,id_Reserva}) =>{
        dispatch(setLoadingInvonces())
        try {
            const response =  await  HttpClient.PostCreatebill({token,body})
        
            if(response.Status !==400){
                const pdf = await HttpClient.GetSalesInvoice({token,id:response.id})
                dispatch(setPdf(pdf))
                dispatch(setPayment(response))
                toast.success("envio exitoso")
                dispatch(setDian(response))
                const sigobyId = await HttpClient.PostInsertSigOpdfbyid({id:id_Reserva,id_sigo:response.id})
                if(sigobyId){
                    toast.success("Se guarado correctamente la facturacion")
                    history.push(`/DetailDashboard/${id_Reserva}`)
                }else{
                    toast.error("Se produjo un error")
                }
             
            }else{
                dispatch(setErrorInvoinces("no found"))
                toast.error("envio error")
            }
        } catch (error) {
            dispatch(setErrorInvoinces("no found"))
            toast.error("envio error")
        }
    }


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
                return response
            }else{
                toast.error("envio error")
            }
        } catch (error) {
            toast.error("envio error")
        }
    }

   

   

    return {GetCLientDian,
            GetTypeDian,
            GetTSeller,
            GetTProductsDian,
            PostSendInvoinces,
            GetPayment,
            getPdfSigo
           }
}

export default  UseDianActions