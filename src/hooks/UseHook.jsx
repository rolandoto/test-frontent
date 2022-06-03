import { useCallback, useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import  AutoProvider  from "../privateRoute/AutoProvider"
import { Forget } from "../store/slice/forgetfulnes"
import { addPostInsertForget } from "../store/slice/InsertForgetfulnes"
import { addPostMaintenance } from "../store/slice/InsertMaintenance"
import { getBooking } from "../store/slice/indexSlice"
import { getPosts } from "../store/slice/ListFormats"
import { getPostMaintenance } from "../store/slice/Maintenance"
import { getEmercies } from "../store/slice/NumberEmergencies"
import { updatePost } from "../store/slice/UpdateMaintenance"


const UseHook =() =>{

    const {jwt} = useContext(AutoProvider)

    const dispatch = useDispatch()
    
    const state = useSelector((state) => state)
 

    useEffect(() => {
        dispatch(getPosts({id_hotel:jwt.result.id_hotel}))
        dispatch(getPostMaintenance({id:jwt.result.id_hotel}))  
    }, [])

   

        useEffect(() =>{
            dispatch(getEmercies())
            dispatch(getPostMaintenance({id:jwt.result.id_hotel}))   
        },[])
    
    useEffect(() => {
        dispatch(getPosts({id_hotel:jwt.result.id_hotel}))
    }, [])
   

    useEffect(() =>{
        dispatch(Forget())
    },[])

    useEffect(() =>{
        dispatch(getPostMaintenance({id:jwt.result.id_hotel}))   
        
    },[])


    const handSubmitInsertForget = useCallback( async({id_hotel,id_user,description,ubicacion}) =>{
        await dispatch(addPostInsertForget({id_hotel,id_user,description,ubicacion}))
        await  dispatch(Forget())
     },[])
    
    const handAddMaintenance= useCallback(async({id_hotel,id_user_recepcion,id_user_mantenimiento,room,novelty}) =>{
        await dispatch(addPostMaintenance({id_hotel,id_user_recepcion,id_user_mantenimiento,room,novelty}))
        await dispatch(getPostMaintenance({id:jwt.result.id_hotel}))
        alert("agregado")
    },[])

    const handUpdateMaintenance = useCallback(async ({e}) =>{
        await dispatch(updatePost({id:e,options:"2"}))
        await dispatch(getPostMaintenance({id:jwt.result.id_hotel}))
        alert("se borrado")
    },[])



    return {
        handSubmitInsertForget,
        handAddMaintenance,
        handUpdateMaintenance,
        state
    }

}

export default UseHook