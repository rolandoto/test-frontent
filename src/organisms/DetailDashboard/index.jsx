import React, { useContext, useEffect, useState } from "react"
import moment from "moment";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import "./style.css"
import ServiceUpdateReservation from "../../service/ServiceUpdatereservation";
import {useParams} from "react-router-dom"
import LoadingDetail from "../../Ui/LoadingDetail";
import {useHistory} from "react-router-dom"
import ServiceUpdateReservationpay from "../../service/ServiceUpdatereservationpay";
import useProgress from "../../hooks/useProgress";
import LineProgress from "../../Ui/LineProgress";
import useDate from "../../hooks/useDate";
import ServiceRoomsAviable from "../../service/ServiceRoomsAvaible";
import Servicedetailespandir from "../../service/Servicedetailespandir";
import AutoProvider from "../../privateRoute/AutoProvider";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';  
import Container from "../../Ui/Container";
import { CiEdit } from "react-icons/ci";
import ServiceAddHuespedes from "../../service/ServiceAddHuespedes";
import UseListMotels from "../../hooks/UseListMotels";
import UsePrice from "../../hooks/UsePrice";
import { config } from "../../config";
import ServiDelteReservation from "../../service/ServiDelecteReservation";
import ServePdf from "../../service/PdfServe";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import ServicePayReservationSore from "../../service/ServicePayReservationSore";
import { VscSymbolEvent ,VscSignOut,VscSearch,VscAccount} from "react-icons/vsc";
import { VscVerified} from "react-icons/vsc";
import HttpClient from "../../HttpClient"
import Swal from 'sweetalert2'
import ReactTooltip from "react-tooltip";
import ServiceInfomeMovimiento from "../../service/ServiceInformeMovimiento";
import { GiBroom } from "react-icons/gi";
import ServiceStatus from "../../service/ServiceStatus";
import { BsBucket ,BsCalendarCheck,BsCheckCircle,BsBell} from "react-icons/bs";
import UseModalText from "../../hooks/UseModalText";
import { Button, Image, Spacer, Table as table,Tooltip, User } from "@nextui-org/react";
import { CiBadgeDollar,CiDollar ,CiExport,CiUser} from "react-icons/ci";

const DetailDasboard =(props) =>{
    const {id} = useParams()
    const [state,setState] =useState(true)
    const [room,setRoom] =useState()
    const [tipoDocumento,setTipoDocumento] =useState()
    const {DetailDashboard,fetchData,postDetailRoom} = props
    const [loading,setLoading] =useState({loading:false,error:false})
    const history = useHistory()
    const {iduser} = UseListMotels()
    const {jwt} = useContext(AutoProvider)



    const FindIdHotel=(hotel) =>{
     return hotel.id_hotel == jwt.result.id_hotel
    }

    const totalId = jwt.result.id_hotel == 7 || jwt.result.id_hotel == 3 || jwt.result.id_hotel == 4 ? true : false
 
    const resultDashboard = DetailDashboard[0]

    console.log({"detail":resultDashboard})

    const findPersona =  resultDashboard?.tipo_persona == "persona"
    const findEmpresa = resultDashboard?.tipo_persona =="empresa"
    const findFirma = resultDashboard?.Estado =="3" ||  resultDashboard?.Estado =="1"||resultDashboard?.Estado =="5" || resultDashboard?.Estado =="6"

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',  
      currency: 'COP',
      minimumFractionDigits: 0
    })

    const [values, setValues] = React.useState({
        Nombre: null,
        Apellido: null,
        Celular: null,
        Num_documento: null,
        Adultos:null,
        Ninos:null,
        infantes:null,
        Mascotas:null,
        Fecha:null,
        Documento:null,
        Fecha_nacimiento:null,
        Nacionalidad:null,
        Correo:null,
        Celular:null
      });

      const [Nombre,setNombre] =useState()
      const [Apellido,setApellido] =useState()
      const [Documento,setDocumento] =useState()
      const [Nacimiento,setNacimiento] =useState()
      const [Correo,setCorreo] =useState()
      const [Abono,setAbono]  =useState()
      const [persona,setPersona] =useState(false)
      const [empresa,setEmpresa] =useState(false)
      const [tipoPersonas,setTipoPersona] =useState()
      const [isChecked, setIsChecked] = useState(findPersona);
      const [isChecke, setIsChecke] = useState(findEmpresa);
      const [espan,setspand] =useState()
      const [espanOne,setspandOne] =useState()
      const [loadingFecha,setLoadingFecha] =useState({loading:false,error:false})
      const [huesped,setHuesped] =useState(false)
      const [consumo,setConsumo] =useState(false)
      const [pago,setPago] =useState(true)
      const [quyery,setQuery] =useState()
      const [documnet,setDocument] = useState()
      const [country,setCountry] =useState()
      const [stateButton,setStateButton] =useState(false)
      const [adultos,setAdultos] =useState()
      const [ninos,setNinos] = useState()
      const [infantes,setInfantes] =useState()
      const [estadia,setStadia] =useState()
      const [error,setError] =useState(false)
      const [product,setProduct] =useState()
      const [observacion,setObservacion] =useState()
      const [loadinConsumo,setLoadingConsumo] =useState(false)
      const [idRoom,setIdRoom] =useState()
      const [disponibilidad,setDisponibilidad] =useState()
      const [asignar,setAsignar] =useState()
      const [loadingTypeRoom,setLoadingTypeRoom] =useState({loading:false,error:false})
      
 
      const now = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY/MM/DD HH:mm:ss');
   
      const handChangeObservation =(e) =>{
        setObservacion(e.target.value)
      }

      const handChanEstadia =(e) =>{
        setStadia(e.target.value)
      }

      const handChangeSubmit =() =>{
        setStateButton(true)
      }

      const handHuesped =() =>{
        setHuesped(true)
        setConsumo(false)
        setPago(false)
      }

      const handConsumo=() =>{
        setHuesped(false)
        setConsumo(true)
        setPago(false)
      }

      const handPago =() =>{
        setHuesped(false)
        setConsumo(false)
        setPago(true)
      }

      function handleOnChange(event) {
        setTipoPersona("persona")
        setIsChecked(!isChecked);
        setIsChecke(false);
      }

      function handleOnChanger(event) {
        setTipoPersona("empresa")
        setIsChecke(!isChecke);
        setIsChecked(false);
      }
        
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const init  =   moment(resultDashboard?.Fecha_inicio).utc().format('MM/DD/YYYY')
    const fin = moment(resultDashboard?.Fecha_final).utc().format('MM/DD/YYYY')

    const i = moment(resultDashboard?.Fecha_inicio).utc().format('YYYY/MM/DD')
    const f = moment(resultDashboard?.Fecha_final).utc().format('YYYY/MM/DD')
    const n = moment(resultDashboard?.Fecha_nacimiento).utc().format('YYYY/MM/DD')

    const  fecha = useDate({fecha:i})
    const  fechaOne = useDate({fecha:f})

    var fechaInicio =  new Date(init).getTime() 
    var fechaFin    = new Date(fin).getTime() 

    var diff = fechaFin - fechaInicio  
    
    const day =diff/(1000*60*60*24)

    const pruebaOne  =   moment(fecha.defaultValueone).utc().format('MM/DD/YYYY')
    const pruebaTwo = moment(espan).utc().format('MM/DD/YYYY')

    var fechaInicioOne =  new Date(pruebaOne).getTime() 
    var fechaFinOne    = new Date(pruebaTwo).getTime() 

    var diffOne = fechaFinOne - fechaInicioOne  
    const dayOne =diffOne/(1000*60*60*24)

    const handChangeEdit =() =>{
      setState(!state)
      setLoading({loading:false})      
    }

    const handChangeSave =() =>{
      ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Se actualizo datos personales tipo habitacion ${resultFinish?.nombre} ${resultDashboard.Numero} nombre ${resultDashboard.Nombre} codigo reserva ${resultDashboard.id_persona}`,id:jwt.result.id_hotel}).then(index =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '<p>Se actualizo los datos</p>',
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() =>{
          window.location.reload()
        },2000)
      }).catch(e =>{
          console.log(e)
      })

      setState(!state)
      setLoading({loading:false})
      handSubmit()
    }

    const valor = resultDashboard?.valor_abono 
    const quitarr = valor?.slice(4)
    const numEntero = parseInt(quitarr)
    const add = "000"
    const num  = numEntero + add
    const convertirFinish = parseInt(num) + parseInt(Abono)

    const valort = resultDashboard?.valor_abono 
    const quitart = valort?.slice(4)
    const numEnterot = parseInt(quitart)
    const addt = "000"
    const numt  = numEnterot + addt
    const convertirFinisht = parseInt(numt)
   
    const total = resultDashboard?.valor_habitacion
    const quitarone = total?.slice(4)
    const numEnteroOne = parseInt(quitarone)
    const addone = "000"
    const numOne  = numEnteroOne + addone
    const convertirFinishOne = parseInt(numOne) - convertirFinisht

    let data ={
      Nombre,
      Apellido,
      Num_documento:Documento,
      Fecha_nacimiento:Nacimiento,
      Correo,
      Tipo_persona:tipoPersonas
    } 

    const dataAvaible ={
      hasta:`${espan} 13:00:00`,
      desde:`${fechaOne.defaultValueone} 15:00:00`,
      desdeOne:`${fecha.defaultValueone} 15:00:00`,
      hastaOne:`${espanOne} 15:00:00`,
  }   
   
    const tipos_adicional = [
      {
        id: 1,
        name: "Corta",
      },
      {
        id: 2,
        name: "Larga",  
      },
    ];

    const hanClickDetailCheckout =() =>{
      if(findFirma){
        history.push(`/Checkout/${id}`)
      } 
    }

    const handChecking =() =>{
      if(!findFirma){
        history.push(`/detailchecking/${id}`)
      }
    }
    
    const docu = tipoDocumento?.find(index =>  index?.ID == resultDashboard?.ID_Tipo_documento)

    const resultFinish = room?.find(index=>index?.id_tipoHabitacion == resultDashboard?.ID_Tipo_habitaciones)
 
    const item = state  ? <span>Editar</span> : <span>Guardar</span>
    
    const handEditar =(e) =>{
      history.push(`/editarpersonas/${e}`)
    }

    const handEditarReservas=(e) =>{
      history.push(`/editarpersonasreservas/${id}`)
    }

    const [huespe,setHuespe] =useState({
          Tipo_documento:"",
          Num_documento:"",
          Nombre:"",
          Apellido:"",
          Celular:"",
          Correo:"",
          Fecha_nacimiento:"",
          Ciudad:"",
          Nacionalidad:""
    })

    const handleInpuHuespe =(event, index) =>{
        setHuespe({
          ...huespe,
          [event.target.name] : event.target.value
      })
    }

    const [inputPayValue, setInputPayValue] = useState({
      ID_Reserva: id,
      PayAbono: 0,
      Fecha_pago: now,
      Tipo_forma_pago: null,
      Nombre_recepcion:jwt.result.name
    });

    const handleInputPay = (event) => {
      const value = parseInt(event.target.value);
        setInputPayValue({
          ...inputPayValue,
          [event.target.name]: value
        });
    }

    const handClickInsertAbono =()  => {
      if(inputPayValue.PayAbono > 0 ){
        
      }
        HttpClient.insertPayABono({data:inputPayValue}).then(index=> {
          ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Abono agregado tipo habitacion ${resultFinish?.nombre} ${resultDashboard.Numero} nombre ${resultDashboard.Nombre} codigo reserva ${resultDashboard.id_persona}`,id:jwt.result.id_hotel}).then(index =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '<p>Abono exitoso</p>',
              showConfirmButton: false,
              timer: 1000
            })
              window.location.reload()
          }).catch(e =>{
              console.log(e)
          })
       
        }).catch(e =>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '<p>Error</p>',
            showConfirmButton: false,
            timer: 1000
          })
        })
    }

    const {handModalText} =UseModalText({handlModal:handClickInsertAbono,Text:"Agregar abono ?"})

    useEffect(() =>{
      fetch("https://grupohoteles.co/api/getTipeDocument")
      .then(res => res.json())
      .then(data => setDocument(data))

      fetch(`${config.serverRoute}/api/resecion/getcartreservaction/${id}`)
      .then(resp => resp.json())
      .then(data =>setProduct(data.query))

      fetch(`${config.serverRoute}/api/resecion/getcountry`)
      .then(resp => resp.json())
      .then(data=> setCountry(data))

      ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
        setRoom(index)
    })
      fetch("https://grupohoteles.co/api/getTipeDocument")
      .then(index =>index.json())
      .then(data => setTipoDocumento(data))

      fetch(`${config.serverRoute}/api/resecion/getdetailchecking/${id}`)
      .then(resp => resp.json())
      .then(data=> setQuery(data?.query))

      fetch(`${config.serverRoute}/api/resecion/getroomdetalle/${idRoom}`)
            .then(index=> index.json())
            .then(data =>setDisponibilidad(data))
  },[loadinConsumo,idRoom])

  var numDefinish =  parseInt(resultDashboard?.valor_habitacion);

  const formattedNum = numDefinish.toLocaleString();  
  const valor_habitacion = formatter.format(resultDashboard?.valor_habitacion)
  const valor_abono =  formatter.format(resultDashboard?.valor_abono)
  const total_Cobrar = resultDashboard?.valor_habitacion - resultDashboard?.valor_abono
  const cobrar =  parseInt( resultDashboard?.valor_habitacion) - parseInt(resultDashboard?.valor_abono)

  const totalPrice =  DetailDashboard.reduce((acum,item)  =>  acum  + parseInt(item.valor_habitacion) - parseInt(item.valor_abono) - parseInt(inputPayValue.PayAbono),0) 

  const totaCobrar  =  totalPrice  ? totalPrice : 0

  let count

  if(quyery?.length>=resultFinish?.persona){
      if(estadia ==2){
        const nochesPay = day
        const subtotal=resultFinish?.precio_persona*day
        count=subtotal  + parseInt(resultDashboard?.valor_habitacion)
      console.log(true)
      }else if(estadia ==1){
          const nochesPay = 1
          const subtotal=resultFinish?.precio_persona*nochesPay
          count=subtotal  + parseInt(resultDashboard?.valor_habitacion)
      }
    }else{
      count= count ? count : parseInt(resultDashboard?.valor_habitacion)
    }

    let dataOne ={
      Abono: parseInt(Abono) + parseInt(resultDashboard.valor_abono),
      AbonoOne: parseInt(Abono),
      Valor:count  == undefined ?resultDashboard?.valor_habitacion :count ,
      Valor_habitacion:count  == undefined ?resultDashboard?.valor_habitacion :count ,
      Fecha_pago:now
    } 

    let dataCountPeople ={
      Adultos:adultos,
      Ninos:ninos,
      infantes:infantes,
      Observacion:observacion
    }

  const hanAdd=() =>{
    if (huespe.Tipo_documento =="" || huespe.Num_documento =="" || huespe.Nombre ==""|| huespe.Apellido ==""|| huespe.Celular ==""|| huespe.Correo ==""|| huespe.Fecha_nacimiento =="" || huespe.Ciudad ==""|| huespe.Nacionalidad =="" ){
      setError(true)
    }else {
      ServiceAddHuespedes({id,huespe,data:dataCountPeople,dataPay:dataOne}).then(index =>{
        console.log({"se agrego":index})
        ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Se añadio huesped tipo habitacion ${resultFinish?.nombre} ${resultDashboard.Numero} nombre ${resultDashboard.Nombre} codigo reserva ${resultDashboard.id_persona}`,id:jwt.result.id_hotel}).then(index =>{
          window.location.reload()
        }).catch(e =>{
            console.log(e)
        })
     
    }).catch(e =>{
        console.log("error al aregar uan")
    })
    }
  }

  const handSubmit =() =>{
        ServiceAddHuespedes({id,huespe,data:dataCountPeople,dataPay:dataOne}).then(index =>{
          console.log(index)
          window.location.reload()
      }).catch(e =>{
          console.log("error")  
      })
        ServiceUpdateReservation({id:resultDashboard.id_persona,data}).then(index =>{
          console.log(index)
          setLoading({loading:true})
      }).catch(e =>{
        console.log(e)
        setLoading({error:false})
      })

      if(dataOne.Abono !=="COPNaN"){
        ServiceUpdateReservationpay({id,dataOne}).then(index =>{
          console.log(index)
          
      }).catch(e =>{
        console.log(e)
      })
      }
}   

  const totalAlojamiento = resultDashboard?.valor_dia_habitacion * day
  const bebidas  = product?.filter(index => index.ID_Categoria ==1)    
  const Snacks  = product?.filter(index => index.ID_Categoria ==2)    
  const Souvenir  = product?.filter(index => index.ID_Categoria ==3)    
  const Drogueria  = product?.filter(index => index.ID_Categoria ==4)    
  const Adultos  = product?.filter(index => index.ID_Categoria ==5)    
  const Lenceria  = product?.filter(index => index.ID_Categoria ==6)  

  const totalBebidas = bebidas?.reduce((acum,current) => {
  return acum  + current.Cantidad
},0)

const priceBebidas = bebidas?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const totalSnacks = Snacks?.reduce((acum,current) => {
    return acum  + current.Cantidad
},0)

const priceSnacks = Snacks?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const totalSouvenir = Souvenir?.reduce((acum,current) => {
    return acum  + current.Cantidad
},0)

const priceSouvenir = Souvenir?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const totalDrogueria = Drogueria?.reduce((acum,current) => {
    return acum  + current.Cantidad
},0)

const priceDrogueria = Drogueria?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const totalAdultos = Adultos?.reduce((acum,current) => {
    return acum  + current.Cantidad
},0)

const priceAdultos = Adultos?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const totalLenceria = Lenceria?.reduce((acum,current) => {
    return acum  + current.Cantidad
},0)

const priceLenceria = Lenceria?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

  const hanDelete =() =>{
    if(parseInt(resultDashboard.valor_abono) <=0){
      ServiDelteReservation({id}).then(index =>{  
        postDetailRoom({id:resultDashboard?.ID_Habitaciones,ID_estado_habitacion:0})
        ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Reserva eliminada tipo habitacion ${resultFinish?.nombre} ${resultDashboard.Numero} nombre ${resultDashboard.Nombre} codigo reserva ${id} `,id:jwt.result.id_hotel}).then(index =>{
          window.location.href="/Home"
        }).catch(e =>{
            console.log(e)
        })
    }).catch(e =>{
        console.log("error")
    })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '<p>no se puede eliminar la reserva</p>',
        showConfirmButton: false,
        timer: 1000
      })
    }  
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
      id:3,
      name:"Destino",
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
]

const [pdfOne,setPdfOne] =useState()

var curr = new Date(resultDashboard?.Fecha_inicio);
curr.setDate(curr.getDate());
var fecha_inicio = curr.toISOString().substring(0,10);

var currOne = new Date(resultDashboard?.Fecha_final);
currOne.setDate(currOne.getDate());
var fecha_final = currOne.toISOString().substring(0,10);

const PriceRoomById= room?.find(index=>index?.id_tipoHabitacion == idRoom)

const hancPdf =() =>{
  ServePdf({  codigoReserva:resultDashboard?.Num_documento,Nombre:resultDashboard?.Nombre,room:resultFinish?.nombre,adults:resultDashboard?.Adultos,children:resultDashboard?.Ninos,tituloReserva:resultDashboard?.Nombre,abono:resultDashboard?.valor_abono,formaPago:resultDashboard?.forma_pago,telefono:resultDashboard.Celular,identificacion:resultDashboard.Num_documento,correo:resultDashboard.Correo,urllogo:jwt?.result?.logo,tarifa:resultDashboard.valor_habitacion,entrada:fecha_inicio,salida:fecha_final}).then(index => {
    const link = document.createElement('a')
    link.href =index;
    link.setAttribute('target', '_blank');
    link.download = 'Documento.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link) 
      setPdfOne(index)
      ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Descargar comprobante tipo habitacion ${resultFinish?.nombre} ${resultDashboard.Numero} nombre ${resultDashboard.Nombre},  codigo reserva ${resultDashboard.id_persona}` ,id:jwt.result.id_hotel}).then(index =>{                  
      }).catch(e =>{
          console.log(e)
      })
  }).catch(e =>{
    console.log(e)
  })
} 

const hanClickAsear =() => {
    if(resultDashboard?.Estado !="3"){
      ServiceStatus({id,ID_Tipo_Estados_Habitaciones:5}).then(index => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '<p>Exitoso</p>',
          showConfirmButton: false,
          timer: 2000
        })
      }).catch(e =>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '<p>Error al cambiar habitacion</p>',
          showConfirmButton: false,
          timer: 2000
        })
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '<p>habitacion todavia ocupada</p>',
        showConfirmButton: false,
        timer: 2000
      })
    }
}

const hanClickLimpia =() => {
  if(resultDashboard?.Estado !="3"){
    ServiceStatus({id,ID_Tipo_Estados_Habitaciones:6}).then(index => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '<p>Exitoso</p>',
        showConfirmButton: false,
        timer: 2000
      })
    }).catch(e =>{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '<p>Error al cambiar habitacion</p>',
        showConfirmButton: false,
        timer: 2000
      })
    })
  }else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '<p>Error habitacion todavia ocupada</p>',
      showConfirmButton: false,
      timer: 2000
    })
  }
}

const  handComprobante =UseModalText({handlModal:hancPdf,Text:"Descargar comprobante reserva?"})
const  hanclickEditar =UseModalText({handlModal:state ?handChangeSave :handChangeEdit,Text:"Editar la informacion de la reserva?"})
const  handleClickEliminar =UseModalText({handlModal:hanDelete,Text:"Estas seguro de eliminar la reserva ?"})

 const toPriceNigth = UsePrice({number:resultDashboard?.valor_dia_habitacion})
    
    return (
      <>
        <div className="container-flex-init-global" >
          <LoadingDetail   titleLoading={"Datos actualizados"} 
                        loading={loading.loading}
                        error={loading.error}  />

          <LoadingDetail  
                        loading={true}
                        titleLoading={"Detalle reserva"}  />
          <LoadingDetail  
                        error={loadingFecha.error}
                        title={"NO se puede reservar"}  />
          <LoadingDetail  
                        error={loadingTypeRoom.error}
                        title={"No se puede cambiar tipo de habitacion"}  />
           <LoadingDetail  
                        loading={loadingFecha.loading}
                        titleLoading={"Fecha Actualizada"}  />

          <LoadingDetail  
                        loading={loadingTypeRoom.loading}
                        titleLoading={"Se cambio correctamente la habitacion"}  />
           <LoadingDetail      error={error}  
                      title="Completa todos los campos por favor" />

          <div className="container-detail-dasboard-in-one" >
              <div className="border-detail " >
                   <span>Cantidad noches:</span>
                   
                   <span className="negrita-detail-reserva" >{day} noches</span>

                   <span>Valor noche:</span>
                   <span className="negrita-detail-reserva"> {toPriceNigth.price}</span>
              </div>

              <div className="border-detail" >
                   <span>Total hospedaje:</span>
                   <span className="negrita-detail-reserva" >{valor_habitacion}</span>
              </div>
             
              <div  >
              <Spacer x={2} y={0} />
              <Button style={{height:"110px"}}  color={`${totalPrice <=0 ? "success" : "error" }`} >
                   {totalPrice <= 0 ?  <span className="negrita-detail-reserva" >   <BsCheckCircle  className="text-center-icon"   fontSize={25} color="white"  />Al dia con  el pago</span> : <span className="negrita-detail-reserva" >   <CiBadgeDollar  className="text-center-icon"   fontSize={45} color="white"  />  ${cobrar.toLocaleString()}</span>   }   
              </Button>
              </div>

              <Spacer x={0.4} y={1} />
              {resultDashboard.Foto_documento_adelante ?  (
               <div  >
                <Button   style={{height:"110px",width:"100%"}} color={"gradient"}   >
                     <span className="negrita-detail-reserva" >   <VscVerified     className="text-center-icon"   fontSize={30} color="white"  />web check in realizado</span>
                </Button>
              </div>) :  null  } 
              
              
              <div className="border-detail" >
                  <span>Tipo habitacion:</span>
                   <span className="negrita-detail-reserva"  >{resultFinish?.nombre} {resultDashboard.Numero}</span>
              </div>

              <div className="border-detail" >
                  <span>Abono:</span>
                   <span className="negrita-detail-reserva" >{valor_abono}</span>
              </div>
              <div>
                
                  <Button  onClick={hanClickAsear} style={{height:"110px"}} color={"warning"}  >
                     <span className="negrita-detail-reserva" >   <GiBroom   className="text-center-icon"   fontSize={25} color="white"  />Asear habitacion</span>
                  </Button>
              </div>
              <Spacer x={0.4} y={1} />
               <div  >
                <Button  onClick={hanClickLimpia}   style={{height:"110px",width:"100%"}} color={"primary"}   >
                     <span className="negrita-detail-reserva" >   <BsCheckCircle     className="text-center-icon"   fontSize={25} color="white"  />Habitacion limpia</span>
                </Button>
              </div>
          </div>
      </div>
      <div  className="container-flex-init-global" >
            <div className="container-detail-dasboard-in" >
              <input type="date" className="desde-detail"   onChange={(e) => setspandOne(e.target.value)}  defaultValue={fecha_inicio}    />
              <input type="date" className="desde-detail"   onChange={(e) =>setspand(e.target.value)}  defaultValue={fecha_final}  />
              <h2 className="cod-reserva" ><span className="title-code" >COD:</span> X14A-{resultDashboard?.Num_documento}{id}</h2>
          </div>
      </div>
      <div className="init" >
        <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 

        <span className="desde-detail-two-title" > Adultos:</span>
        <span className="desde-detail-two-title" >Niños:</span>
        <span className="desde-detail-three-title-das" >Infantes:</span>    
        <span  className="desde-detail-three-title-das">Mascotas:</span>
        <span className="desde-detail-two-title" > Ciudad:</span>

            </div>
              <div className="container-detail-dasboard-in" > 
                <input type="text" 
                      className="desde-detail-two"  
                      placeholder="Adultos" 
                      name="Adultos"
                      defaultValue={resultDashboard.Adultos}  
                      onChange={(e) =>setAdultos(e.target.value)}  />
                <input type="text" 
                      className="desde-detail-two" 
                      name="Fecha" 
                   placeholder="Niños"  
                      defaultValue={resultDashboard.Ninos}  
                      onChange={(e) =>setNinos(e.target.value)}   />

                <input  type="text" 
                        className="desde-detail-three" 
                        name="Infantes"
                        placeholder="Infantes"  
                        defaultValue={resultDashboard.Infantes}
                        onChange={(e) =>setInfantes(e.target.value)}   />

                <input  type="text" 
                        className="desde-detail-three" 
                        name="Mascotas" 
                        placeholder="Mascotas"   
                        readOnly={state}
                        defaultValue={resultDashboard.Talla}
                        onChange={handleChange("Mascotas")}   />

                <input  type="text" 
                        className="desde-detail-two" 
                        name="Fecha"  
                        placeholder="Mascotas"    
                        readOnly={state}
                        defaultValue={resultDashboard.Ciudad}
                        onChange={handleChange("Fecha")}   />
            </div>
        </form>
      </div>
      <div className="init-photo top-one-detail-room" >
            <form  className="container-flex-init"  onSubmit={e =>{
              e.preventDefault()
            }} >
        <div className="container-detail-dasboard-in" > 
        <span className="desde-detail-two-title-photo" >Forma pago:</span>
        <span className="desde-detail-two-title-photo-three" >Abono:</span>
        <span className="desde-detail-two-title-photo-four" >Documento frontal:</span>
        <span className="desde-detail-two-title-photo-four" >Documento posterior:</span>
        <span className="desde-detail-two-title-photo" >Firma:</span>
            </div>
              <div className="container-detail-dasboard-in" > 
              <select   name="Tipo_forma_pago"
                        value={inputPayValue.Tipo_forma_pago}
                        onChange={handleInputPay}
                        className="desde-detail-twophoto"    >
                    <option></option>
                    {typy_buy?.map(category =>(
                        <option 
                        value={category.id}   
                        key={category.id}>
                        {category.name}
                    </option>
                    )
                    )}
                </select>
                <input   name="PayAbono"
                          onChange={handleInputPay}
                          type="number"
                          value={inputPayValue.PayAbono}
                          defaultValue={0}
                        className="desde-detail-twophoto"  />
                <div>
                <Tooltip content={"Agregar pago sin coma, ni punto "} style={{color:"white"}} >
                <Button style={{background:"black"}} 
                 className="button-change-type-room"  
                 
                  onClick={handModalText} 
                 icon={(<CiDollar     className="text-center-icon"   fontSize={25} color="white"  />)}  >
                     <span className="negrita-detail-reserva" >Agregar abono</span>
                  </Button>
                </Tooltip> 
              
                </div>  
                 <Image
                  width={280}
                  height={125} 
                    src={`${resultDashboard.Foto_documento_adelante ? resultDashboard.Foto_documento_adelante : "https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true"  }`}
                    objectFit="initial"
                    alt="Default Image"
                  />
                  
                  <Image
                    width={275}
                    height={125} 
                    src={`${resultDashboard.Foto_documento_atras ? resultDashboard.Foto_documento_atras : "https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true"  }`}
                    objectFit="initial"
                    alt="Default Image"
                  />

                  <Image
                     width={280}
                     height={125} 
                    src="https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true"
                    objectFit="initial"
                    alt="Default Image"
                  />
                <div>
                </div>
              
            </div>
        </form>
      </div>

        <div className="container-flex-init-one-center " >
              <div> 
                  <Button
                  onClick={handChecking}
                     disabled={findFirma}
                    className="button-checking-detail-one-das"
                    
                    color="success" 
                    icon={( <VscSymbolEvent fontSize={18} className="flex-contan"  color="white" />)}
                     > <span  className="text-words" >Check in</span> </Button>
              </div>
              <div>
              <Button
              icon={(<VscSignOut className="flex-contan"  color="white" fontSize={18}  /> )}
              onClick={hanClickDetailCheckout} 
                     disabled={!findFirma}
                    className="button-checking-detail-one-das"
                  
                    color="success" 
                     > <span  className="text-words" >Check out</span> </Button>
              </div>
              <ReactTooltip id="registerTip" place="top" effect="solid">
                    Eliminar reserva
              </ReactTooltip>
           
              <div className="name-pinter"  onClick={handleClickEliminar.handModalText} data-tip data-for="registerTip" >
            
                  <div>
                
                    <img width={33} src="https://medellin47.com/ico_pms/qcancel.svg" alt="" />
                   
                  </div>
                 
              </div>
              <ReactTooltip id="registerTip-1" place="top" effect="solid">
                    Actualizar reserva
              </ReactTooltip>
              <div className="name-pinter"  onClick={ hanclickEditar.handModalText }   data-tip data-for="registerTip-1">
                  <div>
                    <img width={33}  src="https://medellin47.com/ico_pms/qedit.svg" alt="" />
                  </div>

              </div>

              <ReactTooltip id="registerTip-2" place="top" effect="solid">
                    Descargar comprobante
              </ReactTooltip>
              <div  className="name-pinter"  data-tip data-for="registerTip-2" >
                  <div onClick={ handComprobante.handModalText } >
                     <img width={33}  src="https://medellin47.com/ico_pms/qdoc.svg" alt="" />
                  </div>
              </div>
                <div className="container-checkbox" >
                    <input   type="checkbox" 
                            className={`checkbox-round  ${isChecked && "checkbox-round-click"} `}
                            onChange={handleOnChange}
                            defaultValue={(e) =>findPersona && setIsChecked(true)}       
                            checked={isChecked} /> Persona
                    
                </div> 


                { totalId  ? null :
              <div className="container-checkbox" >
                      <input   type="checkbox" 
                              className={`checkbox-round  ${isChecke && "checkbox-round-click"} `}
                              onChange={handleOnChanger}
                              readOnly={true}
                              checked={isChecked}/> Empresa
              </div> 
            }
        
            <div>
            <Button
            className="button-checking-detail-one-das" 
            color={`${totalPrice <=0 ? "success" : "error" }`} 
          > <span  className="text-words" >Total a cobro ${totaCobrar.toLocaleString()} </span> </Button>
              
            </div>
      </div>
      <div >
    </div>

        <div className="in-cehcki-out" >
        
        </div>
      <div className="container-flex-init-one-container-delete" >
      <textarea                                           rows="10" 
                                                        
                                                         cols="217" 
                                                        placeholder="Observacion" 
                                                        name="observacion"
                                                        defaultValue={resultDashboard.Observacion}
                                                        onChange={handChangeObservation}
                                                        className="obs" ></textarea>  
      
      </div>


      {!stateButton && 
      <div className="init-one-three top-detail  " >
      <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in in-type-button" > 
                <ul className="flex-contain"  >
                    <li className={`${huesped ? "desde-detail-three-estados-black-one-finish" :"desde-detail-three-estados" } `} onClick={handHuesped} >Huespedes:</li>
                    <li className={`${consumo ? "desde-detail-three-estados-black" :"desde-detail-three-estados" } `} onClick={handConsumo} >Consumos:</li>
                    <li className={`${pago ? "desde-detail-three-estados-black" :"desde-detail-three-estados" } `}  onClick={handPago} >Pagos:</li>
                    <li className={`${!pago ? "desde-detail-three-estados-black" :"desde-detail-three-estados" } `}   >Historial:</li>
                </ul>
           { huesped && <Huesped  quyery={quyery}
                                  DetailDashboard={DetailDashboard}
                                  handEditar={handEditar} 
                                  handChangeSubmit={handChangeSubmit} 
                                  stateButton={stateButton} 
                                  handEditarReservas={handEditarReservas}/>} 
          {consumo && <Consumo  day={day} 
                                jwt={jwt}
                                habitacion={resultFinish?.nombre}
                                totalAlojamiento={totalAlojamiento}
                                product={product}
                                totalBebidas={totalBebidas}
                                priceBebidas={priceBebidas}
                                bebidas={bebidas}
                                setLoadingConsumo={setLoadingConsumo}
                                loadinConsumo={loadinConsumo}
                                totalSnacks={totalSnacks}
                                priceSnacks={priceSnacks}
                                Snacks={Snacks}

                                totalSouvenir={totalSouvenir}
                                priceSouvenir={priceSouvenir}
                                Souvenir={Souvenir}

                                totalDrogueria={totalDrogueria}
                                priceDrogueria={priceDrogueria}
                                Drogueria={Drogueria}

                                totalAdultos={totalAdultos}
                                priceAdultos={priceAdultos}
                                Adultos={Adultos}

                                totalLenceria={totalLenceria}
                                priceLenceria={priceLenceria}
                                Lenceria={Lenceria}
                              
                                 />}
          {pago && <Pagos   pagos={resultDashboard}  
                            idReserva={id}
                            typy_buy={typy_buy}   />}
        </div>       
      </form>
      </div>
    }
      {stateButton && 
        <form className="container-flex-init init ono" >
                          <div className="container-detail-dasboard-in" > 
                              <span className="desde-detail-three-das" > Nombre</span>
                              <span className="desde-detail-three-das" >Apellido </span>
                              <span className="desde-detail-two-das" >Tipo de Documento</span>    
                              <span  className="desde-detail-three-das">No documento</span>
                          </div>
                              <div className="container-detail-dasboard-in" >
                                
                                  <input  className="desde-detail-three"     
                                          name="Nombre"  
                                          type={"text"} 
                                          placeholder="Nombre" 
                                          value={item.Nombre} 
                                          onChange={handleInpuHuespe}
                                          required  />

                                  <input  type="text" 
                                          className="desde-detail-three" 
                                          name="Apellido"  
                                          placeholder="Apellido" 
                                          value={item.Apellido} 
                                          onChange={handleInpuHuespe}
                                          required  />
                                      

                                      <select  onChange={handleInpuHuespe}
                                                  name={"Tipo_documento"}
                                                  value={item.Tipo_documento}
                                                  required
                                                  className="desde-detail-two" >
                                                <option >{null}</option>
                                                {documnet?.map(category =>(
                                                    <option 
                                                    value={category.ID}   
                                                    key={category.ID}
                                                >
                                                    {category.nombre}
                                                </option>
                                                )
                                                )}
                                      </select>

                                  <input  type="text" 
                                          className="desde-detail-two" 
                                          name="Num_documento" 
                                          placeholder="Numero de documento"
                                          value={item.Num_documento} 
                                          onChange={handleInpuHuespe}
                                          required />
                              </div>

                              <div className="container-detail-dasboard-in" > 
                              <span className="desde-detail-three-das" > Fecha Nacimiento </span>
                              <span className="desde-detail-three-das" >Nacionalidad </span>
                              <span className="desde-detail-two-das" >Correo electronico</span>    
                              <span  className="desde-detail-three-das">Celular</span>
                          </div>

                              <div className="container-detail-dasboard-in" >
                                  <input  type="date" 
                                          className="desde-detail-three" 
                                          placeholder="Fecha Nacimiento"
                                          name="Fecha_nacimiento"
                                          value={item.Fecha_nacimiento} 
                                          onChange={handleInpuHuespe}
                                          required />

                                          <select   onChange={handleInpuHuespe}
                                                                      name={"Nacionalidad"}
                                                                      value={item.Nacionalidad}
                                                                      
                                                                      required
                                                                      className='desde-detail-three'>
                                                                  <option >{null}</option>
                                                                  {country?.query?.map(category =>(
                                                                      <option 
                                                                      value={category.ID}   
                                                                      key={category.ID}
                                                                  >
                                                                      {category.nombre}
                                                                  </option>
                                                                  )
                                          )}
                                          </select>

                                  <input  type="text" 
                                          className="desde-detail-two" 
                                          name="Correo" 
                                          placeholder="Correo  electronico"  
                                          value={item.Correo} 
                                          onChange={handleInpuHuespe}
                                          required/>

                                  <input  type="number" 
                                          className="desde-detail-two" 
                                          name="Celular"  
                                          placeholder="Celular"  
                                          value={item.Celular} 
                                          onChange={handleInpuHuespe}
                                          required  />
                              </div>

                              <div className="container-detail-dasboard-in" > 
                              <span className="desde-detail-two-das" >Ciudad </span>
                              <span className="desde-detail-three-das-state" >Estadia </span>
                          </div>

                              <div className="container-detail-dasboard-in" >
                                  <input  type="text" 
                                          className="desde-detail-two" 
                                          name="Ciudad"  
                                          placeholder="Ciudad"   
                                          value={item.Ciudad} 
                                          onChange={handleInpuHuespe}
                                          required  />

                                    <select  onChange={handChanEstadia} 
                                                                      name={"Nacionalidad"}
                                                                      value={estadia}
                                                                      required
                                                                      className='desde-detail-three'>
                                                                  <option >estadia</option>
                                            {tipos_adicional.map(category =>(
                                                <option 
                                                value={category.id}   
                                                key={category.id}
                                            >
                                                {category.name}
                                            </option>
                                            )
                                          )}
                                    </select>
                              </div>                              
                      </form>
}

            {stateButton &&<div className="container-flex-init-one" >
                        <button className="button-dasboard-six-one-one-one" onClick={hanAdd}   >
                            <span>Añadir huesped </span> 
                        </button>
                    </div>}
      </>
    )
}
export default DetailDasboard

const Huesped =({quyery,handEditar,handChangeSubmit ,stateButton,DetailDashboard,handEditarReservas}) =>{

  const query =[]

  for(let i =0;i<quyery.length;i++){
    if(quyery[i+1]){
      query.push(quyery[i])
    }
}

  return (
    
    <div >
            
            <TableContainer component={Paper}  className="top-table-One" onSubmit={(e) =>{
              e.preventDefault()
            }} >
            <LoadingDetail  
                            loading={true}
                            titleLoading={"Huespedes"}  />
                <Table sx={{width:1300 ,marginTop:4}} size="small" aria-label="a dense table"> 
                 
                <TableHead>
                    <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Apellido</TableCell>
                    <TableCell align="right">Numero de identificacion</TableCell>
                    <TableCell align="right">Nacionalidad</TableCell>
                    <TableCell align="right">Celular</TableCell>
                    <TableCell align="right">Editar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {DetailDashboard?.map((row,e) =>(
                      <TableRow key={e} >
                          <TableCell >
                          {row.Nombre}
                          </TableCell>
                          <TableCell>{row.Apellido} </TableCell>
                          <TableCell>{row.Num_documento} </TableCell>
                          <TableCell>{row.nacionalidad} </TableCell>
                          <TableCell>{row.Celular} </TableCell>
                          <TableCell className="editar-checking" onClick={handEditarReservas} ><CiEdit fontSize={30} color="black" /></TableCell>
                      </TableRow>
                    ))}
                    {query?.map((row,e) =>(
                      <TableRow key={e} >
                          <TableCell >
                          {row.Nombre}
                          </TableCell>
                          <TableCell>{row.Apellido} </TableCell>
                          <TableCell>{row.Num_documento} </TableCell>
                          <TableCell>{row.nombre} </TableCell>
                          <TableCell>{row.Celular} </TableCell>
                          <TableCell className="editar-checking" onClick={() => handEditar(row.huespedes)} ><CiEdit fontSize={30} color="black" /></TableCell>
                      </TableRow>
                    ))}
                 
                </TableBody>
               
                </Table>
               
            </TableContainer>
                  <div className="container-estado" >
                      <button className="button-checking-detail-checkout-estado" onClick={handChangeSubmit}  >
                              <span className="title-button" >Añadir nuevo huesped</span>
                      </button>
                  </div>
                  
            </div>       
   )
}

const Consumo =(props) =>{

  

  const  {
          habitacion,
          setLoadingConsumo,
          loadinConsumo,
          product} = props

          const  typy_buy =  [
            {   
                id:1,
                name:"Efectivo",
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
              id:2,
              name:"Consignaciones",
          }
          ]

  const cart =[]

  const [state,setState] =useState({
    forma_pago:null,
})

const handleState =(event, index) =>{
  setState({
    ...state,
    [event.target.name] : event.target.value
})
}

  for(let i = 0;i<product?.length;i++){
    console.log({"pago":product[i]})
    cart.push({ 
      ID:product[i].ID,
      Nombre_categoria:product[i].Nombre,
      Nombre_Producto:product[i].Nombre_producto,
      Price:product[i].Precio.toLocaleString(),
      img:product[i].img_product,
      Fecha:moment(product[i].Fecha_compra).utc().format('YYYY/MM/DD'),
      Cantidad:product[i].Cantidad,
      Pago_deuda:product[i].pago_deuda,
      Forma_pago:product[i].Forma_pago,
      Tipo_pago:product[i].forma_pago,
      Nombre_Recepcion:product[i].Nombre_recepcion,
      img:product[i].img_product 
    })
  }
  
  const  now = moment().format("YYYY/MM/DD");

    let data ={
      Forma_pago:state.forma_pago,
      Fecha_compra:now,
      pago_deuda:"1"
    }

  const handPayProduct =(id) =>{
    if(state.forma_pago== null){

    }else{
      ServicePayReservationSore({id, data}).then(index=> {
        setLoadingConsumo(!loadinConsumo)
      }).catch(e =>{
        console.log(e)
      })
    }
  }


  if(!habitacion) return null

  return (
       <div >  

            <TableContainer component={Paper} className="top-table-One"  onSubmit={(e) =>{
              e.preventDefault()
            }} >
              <LoadingDetail  
                              loading={true}
                              titleLoading={"Consumos"}  />
                  <Table sx={{width:1300 ,marginTop:4}} size="small" aria-label="a dense table"> 
                  <TableHead>
                      <TableRow>
                      <TableCell align="right">Producto</TableCell> 
                      <TableCell align="right">Cantidad</TableCell>  
                      <TableCell align="right">Fecha</TableCell> 
                      <TableCell align="right">Valor</TableCell>
                      <TableCell align="right">Estado pago</TableCell>
                      <TableCell align="right">Registro pago</TableCell>
                      <TableCell align="right">Registro pago</TableCell>
                      <TableCell align="right">Recepcion</TableCell>
                      
                      </TableRow>
                  </TableHead>
                  <TableBody>
                        
                        {  cart?.map((row,e) =>{
                            console.log(row.ID)
                          
                          if(row.Pago_deuda ==0){
                          return(
                           <TableRow>
                              <TableCell>  

                              <User
                                bordered
                                squared
                                color="error"
                                size="lg"
                                className="color-black"
                                style={{color:"black"}}
                                  src={row.img}
                                  name={row.Nombre_categoria}
                                  zoomed
                                  description={row.Nombre_Producto}
                                /> 
                                   </TableCell>
                                   <TableCell>{row.Cantidad} </TableCell>
                              <TableCell>{row.Fecha} </TableCell>
                              <TableCell>Cop {row.Price} </TableCell>
                              <TableCell className="pay_deudado" ><span>Adeudado</span></TableCell>
                             
                              <TableCell>  <select  onChange={handleState}
                                    name={"forma_pago"}
                                    value={state.forma_pago}
                                    required
                                    className="desde-detail-two-pagos-store" >
                                  <option >Selecionar tipo pago</option>
                                  {typy_buy?.map(category =>(
                                      <option 
                                      value={category.id}   
                                      key={category.id}
                                  >
                                      {category.name}
                                  </option>
                                  )
                                  )}
                        </select>
                </TableCell>
                <TableCell> <span className="pay_Pagado" onClick={() => handPayProduct(row.ID)} >Pagar producto</span></TableCell>
                <TableCell>{row.Nombre_Recepcion}</TableCell>
                  </TableRow>
                          )
                        } else if(row.Pago_deuda ==1){
                          return (
                          <TableRow>
                             <TableCell>  
                              <User
                                bordered
                                color="success"
                                squared
                                  src={row.img}
                                  size="lg"
                                  name={row.Nombre_categoria}
                                 zoomed
                                 description={row.Nombre_Producto}
                                />
                                  </TableCell>
                                  <TableCell>{row.Cantidad} </TableCell>
                              <TableCell>{row.Fecha} </TableCell>
                              <TableCell>Cop {row.Price} </TableCell>
                              <TableCell className="pay_Pagado-deuda" ><span >Pagado</span></TableCell>
                              <TableCell  ><span >Pagado</span></TableCell>
                              <TableCell>{row.Tipo_pago}</TableCell>
                              <TableCell>{row.Nombre_Recepcion}</TableCell>
                           </TableRow>
                        )}
                        })}
                  </TableBody>
                  </Table>
            </TableContainer> 
             
        </div>  
  )
}







const Pagos =(props) =>{

  const  {pagos,idReserva,typy_buy} = props

  const [payState,setPatSate]=useState()

  const [loading, setloading] = useState(false);
 
  useEffect(() =>{
    fetch(`${config.serverRoute}/api/resecion/getPayabono/${idReserva}`)
    .then(resp => resp.json())
    .then(data=> setPatSate(data.query))
  },[loading])



let count =0
for(let i =0;i<payState?.length;i++){
    if((payState[i].Tipo_persona =="empresa")){
        const totalwith = parseInt(payState[i].Abono  * 19 / 100) 
        const total = totalwith + parseInt(payState[i].Abono)
        count += total
    }else  if((payState[i].Iva ==1)){
        const totalwith = parseInt(payState[i].Abono  * 19 / 100) 
        const total = totalwith + parseInt(payState[i].Abono)
        count += total
    } else{
        count += parseInt(payState[i].Abono)
    }
}

const total = count?.toLocaleString()

return (
    <div >  
         <TableContainer component={Paper}  className="top-table-One" onSubmit={(e) =>{
           e.preventDefault()
         }} >
           <LoadingDetail  
                           loading={true}
                           titleLoading={"Pagos"}  />
               <Table sx={{width:1300 ,marginTop:4}} size="small" aria-label="a dense table"> 
               <TableHead>
                   <TableRow>
                   <TableCell align="right">Fecha</TableCell>
                   <TableCell align="right">Abono</TableCell>
                   <TableCell align="right">Recepcion</TableCell>
                   <TableCell align="right">Tipo pago</TableCell>
                   <TableCell align="right">Editar forma de pago</TableCell>
                   </TableRow>
               </TableHead>
               <TableBody>
                     {payState?.map(index =>{
                           return  <ItemCardPago index={index}typy_buy={typy_buy}  setloading={setloading} />
                       })}
               </TableBody>
               <TableHead>
                   <TableRow>
                    <TableCell align="right">Total ${total}</TableCell>
                   </TableRow>
               </TableHead>
               </Table>
         </TableContainer> 
     </div>  
)
}



const ItemCardPago =({index,typy_buy,setloading}) => { 

  const fecha =moment(index.Fecha_pago).utc().format('YYYY/MM/DD')
  const abonoWithIva  = index.Abono * 19/100 
  const totalIva  = index.Abono + abonoWithIva
  const totalDefinid = index.Iva ==1? totalIva : parseInt(index.Abono)
  const totalDefinttion = index.Tipo_persona =="empresa" ?totalIva:totalDefinid
  const total = totalDefinttion.toLocaleString()

  const [isEditing, setIsEditing] = useState(false)
  const [pay,setPay]=useState(null)

  let taskContent

  const handClickSave =() =>{
      HttpClient.handchangeformapay({ID:index.ID,Tipo_forma_pago:pay}).then(itemForma =>{
      setIsEditing(false)
      setloading(evenItem =>({
        ...evenItem,
        Isval: !evenItem
      }))
    }).catch(e =>{
      console.log("error")
    })
  }

  if(isEditing){
      taskContent  =(
        <> 
          <TableCell>                      
            <select   className="desde-detail-two-pagos-store"
                onChange={(e) =>setPay(e.target.value)} 
                >
              {typy_buy.map(itemTybuy => (
                <option value={itemTybuy.id} >{itemTybuy.name}</option>
              ))}
          </select>
        </TableCell>
          <TableCell ><CiExport fontSize={30} color="black"  className="editar-checking" onClick={handClickSave}   /></TableCell>
        </>
      )
    }else{
      taskContent =(
        <>                         
          <TableCell align="right">{index.Nombre}</TableCell>
          <TableCell className="editar-checking" onClick={() => setIsEditing(true) }  ><CiEdit fontSize={30} color="black" /></TableCell>
        </>

      )
    }

  return (
      <TableRow>
        <TableCell align="right">{fecha}</TableCell>
        <TableCell align="right">${total}</TableCell>
        <TableCell align="right">{index.Nombre_recepcion}</TableCell>
        {taskContent}
      </TableRow>
    )
  
}