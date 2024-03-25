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

    const PostSendInvoinces = async ({ token, body, id_Reserva }) => {
        // Utiliza una variable de estado para controlar si ya se ha enviado la factura
        let invoiceSent = false;
    
        dispatch(setLoadingInvonces());
        
        HttpClient.PostCreatebill({ token, body }).then((itemResponse =>{
               
                toast.success("Se guarado correctamente la facturacion");
                invoiceSent = true;
                 HttpClient.GetSalesInvoice({ token, id: itemResponse.id }).then((item => {
                         history.push(`/DetailDashboard/${id_Reserva}`);
                    toast.success("Se guarado correctamente la facturacion")
                })).catch(e =>{
                    toast.error("error al insertar en el reserva")
                        history.push(`/DetailDashboard/${id_Reserva}`);
                })
            })).catch(e =>{
                toast.error("error ")
            })
          
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
