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
import ServiceStatus from "../../service/ServiceStatus";
import HttpClient from "../../HttpClient";
import ServiceInfomeMovimiento from "../../service/ServiceInformeMovimiento";

const Checkingn2Organism =({id,postDetailRoom}) =>{
    
    const history = useHistory()
    const [tipoDocumento,setTipoDocumento] =useState()
    const [room,setRoom] =useState()
    const {getDetailReservationById} = useDetailDashboardAction()
    const {loading,error,DetailDashboard} = useSelector((state) => state.DetailDashboard)
    const {jwt} =useContext(AutoProvider)
    const [change,setChange] =useState({
        ID_Tipo_Forma_pago:null,
    })


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
        if(change.ID_Tipo_Forma_pago== null){

        }else{
            handUpdateConfirms()
            handFirmar()

        }
      
      }

    const handleInputChange =(event) =>{
        setChange({
            ...change,
            [event.target.name]:event.target.value
        })
    }

        const  typy_buy =  [
            {   
                id:1,
                name:"Efectivo",
            },
            {
                id:2,
                name:"Consignaciones",
            },
            {   
                id:4,
                name:"Sitio Web",
            },
            {   
                id:5,
                name:"Payoneer",
            },
            {   
                id:6,
                name:"T.Debito",
            },
            {   
                id:7,
                name:"T.Credito",
            },
            {   
                id:8,
                name:"Hotel Beds",
            },
            {   
                id:9,
                name:"Despegar",
            },
            {   
                id:10,
                name:"Price Travel",
            },
            {   
                id:11,
                name:"Link de pago",
            },
            {   
                id:12,
                name:"Expedia",
            },
            {   
                id:13,
                name:"Mixto",
            },
            ]
   
    const Iva= parseInt(resulDetailDashboard?.valor_habitacion) *19/100

    const totalPrice = UsePrice({number:resulDetailDashboard?.valor_habitacion -resulDetailDashboard?.valor_abono})

    const totalPriceWithIva = UsePrice({number:resulDetailDashboard?.valor_habitacion -resulDetailDashboard?.valor_abono +Iva})

    const totalWithIva  = resulDetailDashboard?.Iva==1 ? totalPriceWithIva.price :totalPrice.price

    const toPriceAbono= UsePrice({number:resulDetailDashboard?.valor_abono})

    const toPriceHabitacion = UsePrice({number:resulDetailDashboard?.valor_habitacion})

    const toPricediaHabitacion = UsePrice({number:resulDetailDashboard?.valor_dia_habitacion})

    const totalAbono =   (resulDetailDashboard?.valor_habitacion) 
   
    const now = moment().format("YYYY/MM/DD")

    let dataOne ={
        Abono:resulDetailDashboard?.valor_habitacion,
        AbonoOne:resulDetailDashboard?.valor_habitacion - resulDetailDashboard?.valor_abono ,
        Fecha_pago:now,
        Valor_habitacion:resulDetailDashboard?.valor_habitacion
    }
    
    const inputPayValue ={
        ID_Reserva: id,
        PayAbono: parseInt(resulDetailDashboard?.valor_habitacion)  - parseInt(resulDetailDashboard?.valor_abono) ,
        Fecha_pago: now,
        Tipo_forma_pago: change.ID_Tipo_Forma_pago,
        Nombre_recepcion:jwt.result.name
    }

    const handFirmar =() =>{
        ServiceUpdateReservation({id:resulDetailDashboard.id_persona,data}).then(index =>{
            if(inputPayValue.PayAbono <=0){
            }else {
                HttpClient.insertPayABono({data:inputPayValue}).then(index =>{
                    console.log(index)
                })
            }
            console.log(index)
            }).catch(e =>{
            console.log(e)
        })
    }
    
    let dataTwo = {
        ID_Tipo_Forma_pago:change.ID_Tipo_Forma_pago
    }

    console.log(resulDetailDashboard)

    const handUpdateConfirms =() =>{
        ServiceUpdateReservationpay({id,dataOne:dataTwo}).then(index  =>{
            postDetailRoom({id:resulDetailDashboard?.ID_Habitaciones,ID_estado_habitacion:3})
            ServiceStatus({id,ID_Tipo_Estados_Habitaciones:3}).then(index=>{
                ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Check in realizado tipo habitacion ${resultFinish?.nombre}  ${resulDetailDashboard.Numero}  nombre ${resulDetailDashboard.Nombre} codigo reserva ${resulDetailDashboard.id_persona}  `,id:jwt.result.id_hotel}).then(index =>{
                   
                    window.location.href =(`/checkingin3/${id}`)
                }).catch(e =>{
                    console.log(e)
                })
            }).catch(e =>{
                console.log(e)
            })
        }).catch(e =>{
            console.log(e)
        }) 
    }

    
    console.log(inputPayValue)

    if(!resultFinish) return null

    if(resulDetailDashboard.Iva==1){
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
                    
                        <h2 className="cod-reserva-one to-checkin" >
                                <span className="title-code" >
                                </span> 
                                <span className="close-negrita"  >  Debes cobrar a:</span>  {resulDetailDashboard?.Nombre} {resulDetailDashboard?.Apellido} <span className="close-negrita"  > un valor de:</span>  {totalWithIva} <span className="close-negrita"  > con el siguiente medio de pago:  <select onChange={handleInputChange}  
                                            required
                                            name="ID_Tipo_Forma_pago"
                                            className='select-hotel-type-rooms-finis-dasboard-finish-one ote posicion'>
                                        <option>Tipo pago</option>
                                        {typy_buy?.map(category =>(
                                            <option 
                                            value={category.id}   
                                            key={category}
                                        >
                                            {category.name}
                                        </option>
                                        )
                                        )}
                                    </select> </span>   
                                 
                         </h2>
                       
                         <div className="top-title-re" >
                            <span className="close-negritaOne">Recuerda que la emision de la factura electronica o pos es en el check out</span>
                        </div>
               
                       
                    </div>

                    <div className="container-detail-dasboard-in-one container-detail-dasboard-in-one-two" >
                    <div className="border-detail " >
                        <span>Cantidad noches</span>
                        <span className="negrita-detail-reserva" >{day} noches</span>
                    </div>

                    <div className="border-detail" >
                        <span>Valor noche</span>
                        <span className="negrita-detail-reserva">  {toPricediaHabitacion.price}</span>
                    </div>

                    <div className="border-detail" >
                        <span>Total hospedaje</span>
                        <span className="negrita-detail-reserva" > {totalWithIva}</span>
                    </div>
                    
                    <div className="border-detail" >
                        <span>Tipo pago </span>
                        <span className="negrita-detail-reserva"  >{resulDetailDashboard?.forma_pago}</span>
                    </div>

                    <div className="border-detail" >
                            <span>Abono</span>
                        <span className="negrita-detail-reserva" >{toPriceAbono.price}</span>
                    </div> 

                  
                </div>
                        <div className="checkin2  one-button-checking"  onClick={hanClickinContracto} >
                            <button>Continuar</button>
                </div> 
            </>
        )
    
    }else{
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
                    
                    <div>
                        <h2 className="cod-reserva-one to-checkin" >
                                <span className="title-code" >
                                </span> 
                                <span className="close-negrita"  >  Debes cobrar a:</span>  {resulDetailDashboard?.Nombre} {resulDetailDashboard?.Apellido} <span className="close-negrita"  > un valor de:</span>  {totalPrice.price} <span className="close-negrita"  > con el siguiente medio de pago:     <select onChange={handleInputChange}  
                                            required
                                            name="ID_Tipo_Forma_pago"
                                            className='select-hotel-type-rooms-finis-dasboard-finish-one ote posicion'>
                                        <option>Tipo pago</option>
                                        {typy_buy?.map(category =>(
                                            <option 
                                            value={category.id}   
                                            key={category}
                                        >
                                            {category.name}
                                        </option>
                                        )
                                        )}
                                    </select>   </span>   
                              
                         </h2>        
                    </div>
                        <div className="top-title-re" >
                            <span className="close-negritaOne">Recuerda que la emision de la factura electronica o pos es en el check out</span>
                        </div>
                      
                    <div className="container-detail-dasboard-in-one container-detail-dasboard-in-one-two" >
                            <div className="border-detail " >
                                <span>Cantidad noches</span>
                                <span className="negrita-detail-reserva" >{day} noches</span>
                            </div>

                            <div className="border-detail" >
                                <span>Valor noche</span>
                                <span className="negrita-detail-reserva"> {toPricediaHabitacion.price}</span>
                            </div>

                            <div className="border-detail" >
                                <span>Total hospedaje</span>
                                <span className="negrita-detail-reserva" >{totalWithIva}</span>
                            </div>
                            
                            <div className="border-detail" >
                                <span>Tipo habitacion</span>
                                <span className="negrita-detail-reserva"  >{resultFinish?.nombre}</span>
                            </div>

                            <div className="border-detail" >
                                    <span>Abono</span>
                                <span className="negrita-detail-reserva" >{toPriceAbono.price}</span>
                            </div>         
                </div>
                           
                <div className="checkin2"  onClick={hanClickinContracto}>
                            <button>Continuar</button>
                        </div>
                    </div>
    
           
            </>
        )
    }
   

}

export default Checkingn2Organism