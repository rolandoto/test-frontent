import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import useBictacorasAction from "../../action/useBictacorasAction";
import useProgress from "../../hooks/useProgress";
import UseTitle from "../../hooks/UseTitle";
import UseUsers from "../../hooks/UseUser";
import BictacorasTemplate from "../../templates/Bictacoras";
import LineProgress from "../../Ui/LineProgress";
import InputBictacoras from "../../component/InputBictacoras";
import ServiceBictacoras from "../../service/ServiceBictacoras";
import moment from "moment";

const Bictacoras  =() =>{
  UseTitle({title:"Bictacoras"})
  const [ubicacione,setBbicacion] =useState()
  const [descriptione,setDescription]=useState()
  const  {progress} = useProgress({id:"2"})
  const {jwt}  = UseUsers()
  const {getBictacorasById} =useBictacorasAction()
  
  const {loading,Bitacoras,error
                } =useSelector((state) => state.Bictacoras)

      
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  const day_now = hoy.toISOString();

 const hour = moment().format('LT'); 
 const quitar = hour.split("PM").join("")


  const fetchData =async() =>{
      await getBictacorasById({id:jwt.result.id_hotel})
  }

  const id= jwt.result.id_hotel
  const id_user = jwt.result.id_user

  useEffect(() =>{
    fetchData()
  },[])

  const handSubmitBictacoras =(e) =>{
    e.preventDefault()
    ServiceBictacoras({id,id_user,date:day_now,time:quitar,lugar:ubicacione,description:descriptione}).then(index=>{
      console.log(index)
      setBbicacion("")
      setDescription("")
      fetchData()

    }).catch(e =>{
      console.log(e)
    })
  }

  const fillContent =()=>{

    if(progress <100){
      return <LineProgress progress={progress} />
    }
    if(loading){
      return <p>...Cargando</p>
    }
    if(error){
      return <p>{error}</p>
    } 

    return <>
              <InputBictacoras 
              handSubmitBictacoras={handSubmitBictacoras}
                setBbicacion={setBbicacion}
                ubicacione={ubicacione}
                setDescription={setDescription}
                descriptione={descriptione} />
             <BictacorasTemplate Bitacoras={Bitacoras} />
         </>

  }

  /**  const {bicta,isLoading} =UserListBictacoras()

   *   <div className="container-bicta">  
              {isLoading ?
              <div>
                <div className='container-image'>
                    <div className='color'></div>
                      <img className='image-logo-bicta' src={logo} alt="logo" />
                    </div>
              </div>
                :
              
              }
            </div>  
   * 
   */

        return (
            <>{fillContent()}</>
        )
}

export default Bictacoras