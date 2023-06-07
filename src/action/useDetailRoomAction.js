import { useAppDispatch } from "../hooks/redux"
import HttpClient from "../HttpClient"
import { setDetailRoom,loading, setError } from "../reducers/RoomDetailReducer"

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

    return {
        postDetailRoom
    }
}


export default useDetailRoomAction