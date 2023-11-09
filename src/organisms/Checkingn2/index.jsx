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
import { confirmAlert } from "react-confirm-alert";
import Swal from "sweetalert2";
import { HeartIcon } from "../../page-resesion/Dashboard/IconReservation";
import { Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";

const Checkingn2Organism =({id,postDetailRoom,fetchDataApiWhatsapp,postWhataapById}) =>{
    
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

    const totalPriceWithIva = UsePrice({number:resulDetailDashboard?.valor_habitacion -resulDetailDashboard?.valor_abono})

    const totalWithIva  = resulDetailDashboard?.Iva==1 ? totalPriceWithIva.price :totalPrice.price

    const toPriceAbono= UsePrice({number:resulDetailDashboard?.valor_abono})

    const toPriceHabitacion = UsePrice({number:resulDetailDashboard?.valor_habitacion})

    const toPricediaHabitacion = UsePrice({number:resulDetailDashboard?.valor_dia_habitacion})
   
    const now = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY/MM/DD HH:mm:ss');
 
      const abono = parseInt(resulDetailDashboard?.valor_abono);
      const habitacion = parseInt(resulDetailDashboard?.valor_habitacion);
      
      // Asegurarse de que PayAbono no sea negativo
      const PayAbono = Math.max(habitacion - abono, 0);

            
      console.log(totalWithIva)
      
      const inputPayValue = {
        ID_pago:resulDetailDashboard?.ID_pago,
        ID_Reserva: id,
        PayAbono,
        Fecha_pago: now,
        Tipo_forma_pago: change.ID_Tipo_Forma_pago,
        Nombre_recepcion: jwt.result.name
      };

    const [disable,setDisable] =useState(false)

    const handFirmar = () => {
        if (parseInt(PayAbono) !== 0) {
          HttpClient.insertPayABono({ data: inputPayValue })
            .then((index) => {
              console.log(index);
            })
            .catch((error) => {
              console.error('Error al realizar el pago:', error);
            });
        }
    };

    
     
    let dataTwo = {
        ID_Tipo_Forma_pago:change.ID_Tipo_Forma_pago
    }

    const userName = resulDetailDashboard?.Nombre +" "+resulDetailDashboard?.Apellido 

    const numberPhone = resulDetailDashboard?.codigo +""+ resulDetailDashboard?.Celular

    const totalNumberPhone = numberPhone.replace("+","")

    const handUpdateConfirms = async () => {
        setDisable(true);
        try {

        HttpClient.PostUploadCarPresent({ID_Reserva:id,Username:userName}).then((item) =>{
             fetchDataApiWhatsapp({ phone: totalNumberPhone, name:`${resulDetailDashboard.Nombre} ${resulDetailDashboard.Apellido}`,url:item.imageCarPresents});
        }).catch(e =>{
            console.log("error")
        })

         
          await ServiceUpdateReservationpay({ id, dataOne: dataTwo });
      
          await postDetailRoom({ id: resulDetailDashboard?.ID_Habitaciones, ID_estado_habitacion: 3 });
          await ServiceStatus({ id, ID_Tipo_Estados_Habitaciones: 3 });
      
          const movimiento = `Check in realizado tipo habitacion ${resultFinish?.nombre} ${resulDetailDashboard.Numero} nombre ${resulDetailDashboard.Nombre} codigo reserva ${resulDetailDashboard.id_persona}`;
      
          await ServiceInfomeMovimiento({ Nombre_recepcion: jwt.result.name, Fecha: now, Movimiento: movimiento, id: jwt.result.id_hotel });
          setDisable(false);
          toast.success("pago exitoso")
          
          history.push(`/checkingin3/${id}`);
        } catch (error) {
          console.log(error);
        }
      };


    const handModalText =(e) =>{
        confirmAlert({
          title: '',
          message: Text,
          
              customUI: ({ onClose }) => {

                const handClick =() =>{
                 
                    hanClickinContracto()
                    onClose() 
                }
    
               const handClose =() =>{
                    onClose() 
               }
    
                return (
                    <div className="popup-overlay"  >
                        <h4 className="let-letra" >Confirmar pago ?</h4>
                        <button  className="react-confirm-alert-button-group" onClick={handClick} >Si</button>
                        <button  className="react-confirm-alert-button-group" onClick={ handClose} >No</button>
                  </div>         
                );
              }
        })
        }


    if(!resultFinish) return null
  

    if(resulDetailDashboard.Iva==1){
        return (
            <>
                <div className="container-flex-init-global" >
                <LoadingDetail
                                loading={true}
                                titleLoading={"Checking"}  />
    
                <div  className="init-checkingn2" >
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
                 

                    <div className="container-detail-dasboard-in-one container-detail-dasboard-in-one-tw" >
                    <div style={{background: "#ebebeb"}} className="border-detail" >
                        <span>Cantidad noches</span>
                        <span className="negrita-detail-reserva" >{day} noches</span>
                    </div>

                    <div style={{background: "#ebebeb"}} className="border-detail" >
                        <span>Valor noche</span>
                        <span className="negrita-detail-reserva">  {toPricediaHabitacion.price}</span>
                    </div>

                    <div style={{background: "#ebebeb"}} className="border-detail" >
                        <span>Total hospedaje</span>
                        <span className="negrita-detail-reserva" > {totalWithIva}</span>
                    </div>
                    
                    <div style={{background: "#ebebeb"}} className="border-detail" >
                        <span>Tipo pago </span>
                        <span className="negrita-detail-reserva"  >{resulDetailDashboard?.forma_pago}</span>
                    </div>

                    <div style={{background: "#ebebeb"}} className="border-detail" >
                            <span>Abono</span>
                        <span className="negrita-detail-reserva" >{toPriceAbono.price}</span>
                    </div> 

                    </div>
                    </div>
                        <div className="  one-button-checking"  >
                        <Button 
					disabled={disable}
                    onClick={handModalText}
					style={{width:"100%"}}  
					color="success" 
				 > <span  className="text-words" >Continuar</span> </Button>
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
    
                <div  className="" >
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
                                            key={category.id}
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
                            <div style={{background: "#ebebeb"}} className="border-detail" >
                                <span>Cantidad noches</span>
                                <span className="negrita-detail-reserva" >{day} noches</span>
                            </div>

                            <div style={{background: "#ebebeb"}} className="border-detail" >
                                <span>Valor noche</span>
                                <span className="negrita-detail-reserva"> {toPricediaHabitacion.price}</span>
                            </div>

                            <div style={{background: "#ebebeb"}} className="border-detail" >
                                <span>Total hospedaje</span>
                                <span className="negrita-detail-reserva" >{totalWithIva}</span>
                            </div>
                            
                            <div style={{background: "#ebebeb"}} className="border-detail" >
                                <span>Tipo habitacion</span>
                                <span className="negrita-detail-reserva"  >{resultFinish?.nombre}</span>
                            </div>

                            <div style={{background: "#ebebeb"}} className="border-detail">
                                    <span>Abono</span>
                                <span className="negrita-detail-reserva" >{toPriceAbono.price}</span>
                            </div>         
                </div>
                           
                <Button 
					disabled={disable}
                    onClick={handModalText}
					style={{width:"100%"}}  
					color="success" 
				 > <span  className="text-words" >Continuar</span> </Button>
                    </div>
    
           
            </>
        )
    }
   

}

export default Checkingn2Organism
