import React, { useContext, useRef, useState }  from "react";
import CardTikets from "../CardTikets";
import ButtonBack from "../ButtonBack";
import ButtonHome from "../ButtonHome";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import {useSelector } from "react-redux";
import AutoProvider from "../../privateRoute/AutoProvider";
import moment from "moment";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardInvoinces from "../CardInvoinces";
import CardTiketsRed from "../CardTikets/CardTiketsRed";

const CardHuesped =({DetailDashboard,huesped}) =>{

    const [show,setShow] =useState(false)
    const [showInforme,setShowinforme] =useState()
    const {id} =useParams()
    const now = moment().utc().format('YYYY/MM/DD')
    const {jwt} =useContext(AutoProvider)
    const {PostInsertHuesped,GetBreakHuespedBreaskfast} =useDetailDashboardAction()
    const {loadingValiHuesped,BreakFast,loading } = useSelector((state) => state.DetailDashboard)

    const handSubmitInvoinces=async({ Id_user,id_huesped,Fecha,NumberDesayuno,Id_hotel,ID_Reserva}) =>{
       await PostInsertHuesped({Id_user,id_huesped,Fecha,NumberDesayuno,Id_hotel,ID_Reserva})
       await GetBreakHuespedBreaskfast({id})
    }

    const query = [];

    for(let i =0;i<huesped.length;i++){
        if(huesped[i+1]){
          query.push(huesped[i])
        }
    }

    const handChange =() =>{
        setShow(true)
    }

    const handChangeClose =() =>{
        setShow(false)
    }

    const reservationByID = DetailDashboard.find((item) => item.ID_RESERVA ==id)

    console.log(reservationByID)

    return (<>      
                {show  ?  <CardInvoinces
                                       UsernameUser={jwt.result.name}
                                       NumberRoom={reservationByID.Numero}
                                       Room={reservationByID.nombre_habitacion}
                                       showInforme={showInforme} 
                                       handSubmitInvoinces={handSubmitInvoinces} 
                                       handChangeClose={handChangeClose} 
                                       loading={loading} />
                :<>
                   <ButtonBack/>
                    <ButtonHome/>
                {DetailDashboard.map((itemHuesped) =>{
                
                if(!BreakFast.some((item) => item.id_huesped === itemHuesped.huesped && moment(item.Fecha).utc().format('YYYY/MM/DD') === now)){
                   return  <CardTikets 
                        Username={itemHuesped.Nombre}
                        Lastname={itemHuesped.Apellido}
                        id_huesped={itemHuesped.huesped}
                        Id_hotel={jwt.result.id_hotel}
                        Id_user={jwt.result.id_user}
                        Fecha={now}
                        NumberDesayuno={1}
                        ID_Reserva={id}
                        setShowinforme={setShowinforme}
                        handChange={handChange}
                        loadingValiHuesped={loadingValiHuesped}
                         />
                        
                }else{
                   return  <CardTiketsRed 
                   Username={itemHuesped.Nombre}
                   Lastname={itemHuesped.Apellido}
                   loadingValiHuesped={loadingValiHuesped} />
                }
            })}

            {query.map((itemHuesped) =>{
               // console.log(BreakFast.some((item) =>item.id_huesped  == itemHuesped.huespedes))
                 if(!BreakFast.some((item) => item.id_huesped === itemHuesped.huespedes && moment(item.Fecha).utc().format('YYYY/MM/DD') === now)){
                    return <CardTikets 
                    Username={itemHuesped.Nombre}
                    Lastname={itemHuesped.Apellido}
                    id_huesped={itemHuesped.huespedes}
                    Id_hotel={jwt.result.id_hotel}
                    Id_user={jwt.result.id_user}
                    Fecha={now}
                    NumberDesayuno={1}
                    ID_Reserva={id}
                    setShowinforme={setShowinforme}
                    handChange={handChange}
                    loadingValiHuesped={loadingValiHuesped}
                                 />
                             
                 }else{
                    return  <CardTiketsRed 
                    Username={itemHuesped.Nombre}
                    Lastname={itemHuesped.Apellido}
                    loadingValiHuesped={loadingValiHuesped} />
                 }
            })}
           </>}
            </>)

}

export default CardHuesped