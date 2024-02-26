import { useHistory } from "react-router-dom/cjs/react-router-dom";
import HttpClient from "../HttpClient"
import { useAppDispatch } from "../hooks/redux"
import { setClient,loading, setTypeDian,setError,setTSeller ,setProducts,setDian,setPayment,setLoadingInvonces,setErrorInvoinces,setPdf} from "../reducers/DianReducer"
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

    const PostSendInvoinces =async({token,body}) =>{
        dispatch(setLoadingInvonces())
        try {
            const response =  await  HttpClient.PostCreatebill({token,body})
            console.log(response)
            if(response.Status !==400){
                const pdf =  await  HttpClient.GetSalesInvoice({token,id:response.id})
                dispatch(setPdf(pdf))
                toast.success("envio exitoso")
                dispatch(setDian(response))
                history.push("/checkout/110571")
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


   

    return {GetCLientDian,
            GetTypeDian,
            GetTSeller,
            GetTProductsDian,
            PostSendInvoinces,
            GetPayment,
           }
}

export default  UseDianActions