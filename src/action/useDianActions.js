import HttpClient from "../HttpClient"
import { useAppDispatch } from "../hooks/redux"
import { setClient,loading, setError } from "../reducers/DianReducer"

const useDianActions =() =>{

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

    

    return {GetCLientDian}
}

export default  useDianActions