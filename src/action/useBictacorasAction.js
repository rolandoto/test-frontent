import { useAppDispatch } from "../hooks/redux"
import HttpClient from "../HttpClient"
import { setBictacoras,setError,loading } from "../reducers/bictacorasReducers"

const useBictacorasAction =() =>{

    const dispatch = useAppDispatch()

    const getBictacorasById = async({id}) =>{
        dispatch(loading())
        try {
            const response  = await HttpClient.GetBictacoras(`id_hotel=${id}`)
            if(response){
                dispatch(setBictacoras(response))
            }else{
                dispatch(setError("get with was found"))
            }

        } catch (error) {
            dispatch(setError("get with was found"))
        }

    }
    return {
        getBictacorasById
    }

}

export default useBictacorasAction