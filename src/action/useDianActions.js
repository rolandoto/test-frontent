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
        setDianSigoPdf,
        setPayabono,
        setInvonceByIdReservation
        } from "../reducers/DianReducer"
import { toast } from "react-hot-toast";
import { useCallback, useContext, useState } from "react";
import  AutoProvider  from "../privateRoute/AutoProvider";
import moment from "moment";
import ServiceInfomeMovimiento from "../service/ServiceInformeMovimiento";

const UseDianActions =() =>{

    const history = useHistory()
    const now = moment().utc().format('YYYY-MM-DD')

    const {jwt} =useContext(AutoProvider)

    console.log(jwt)

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

    const [valid,setValidDian] = useState(null);
  
    const PostSendInvoinces = useCallback(({ token, body, id_Reserva }) => {
        dispatch(setLoadingInvonces());
        HttpClient.PostCreatebill({ token, body }).then((itemResponse =>{ 
                setValidDian(itemResponse.id)
                if (Boolean(itemResponse.id.trim())) {
                        HttpClient.PostInsertSigOpdfbyid({  id:id_Reserva,id_sigo:itemResponse.id,id_user:jwt.result.id_user,fecha:now }).then((item => {
                            ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Se envio facturacion electronica a Nombre  ${body.customer.name}`,id:jwt.result.id_hotel,Valor_habitacion:0,Codigo_reserva:"0000"}).then(index =>{
                            }).catch(e =>{
                        })
                        dispatch(setDian(itemResponse));
                        dispatch(setPayment(itemResponse));
                            toast.success("Se guarado correctamente la facturacion")
                        })).catch(e =>{
                            toast.error("error al insertar en el reserva")
                        })
                        history.push(`/DetailDashboard/${id_Reserva}`);
                }
            })).catch(e =>{
                toast.error("error ")
                dispatch(setErrorInvoinces());
            })
    },[])

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
            const response = await   HttpClient.GetPayAbono({id})
            console.log(response)
            if(response){
                dispatch( setPayabono(response))
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
            valid
           }
}

export default  UseDianActions
