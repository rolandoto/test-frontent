import { useAppDispatch } from "../hooks/redux"
import httpClient from "../HttpClient"
import { setRoom,setError, loading } from "../reducers/roomsReducers"


const useRoomAction =() =>{

    const dispatch = useAppDispatch()
    
    const getRoomById = async ({id}) => {
        dispatch(loading())
        try {
            const postReponse = await httpClient.get(`getroomsadmin/${id}`)
                
            if(postReponse) {
                dispatch(setRoom(postReponse))
            }else{
                dispatch(setError("post with wans found"))
            }
        } catch (error) {
                dispatch(setError("Post with wasn found"))
        }
    }
    
    return {
        getRoomById
    }
}

export default useRoomAction