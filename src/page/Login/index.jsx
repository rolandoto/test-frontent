import React, {useState } from 'react'
import UseUsers from '../../hooks/UseUser'
import logo from '../../image/logo.jpeg'
import {useHistory} from 'react-router-dom'
import Preloading from '../../component/Preloading'
import UseListMotels from '../../hooks/UseListMotels'
import signIn from '../../store/actions/userActions'
import { useForm } from "react-hook-form";
import confetti  from "canvas-confetti"
import { Loading, Grid } from "@nextui-org/react";

const Login =() =>{
    const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=c08d415f-dea7-4a38-bb28-7b2188202e46';

    const {iduser}=UseListMotels()
    const {login,isError,isLogin,isLoading} = UseUsers()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [raiting,setRaiting]= useState('')
    const { Img,loading} = Preloading({isLogin})
    
    const [prueba,setPrueba] = useState()

    const all=[]

    console.log(raiting)

    const handRaiting =(e)=>{
        setRaiting(e.target.value)
    }
  
    const handName =(e) =>{
        setUsername(e.target.value)
    }

    const handPassword =(e) =>{
        setPassword(e.target.value)
    }

    const handleSubmit =(e) =>{
        login({username,password,hotel:raiting})
         e.preventDefault()
         confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 70,
            origin: { x: 0.50, y: 0.8 }
          });  
     }
    
    if(!iduser) return null

    return (
        <div className='App'>
            {loading ?  <Img logo={logo} />  :
            (
                <div>
                    <div className='container-img'>
                        <div>
                            <img className='image-login' src={logo} alt="logo" />
                        </div>
                            <form className='form-login' onSubmit={handleSubmit} >
                                    <input required 
                                        placeholder='Nombre de usuario'         
                                        type='text'        
                                        className='username'  
                                        value={username}  
                                        onChange={handName} />    
                                    <input 
                                        required placeholder='Contraseña'  type='password'  
                                        className='password'  
                                        value={password}    
                                        onChange={handPassword}  />
                                    <select onChange={handRaiting}  
                                        value={raiting} 
                                        className='select-hotel' >
                                        <option disabled >raiting tuype</option>
                                        <option>Seleccionar Hotel</option>
                                        {iduser.map(ratings => <option 
                                                                    value={ratings.id_hotel}   
                                                                    key={ratings.id_hotel}>
                                                                        {ratings.nombre}
                                                                </option> )}
                                    </select>
                                <button className='button-login' type='submit' >{isLoading  ?<Loading type="spinner" size="lg" />  :<span>iniciar sesion </span>} </button>
                            </form>
                            {isError && <span style={{color:'red'}} >Error de Credenciales</span>}
                        </div>
                </div> 
            )}
        </div>
    )
}

export default Login