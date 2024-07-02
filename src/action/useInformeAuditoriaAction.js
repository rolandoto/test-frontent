import { useContext } from "react"
import { useAppDispatch } from "../hooks/redux"
import  AutoProvider  from "../privateRoute/AutoProvider"
import { apiInformeAuditoriaSlice } from "../reducers/ApiInformeAuditoriaReducers"
import ServiceAuditoria from "../service/ServiceInformeAuditoria"

const useReservationActions  =() =>{

    const {jwt} = useContext(AutoProvider)
    const dispatch = useAppDispatch()
    

    const getPostInformeAuditoria =  async({fecha}) =>{
        dispatch(apiInformeAuditoriaSlice.actions.loading())
        try {
            const postResponse = await  ServiceAuditoria({id:jwt.result.id_hotel,fecha})
            dispatch(apiInformeAuditoriaSlice.actions.setInformeAuditoria(postResponse))
        } catch (error) {
                dispatch(apiInformeAuditoriaSlice.actions.setError("no found"))
        }
    }   
   
    return {
        getPostInformeAuditoria
    }

}

export default useReservationActions 