import { useAppDispatch } from "../hooks/redux"
import HttpClient from "../HttpClient"
import { setStore,loading, setError } from "../reducers/storeReducers"

const useStoreAction =() =>{

    const dispatch = useAppDispatch()

    const getStoreById= async ({id}) =>{
        dispatch(loading())
        try {
            const getResponse =  await HttpClient.GetAdminStore(`getlistproductadmin/${id}`)
            if(getResponse){
                dispatch(setStore(getResponse))
            }else {
                dispatch(setError("Post with wasn found"))
            }
        } catch (error) {
            dispatch(setError("Post with wasn found"))
        }
    }
    return {
        getStoreById
    }
}

export default useStoreAction