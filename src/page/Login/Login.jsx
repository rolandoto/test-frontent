import React, {useState } from 'react'
import UseUsers from '../../hooks/UseUser'
import logo from '../../image/logo.jpeg'
import {useHistory} from 'react-router-dom'
import Preloading from '../../component/Preloading/Preloading'
import UseListMotels from '../../hooks/UseListMotels'



const Login =() =>{

    const {iduser}=UseListMotels()
    const {login,isError,isLogin} = UseUsers()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [raiting,setRaiting]= useState('')
    const { Img,loading} = Preloading({isLogin})

    console.log(iduser)
    const handRaiting =(e)=>{
        //select value
        setRaiting(e.target.value)
    }
  
    const handName =(e) =>{
        setUsername(e.target.value)
    }

    const handPassword =(e) =>{
        setPassword(e.target.value)
    }

    const handleSubmit =(e) =>{
        e.preventDefault()  
        login({username,password,hotel:raiting})
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
                        <form className='form-login' onSubmit={handleSubmit}>
                                <input required placeholder='Nombre de usuario'  type='text' className='username'  value={username}  onChange={handName} />    
                                <input required placeholder='Contraseña'  type='password' className='password'  value={password}    onChange={handPassword}  />
                                <select onChange={handRaiting}  value={raiting} className='select-hotel' >
                                    <option disabled >raiting tuype</option>
                                    <option>Seleccionar Hotel</option>
                                         {iduser.map(ratings => <option value={ratings.id}   key={ratings.id}>{ratings.name}
                                     </option> )}
                                </select>
                            <button className='button-login' type='submit' >iniciar sesion</button>
                        </form>
                        {isError && <span style={{color:'red'}} >Error de Credenciales</span>}
                    </div>
            </div> 
            )}
            
        </div>
    )
}

export default Login