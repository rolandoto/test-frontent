import React, { useContext, useEffect, useState } from "react";
import LoadingDetail from "../../Ui/LoadingDetail";
import { useSelector } from "react-redux";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import moment from "moment/moment";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import { useHistory, useParams } from "react-router-dom";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import ServiceUpdateReservation from "../../service/ServiceUpdatereservation";
import UsePrice from "../../hooks/UsePrice";
import ServiceUpdateReservationpay from "../../service/ServiceUpdatereservationpay";
import ServiceStatus from "../../service/ServiceStatus";
import "moment/locale/es";
import { Button } from "@nextui-org/react";


const Checkingn3 =() =>{
    moment.locale("en-in");  
    const hour = moment().format('LTS');  // 3:14:32 PM
    const fecha =  moment().format('L');   
    const {id} = useParams()
    const {getDetailReservationById} = useDetailDashboardAction()
    const {loading,error,DetailDashboard} = useSelector((state) => state.DetailDashboard)
    const {jwt} =useContext(AutoProvider)
   
    const [isChecked, setIsChecked] = useState(false);

    const fetchData =async() =>{
        await getDetailReservationById({id})
    }   

    useEffect(() =>{
        fetchData()
    },[id])

    const  resulDetailDashboard = DetailDashboard[0]
    const init  =   moment(resulDetailDashboard?.Fecha_inicio).utc().format('MM/DD/YYYY')
    const fin = moment(resulDetailDashboard?.Fecha_final).utc().format('MM/DD/YYYY')

    var fechaInicio =  new Date(init).getTime() 
    var fechaFin    = new Date(fin).getTime() 

    var diff = fechaFin - fechaInicio  
    
    const day =diff/(1000*60*60*24)

    const i = moment(resulDetailDashboard?.Fecha_inicio).utc().format('YYYY/MM/DD')
    const f = moment(resulDetailDashboard?.Fecha_final).utc().format('YYYY/MM/DD')
    
    const hanClickinContracto =() =>{
            handUpdateConfirms()
      }

  
    const handUpdateConfirms =() =>{
       if(isChecked){
        window.location.href =(`/typefirmar/${id}`)
       }     
    }

    

    function handleOnChange(event) {
        setIsChecked(!isChecked);
      }  
   
        return (
            <>
                <div className="container-flex-init-global" >
                <LoadingDetail
                                loading={true}
                                titleLoading={"Pagina 3"}  />
    
                <div  >
                    <div className="container-detail-dasboard-in" >
                        <input type="text" className="desde-detail" defaultValue={i}   />
                        <input type="text" className="desde-detail" name="Fecha" defaultValue={f}   />
                        <h2 className="cod-reserva" ><span className="title-code" >COD:</span> X14A-{resulDetailDashboard?.Num_documento}</h2>
                    </div>
    
                    </div>
                    
                        <h2 className="cod-reserva-one to-checkin" >
                                <span className="title-code" >
                               
                                </span> 
                                <p className="close-negrita flex-check-box"  >  <input   type="checkbox" 
                                    className={`checkbox-round-three  ${isChecked && "checkbox-round-click"} `}
                                    readOnly={true}
                                    onChange={handleOnChange}
                                    checked={isChecked}/>  Yo &nbsp; <span className="close-negrita" ></span> {jwt.result.name} He digitalizado, impreso y archivado el documento del titular y acompañante.</p>
                                <p className="close-negrita flex-check-box" >&nbsp; &nbsp;  &nbsp; &nbsp; he verificado si hay menores de edad y que cumplan con los requisitos de ley, siendo {hour} {fecha} </p>
                         </h2>
                    <div className="container-detail-dasboard-in-one container-detail-dasboard-in-one-two" >
                    <div style={{background: "#ebebeb"}} className="border-detail" >
                        <span>Cantidad noches</span>
                        <span className="negrita-detail-reserva" >{day} noche</span>
                    </div>

                    <div style={{background: "#ebebeb"}} className="border-detail">
                        <span>Valor noche</span>
                        <span className="negrita-detail-reserva">${parseInt(resulDetailDashboard.valor_dia_habitacion).toLocaleString()}</span>
                    </div>

                    <div style={{background: "#ebebeb"}} className="border-detail">
                        <span>Total hospedaje</span>
                        <span className="negrita-detail-reserva" >${parseInt(resulDetailDashboard.valor_habitacion).toLocaleString()}</span>
                    </div>
                    
                    <div style={{background: "#ebebeb"}} className="border-detail" >
                        <span>Tipo pago </span>
                        <span className="negrita-detail-reserva"  >{resulDetailDashboard?.forma_pago}</span>
                    </div>

                    <div style={{background: "#ebebeb"}} className="border-detail" >
                            <span>Abono</span>
                        <span className="negrita-detail-reserva" > ${parseInt(resulDetailDashboard.valor_abono).toLocaleString()}</span>
                    </div> 


                    </div>

                </div>

                <div className="  one-button-checking"  >
                    <Button
				         onClick={hanClickinContracto}
					style={{width:"100%"}}  
					color="success" 
				 > <span  className="text-words" >Continuar</span> </Button>
                    </div>
                  
              
            </>
        )

}

export default Checkingn3