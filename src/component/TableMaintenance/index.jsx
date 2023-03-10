import React ,{useEffect, useState} from "react"
import Day from "../Day"
import { AiTwotoneDelete } from "react-icons/ai";
import "./index.css"
import { useDispatch } from "react-redux";
import { AiFillPlusCircle } from "react-icons/ai";
import UseUsers from "../../hooks/UseUser";
import ServicePostMaintance from "../../service/ServicePostMaintance";

const TableMaintenance =() =>{
    const [ubication,setUbicacion] = useState()
    const [news,setNew] = useState()
    const [data,setData] =useState()
    const [loading,setLoading] =useState(false)
    const dispatch = useDispatch()

    const {jwt} = UseUsers()

    const post ={
        id_hotel:jwt.result.id_hotel,
        id_user_recepcion:jwt.result.id_user,
        id_user_mantenimiento:0,
        room:ubication,
        novelty:news
    }

    const {id_hotel} = post
    const {id_user_recepcion} = post
    const {id_user_mantenimiento} = post
    const {room} = post
    const {novelty} = post

    const options =(e) =>{
    
        if(e ==1){
            return  <td>pendiente</td>
        }else if(e ==2){
            return <td>eliminado</td>
        }
    }

    
    
    useEffect(() =>{
        fetch(`https://grupo-hoteles.com/api/getMantenimiento?id_hotel=${id_hotel}`)
        .then(index=> index.json())
        .then(data =>setData(data) )
    },[loading])

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const day_now = hoy.toISOString();
   
    const handIconUpdate =(e)=>{
        e.preventDefault()
        ServicePostMaintance({id:id_hotel,id_user_recepcion:id_user_recepcion,id_user_mantenimiento:1,startDate:day_now,room:ubication,novelty:news,options:1}).then(index =>{
            setLoading(true)
            setUbicacion("")
            setNew("")
            }
        ).catch(e =>{
            console.log(e)
        })
    }       

    /**{data?.link?.map((index,e) => {
                  
        let today = new Date(index.startDate)
        const result = today.toISOString().split('T')[0]

          if(index.options !=2){
              return (
                  <tr key={e}>
                      <td>{result}</td>
                      <td>{index.room}</td>
                      <td>{index.name}</td>
                      <td>{index.novelty}</td>
                      <td>{index.observations}</td>
                      <td>{options(index.options)}</td>
                      <td><AiTwotoneDelete color="red" size={25} className="delete-maintence"    /> </td>
               </tr>
          )}
      })} 
    **/

      
    return (
        <div className="container-bicta" >
            <div   onSubmit={handIconUpdate}  >
                <form className='form-login' >
                    <input required 
                        placeholder='Ubicacion'         
                        type='text'        
                        className='username'
                        value={ubication}
                        onChange={(e) => setUbicacion(e.target.value)}
                        />    
                    <input required 
                        placeholder='Novedades'         
                        type='text'        
                        className='username'
                        value={news}
                        onChange={(e) =>  setNew(e.target.value)}
                        /> 
                        
                        <button className='button-login-checkin' type='submit' ><AiFillPlusCircle size={30} color="white" /></button>
                </form>
            </div>

            <tbody>
            <table   className="de">
                <thead >
                    <tr>
                        <th>Fecha</th>
                        <th>Ubicacion</th>
                        <th>Reportado</th>
                        <th>Novedad</th>
                        <th>Oservaciones</th>
                        <th>Estado</th>
                    </tr>
                </thead>

                {data?.map((index,e) => {  
                  let today = new Date(index.startDate)
                  const result = today.toISOString().split('T')[0]
                    if(index.options !=2){
                        return (
                            <tr key={e}>
                                <td>{result}</td>
                                <td>{index.room}</td>
                                <td>{index.name}</td>
                                <td>{index.novelty}</td>
                                <td>{index.observations}</td>
                                <td>{options(index.options)}</td>
                            </tr>
                    )}
                })} 
            </table>
            </tbody>
        </div>
    )
}

export default TableMaintenance