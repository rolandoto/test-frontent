import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Day from "../../component/Day"
import UseUsers from "../../hooks/UseUser"
import { addPostInsertForget, Forget, selectAllPosts } from "../../store/slice"
import { AiFillPlusCircle } from "react-icons/ai";
import useForgetAction from "../../action/useForgetAction"
import { useContext } from "react"
import  AutoProvider  from "../../privateRoute/AutoProvider"
import ServiceForget from "../../service/ServiceForget"


const Forgetfulnes =() =>{
    const [ubicacione,setBbicacion] = useState("")
    const [descriptione,setDescription] = useState("")
    const {jwt} = useContext(AutoProvider)
    const id  = jwt.result.id_hotel
    const id_user  = jwt.result.id_user
    const {getForgetById} =useForgetAction()
    const {loading,error,forget
    } = useSelector((state) => state.Forget)
        
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const day_now = hoy.toISOString();

    const fetchData =async() =>{
        await  getForgetById({id})
    }

    const handSubmit =(e) =>{
        e.preventDefault()
        ServiceForget({id_hotel:id,id_user,date:day_now,description:descriptione,ubicacion:ubicacione}).then(index =>{
                setDescription(null)
                setBbicacion(null)
                fetchData()
        }).catch(e =>{
            alert("no guardado")
        })
    }

    useEffect(() =>{
        fetchData()
    },[])

    /**
    const dispatch  = useDispatch()
    const {jwt} = UseUsers()
    const [ubicacione,setBbicacion] = useState()
    const [descriptione,setDescription] = useState()

    const {forget}= useSelector((state) =>state.listBooking)

    const [successful, setSuccessful] = useState(false);

    const handSubmit = useCallback(async({id_hotel,id_user,description,ubicacion}) =>{
        setSuccessful(false);
             await dispatch(addPostInsertForget({id_hotel,id_user,description,ubicacion})).unwrap()
                    .then(() => {
                    setSuccessful(true);
                    })
                    .catch(() => {
                    setSuccessful(false);
                    });
        alert("agregado")
     },[])
     
     
    useEffect(() =>{
            dispatch(Forget())
    },[successful, setSuccessful])


    console.log(successful)

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
                <td>{index.description}</td>
          </tr>
        )
    })} 
</table>
 */  

    return ( 

        <>
        <div className="container-bicta" >
                        <div >
                <form className='form-login' onSubmit={handSubmit} >
                    <input required 
                        placeholder='Ubicacion del olvido'         
                        type='text'        
                        className='username' 
                        name="celular"
                        value={ubicacione}
                        onChange={(e) => setBbicacion(e.target.value) }
                        />    
                    <input required 
                        placeholder='Descripcion del objecto'         
                        type='text'        
                        className='username'
                        name="fecha"
                        value={descriptione}
                        onChange={(e) => setDescription(e.target.value)}
                        /> 
                        <button className='button-login-checkin' type='submit'  ><AiFillPlusCircle size={30} color="white" /></button>
                </form>
            </div>

            <tbody>
        <table  className="de"  >
                <thead >
                    <tr>
                        <th>Fecha</th>
                        <th>Ubicacion</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                {forget.map((index,e) => {
                    let today = new Date(index.date )
                    const result = today.toISOString().split('T')[0]
                    if(!result) return null
                    return (
                        <tr key={e}>   
                            <td>{result}</td>
                            <td>{index.ubicacion}</td>
                            <td>{index.description}</td>
                    </tr>
                    )
                })} 
</table>
</tbody>
        </div>

       
        </>
    )
}

export default Forgetfulnes