import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Day from "../../component/Day"
import UseUsers from "../../hooks/UseUser"
import { addPostInsertForget, Forget } from "../../store/slice"
import { AiFillPlusCircle } from "react-icons/ai";
const Forgetfulnes =() =>{
   
    const dispatch  = useDispatch()
    const {jwt} = UseUsers()
    const [ubicacione,setBbicacion] = useState()
    const [descriptione,setDescription] = useState()

    const {forget}= useSelector((state) =>state.listBooking)

    const handSubmit = useCallback(async({id_hotel,id_user,description,ubicacion}) =>{
        await dispatch(addPostInsertForget({id_hotel,id_user,description,ubicacion}))
        await  dispatch(Forget())
        alert("agregado")
     },[])
    
    useEffect(() =>{
            dispatch(Forget())
    },[dispatch])



    const post ={
        id_hotel:jwt.result.id_hotel,
        id_user:jwt.result.id_user,
        description:descriptione,
        ubicacion:ubicacione
    }

    const {id_hotel} =post
    const {id_user} =post
    const {description} =post
    const {ubicacion} =post

    const handForgetfulnes =(e) =>{
        e.preventDefault()
        handSubmit({id_hotel,id_user,description,ubicacion})
    }

    if(!jwt) return null

    return (
        <div className="container-forgetfulnes" >
            <div className="App-Checking" onSubmit={handForgetfulnes}  >
                <form className='form-login' >
                    <input required 
                        placeholder='Ubicacion del olvido'         
                        type='text'        
                        className='username' 
                        name="celular"
                        onChange={(e) => setBbicacion(e.target.value) }
                        />    
                    <input required 
                        placeholder='Descripcion del objecto'         
                        type='text'        
                        className='username'
                        name="fecha"
                        onChange={(e) => setDescription(e.target.value)}
                        /> 
                        <button className='button-login-checkin' type='submit' ><AiFillPlusCircle size={30} color="white" /></button>
                </form>
            </div>
            <table className="pe">
                <thead className="go">
                    <tr>
                        <th>Fecha</th>
                        <th>Ubicacion</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                {forget.link?.map((index,e) => {
                      let today = new Date(index.date )
                      const result = today.toISOString().split('T')[0]
                      if(!result) return null
                    return (
                         <tr key={e}>   
                            <td>{result}</td>
                            <td>{index.ubicacion}</td>
                            <td  >{index.description}</td>
                      </tr>
                    )
                })} 
            </table>
        </div>
    )
}

export default Forgetfulnes