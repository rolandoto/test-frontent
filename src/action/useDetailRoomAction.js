import { useAppDispatch } from "../hooks/redux"
import HttpClient from "../HttpClient"
import { setDetailRoom,loading, setError,setRoomtype ,setRoomtoSell} from "../reducers/RoomDetailReducer"

const useDetailRoomAction =() =>{

    const dispatch =  useAppDispatch()

    const postDetailRoom = async ({ID_estado_habitacion,id}) =>{
        dispatch(loading())
        try {
            const postResponse = await  HttpClient.postUpdateRoomDetail({ID_estado_habitacion,id})

            if(postDetailRoom){
                dispatch(setDetailRoom(postResponse))
            }else{
                dispatch(setError("get no was  found"))
            }

        } catch (error) {
            dispatch(setError("get no was no found"))
        }
    }

    const postTypeRoom= async ({id}) =>{
        dispatch(loading())
        try {
            const postResponse = await  HttpClient.GetTypeRoom({id})

            if(postDetailRoom){
                dispatch(setRoomtype(postResponse?.query))
            }else{
                dispatch(setError("get no was  found"))
            }

        } catch (error) {
            dispatch(setError("get no was no found"))
        }
    }

    const postTypeRoomtosell= async ({id,fechaInicio,fechaFinal}) =>{
        dispatch(loading())
        try {
            const postResponse = await  HttpClient.GetServiceInfomeRoomtoSell({id,fechaInicio,fechaFinal})

            if(postDetailRoom){
                dispatch(setRoomtoSell(postResponse?.
                    groupedDataWithoutDates
                    ))
            }else{
                dispatch(setError("get no was  found"))
            }

        } catch (error) {
            dispatch(setError("get no was no found"))
        }
    }

    return {
        postDetailRoom,
        postTypeRoom,
        postTypeRoomtosell
    }
}


export default useDetailRoomAction