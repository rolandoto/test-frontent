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
        try {
            const response = await HttpClient.PostCreatebill({ token, body });
            console.log({ "response.id": response.id });
            console.log({ "response.id": response.id });
            console.log({ "response.id": Boolean(response.id.trim()) });
            
            // Verifica si la factura se creó correctamente
            if (Boolean(response.id.trim())) {
                // Si aún no se ha enviado la factura, procede
                if (!invoiceSent) {
                    const pdf = await HttpClient.GetSalesInvoice({ token, id: response.id });
                    dispatch(setPdf(pdf));
                    dispatch(setPayment(response));
                    toast.success("envio exitoso");
                    dispatch(setDian(response));
                    const sigobyId = await HttpClient.PostInsertSigOpdfbyid({ id: id_Reserva, id_sigo: response.id });
                    if (sigobyId) {
                        toast.success("Se guarado correctamente la facturacion");
                        history.push(`/DetailDashboard/${id_Reserva}`);
                    } else {
                        toast.error("Se produjo un error");
                    }
                    // Marca que la factura ha sido enviada para evitar que este bloque se ejecute de nuevo
                    invoiceSent = true;
                }
            } else {
                dispatch(setErrorInvoinces("no found"));
                toast.error("envio error");
                window.location.reload()
            }
        } catch (error) {
            dispatch(setErrorInvoinces("no found"));
            toast.error("envio error");
            window.location.reload()
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