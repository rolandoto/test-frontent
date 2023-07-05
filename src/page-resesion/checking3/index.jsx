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
    const history = useHistory()
    const [tipoDocumento,setTipoDocumento] =useState()
    const [room,setRoom] =useState()
    const {getDetailReservationById} = useDetailDashboardAction()
    const {loading,error,DetailDashboard} = useSelector((state) => state.DetailDashboard)
    const {jwt} =useContext(AutoProvider)
    const [change,setChange] =useState({
        ID_Tipo_Forma_pago:null,
    })
    const [isChecked, setIsChecked] = useState(false);

    const fetchData =async() =>{
        await getDetailReservationById({id})
    }   

    useEffect(() =>{
        fetchData()
    },[id])


    console.log(id)

    const  resulDetailDashboard = DetailDashboard[0]

    console.log(resulDetailDashboard)
    
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
            handUpdateConfirms()
    
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
   
    const  now = moment().format("YYYY/MM/DD");
    let dataOne ={
        Abono:resulDetailDashboard?.valor_habitacion,
        AbonoOne:resulDetailDashboard?.valor_habitacion - resulDetailDashboard?.valor_abono ,
        Fecha_pago:now,
        Valor_habitacion:resulDetailDashboard?.valor_habitacion
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

    let dataTwo = {
        ID_Tipo_Forma_pago:change.ID_Tipo_Forma_pago
    }

    const handUpdateConfirms =() =>{
       if(isChecked){
        window.location.href =(`/contracto`)
       }
     
    }


    function handleOnChange(event) {
        setIsChecked(!isChecked);
      }  
   
    if(!resultFinish) return null

    if(resulDetailDashboard.Iva==1){
        return (
            <>
                <div className="container-flex-init-global" >
                <LoadingDetail
                                loading={true}
                                titleLoading={"Pagina 3"}  />
    
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
                                <p className="close-negrita flex-check-box"  >  <input   type="checkbox" 
                                    className={`checkbox-round-three  ${isChecked && "checkbox-round-click"} `}
                                    readOnly={true}
                                    onChange={handleOnChange}
                                    checked={isChecked}/>  Yo &nbsp; <span className="close-negrita" ></span> {jwt.result.name} He digitalizado, impreso y archivado el documento del titular y acompañante.</p>
                                <p className="close-negrita flex-check-box" >&nbsp; &nbsp;  &nbsp; &nbsp; he verificado si hay menores de edad y que cumplan con los requisitos de ley, siendo {hour} {fecha} </p>
                         </h2>
                       
                       
                    </div>

                 

                    <div className="container-detail-dasboard-in-one container-detail-dasboard-in-one-two" >
                    <div className="border-detail " >
                        <span>Cantidad noches</span>
                        <span className="negrita-detail-reserva" >{day} noche</span>
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
                <Button
				         onClick={hanClickinContracto}
					style={{width:"100%"}}  
					color="success" 
				 > <span  className="text-words" >Continuar</span> </Button>
            </>
        )
    
    }else{
        return (
            <>
                <div className="container-flex-init-global" >
                <LoadingDetail
                                loading={true}
                                titleLoading={"Pagina 3"}  />
    
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
                                    <p className="close-negrita flex-check-box"  >  <input   type="checkbox" 
                                        className={`checkbox-round-three  ${isChecked && "checkbox-round-click"} `}
                                        readOnly={true}
                                        onChange={handleOnChange}
                                        checked={isChecked}/>  Yo &nbsp; <span className="close-negrita" ></span> {jwt.result.name} He digitalizado, impreso y archivado el documento del titular y acompañante.</p>
                                    <p className="close-negrita flex-check-box" >&nbsp; &nbsp;  &nbsp; &nbsp; he verificado si hay menores de edad y que cumplan con los requisitos de ley, siendo {hour} {fecha} </p>
                            </h2>      
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
                     <Button
				         onClick={hanClickinContracto}
					style={{width:"100%"}}  
					color="success" 
				 > <span  className="text-words" >Continuar</span> </Button>
              
                    </div>
    
           
            </>
        )
    }
   

}

export default Checkingn3