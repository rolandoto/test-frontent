import HttpClient from "../HttpClient"
import { useAppDispatch } from "../hooks/redux"
import { setErrorCitySigo,setCitySigo,loadingCitySigo } from "../reducers/CitySigoReducers"

const UseCitySigoActions =() =>{

    const dispatch = useAppDispatch()

    const getCitySigo= async() =>{
        dispatch(loadingCitySigo())
        try {
            const response  = await HttpClient.GetCitySigo()
            
            if(response){
                dispatch(setCitySigo(response))
            }else{
                dispatch(setErrorCitySigo("get with was found"))
            }
        } catch (error) {
            console.log(error)
            dispatch(setErrorCitySigo("get with was found asdasdsadsa"))
        }
    }

    return {
        getCitySigo
    }

}

export default UseCitySigoActions