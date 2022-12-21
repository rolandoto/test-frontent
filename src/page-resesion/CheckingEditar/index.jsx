import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProgress from "../../hooks/useProgress"
import LineProgress from "../../Ui/LineProgress"
import CheckingEditarOrganism from "../../organisms/CheckingEditar"
import useDetailDashboardAction from "../../action/useDetailDashboardAction"
import { useSelector } from "react-redux"


const CheckingEditar =() =>{

    const  {id} = useParams()
    const {progress} = useProgress({id})

    const {getDetailReservationById} = useDetailDashboardAction()
    const {loading,error,DetailDashboard
                } = useSelector((state) => state.DetailDashboard)

    const fetchData =async() =>{
        await getDetailReservationById({id})
    }
    
    useEffect(() =>{
        fetchData()
    },[id])


    const fillContent =() =>{
        if(progress<100){
            return  <LineProgress progress={progress} />
        }if(loading){
            return <p>...Cargando</p>
        }
        if(error){
            return <p>...{error}</p>
        }

        return <CheckingEditarOrganism id={id} DetailDashboard={DetailDashboard}  />
    }

    return (
        <>{fillContent()}</>
    )

}

export default CheckingEditar