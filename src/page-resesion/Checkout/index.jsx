import React  from "react";
import useProgress from "../../hooks/useProgress";
import LineProgress from "../../Ui/LineProgress";
import { useSelector } from "react-redux";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CheckoutOrganism from "../../organisms/Checkout";
import useDetailRoomAction from "../../action/useDetailRoomAction";
import useApiWhataapActions from "../../action/useApiWhataapActions";

const Checkout =() =>{
    const {id} = useParams()   
    const {progress} = useProgress({id})
    const {getDetailReservationById} = useDetailDashboardAction()
    const  {postDetailRoom} =  useDetailRoomAction()
    const {loading,error,DetailDashboard
    } = useSelector((state) => state.DetailDashboard)

    const {postWhataapByIdCheckout} = useApiWhataapActions()

    const fetchDataApiWhatsapp =async({phone,languaje,name,hotel,factura}) =>{
        await postWhataapByIdCheckout({plantilla:"check_out_v3",to:phone,languaje,name,hotel,factura})
    }
    
    const fetchData =async() =>{
        await getDetailReservationById({id})
    }

    useEffect(() =>{
        fetchData()
    },[])

    const fillContent =() =>{
        if(progress < 100){
                return <LineProgress progress={progress} />
        }if(loading){
            return <p>...Cargando</p>
        }
       

        return  <CheckoutOrganism 
            DetailDashboard={DetailDashboard}
            postDetailRoom={postDetailRoom} 
            fetchDataApiWhatsapp={fetchDataApiWhatsapp} />
    }

    return (
        <>{fillContent()} </>
    )
    
}

export default Checkout 