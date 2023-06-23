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
import HttpClient from "../../HttpClient"

const RoomDetail =() =>{

    const id = 12
    const [room,setRoom] = useState()
    const [state,setState] =useState()
    const {jwt} = useContext(AutoProvider)
    const {progress} = useProgress({id})
	const {loading,error,DetailDashboard
							} = useSelector((state) => state.RoomDetail)
	const  {postDetailRoom} =  useDetailRoomAction()
	const [estado, setEstado] = useState(false);

	const hanchangeEstado =() =>{
		setEstado(!estado)
	}

    useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setRoom(index)
        })
    },[setState,loading])


	useEffect(() => {
		HttpClient.GetRoom({url:jwt.result.id_hotel}).then(index =>{
			setState(index.query);
		})
	}, []);


    const fillContent =() =>{
        if(progress <100){
          return  <LineProgress  progress={progress}  />
        }if(loading){
            return <p>...Cargando</p>
        }
        if(error){
            return <p>...{error}</p>
        }

        return   <RoomDetailOrganism  
					room={state}  
					postDetailRoom={postDetailRoom}
					hanchangeEstado={hanchangeEstado}  />

    }


    return (
        <>{fillContent()}</>
    )
}

export default RoomDetail