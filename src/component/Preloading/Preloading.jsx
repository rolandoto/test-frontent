import React, { useEffect, useState } from 'react'
import UseUsers from '../../hooks/UseUser'
import {useHistory} from 'react-router-dom'
const Preloading =({isLogin}) =>{

    const history = useHistory()

    const [loading,setLoading] = useState(true)

     useEffect(() =>{
        isLogin && history.push('/home')
        setTimeout(() =>{
            setLoading(false)
        },4000)
    },[isLogin])

    const Img = ({logo}) =>{
        return (
                <div className='container-image'>
                <div className='color'></div>
                    <img className='image-logo' src={logo} alt="logo" />
                </div> 
            )
        }


    return  { 
        Img,loading
    }
    
}
export default Preloading