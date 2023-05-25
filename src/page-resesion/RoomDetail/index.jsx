import React, { useEffect, useState } from "react"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import useDetailRoomAction from "../../action/useDetailRoomAction"
import { config } from "../../config"
import useProgress from "../../hooks/useProgress"
import RoomDetailOrganism from "../../organisms/RoomDetail"
import AutoProvider  from "../../privateRoute/AutoProvider"
import ServicetypeRooms from "../../service/ServicetypeRooms"
import LineProgress from "../../Ui/LineProgress"

const RoomDetail =() =>{

    const id = 12
    const [room,setRoom] = useState()
    const [state,setState] =useState()
    const {jwt} = useContext(AutoProvider)
    const {progress} = useProgress({id})
	const {loading,error,DetailDashboard
							} = useSelector((state) => state.RoomDetail)
	const  {postDetailRoom} =  useDetailRoomAction()
	



    useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setRoom(index)
        })
    },[setRoom])

    useEffect(() =>{
		fetch(`${config.serverRoute}/api/resecion/getroomsresecion/${jwt.result.id_hotel}`)
		.then(resp => resp.json())
		.then(data => {
			if(!data.ok){
				console.log("true")
			}else{
				console.log(data)
				const roomDefinid=[]
				for(let i =0;i<data?.query?.length;i++){	
					for(let e =0;e<data?.query?.length;e++){
						const to= parseInt(data?.query[i]?.ID_Tipo_habitaciones)
						const lo =(room[e]?.id_tipoHabitacion) 
						if(to ==lo ){
							roomDefinid.push({
								title:`${data?.query[i]?.title} ${room[e]?.nombre}   `,
								id:data?.query[i]?.id,
								ID_Tipo_estados:data?.query[i]?.ID_Tipo_estados,
								ID_Tipo_habitaciones:data?.query[i]?.ID_Tipo_habitaciones,
								ID_estado_habiatcion:data?.query[i].ID_estado_habitacion
							})
						}else{
							console.log("error")
						}
					}
				}
				setState(roomDefinid)
			}
		})
	},[room])

    const fillContent =() =>{
        if(progress <100){
          return  <LineProgress  progress={progress}  />
        }if(loading){
            return <p>...Cargando</p>
        }
        if(error){
            return <p>...{error}</p>
        }

        return   <RoomDetailOrganism  room={state}  postDetailRoom={postDetailRoom}  />

    }


    return (
        <>{fillContent()}</>
    )
}

export default RoomDetail