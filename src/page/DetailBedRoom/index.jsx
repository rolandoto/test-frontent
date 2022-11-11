import React from "react"
import "./index.css"
import {useParams}  from "react-router-dom"
import { useEffect } from "react"
import useRoomAction from "../../action/useRoomAction"
import { useSelector } from "react-redux"
import DetailBedRoomTemplate from "../../templates/DetailBedRoom"
import useProgress from "../../hooks/useProgress"
import LineProgress from "../../Ui/LineProgress"

const DetailBedRoom =() =>{
    const {id}  = useParams()
    const {progress}  = useProgress({id})
    const {getRoomById} = useRoomAction()
    const {loading,error,Room
                    } = useSelector((state) => state.Room)

    const fetchData =async() =>{
      await  getRoomById({id})
    }

    useEffect(() =>{
        fetchData()
    },[id]) 

    const  fillContent =() =>{
        if(progress <100){
          return  <LineProgress progress={progress} />
        }
        if(loading){
            return <p>...Cargando</p>
        }
        if(error) {
            return <p>{error}</p>
        }
    
        return  <DetailBedRoomTemplate id={id} fetchData={fetchData} Room={Room}  />
    }

    return (
        <>
           {fillContent()}
        </>
    )

}
export default DetailBedRoom