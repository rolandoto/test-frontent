import React, { useContext, useEffect, useState } from "react";
import LoadingDetail from "../../Ui/LoadingDetail";
import { useSelector } from "react-redux";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import moment from "moment/moment";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import "./style.css"
import { useHistory } from "react-router-dom";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import ServiceUpdateReservation from "../../service/ServiceUpdatereservation";
import UsePrice from "../../hooks/UsePrice";
import ServiceUpdateReservationpay from "../../service/ServiceUpdatereservationpay";

const Checkingn2Organism =({id}) =>{
    const history = useHistory()
    const [tipoDocumento,setTipoDocumento] =useState()
    const [room,setRoom] =useState()
    const {getDetailReservationById} = useDetailDashboardAction()
    const {loading,error,DetailDashboard} = useSelector((state) => state.DetailDashboard)
    const {jwt} =useContext(AutoProvider)
    
    

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

    const resultFinish = room?.find(index=>index?.id_tipoHabitacion == resulDetailDashboard?.ID_Tipo_habitaciones)

    const i = moment(resulDetailDashboard?.Fecha_inicio).utc().format('YYYY/MM/DD')
    const f = moment(resulDetailDashboard?.Fecha_final).utc().format('YYYY/MM/DD')
    const n = moment(resulDetailDashboard?.Fecha_nacimiento).utc().format('YYYY/MM/DD') 

    const valort = resulDetailDashboard?.valor_abono 
    const quitart = valort?.slice(4)
    const numEnterot = parseInt(quitart)
    const addt = "000"
    const numt  = numEnterot + addt
    const convertirFinisht = parseInt(numt)

    const valorOne= resulDetailDashboard?.valor_habitacion 
    const quitartOne = valorOne?.slice(4)
    const numEnterotOne = parseInt(quitartOne)
    const addtOne = "000"
    const numtOne  = numEnterotOne + addtOne
    const convertirFinishtONe = parseInt(numtOne)
    
    let data ={
        Firma:"1"
      } 

        useEffect(() =>{
            ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
                setRoom(index)
            })
          fetch("https://grupohoteles.co/api/getTipeDocument")
          .then(index =>index.json())
          .then(data => setTipoDocumento(data))
      },[])

      const hanClickinContracto =() =>{
        window.location.href =(`/contracto`)
         handFirmar()
      }

      let dataOne ={
        Abono:resulDetailDashboard?.valor_habitacion
      } 
    const handFirmar =() =>{
        ServiceUpdateReservation({id:resulDetailDashboard.id_persona,data}).then(index =>{
            console.log(index)
            
            }).catch(e =>{
            console.log(e)
        })
        ServiceUpdateReservationpay({id,dataOne}).then(index =>{
            console.log(index)
        }).catch(e =>{
          console.log(e)
        })
    }

    const totalPrice = UsePrice({number:resulDetailDashboard?.valor_habitacion -resulDetailDashboard?.valor_abono})

    const toPriceAbono= UsePrice({number:resulDetailDashboard?.valor_abono})

    const toPriceHabitacion = UsePrice({number:resulDetailDashboard?.valor_habitacion})

    if(!resultFinish) return null
    return (
        <>
            <div className="container-flex-init-global" >
            <LoadingDetail
                            loading={true}
                            titleLoading={"Checking"}  />

            <div  className="container-flex-init-global init-checkingn2" >
                <div className="container-detail-dasboard-in" >
                    <input type="text" className="desde-detail" defaultValue={i}   />
                    <input type="text" className="desde-detail" name="Fecha" defaultValue={f}   />
                    <h2 className="cod-reserva" ><span className="title-code" >COD:</span> X14A-{resulDetailDashboard?.Num_documento}</h2>
                </div>

                </div>
                
                <h2 className="cod-reserva-one" ><span className="title-code" ></span> Debes cobrar a {resulDetailDashboard?.Nombre} {resulDetailDashboard?.Apellido} {totalPrice.price}</h2>
           
                    <div className="container-detail-dasboard-in-one-one" >
             
                        <div className="border-detail" >
                            <span> Noches {day}</span>
                        </div>
                        <div className="border-detail" >
                            <span>{toPriceHabitacion.price}</span>
                        </div>

                        <div className="border-detail" >
                        <   span>{resultFinish?.nombre}</span>
                        </div>

                        <div className="border-detail" >
                        <span>{resulDetailDashboard?.forma_pago}</span>
                        </div>
                        <div className="border-detail" >
                            <span>Abono {toPriceAbono.price} </span>
                        </div>
                    </div>

                    <div className="checkin2"  onClick={hanClickinContracto}>
                        <button>Continuar</button>
                    </div>
                </div>

       
        </>
    )

}

export default Checkingn2Organism