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

const DetailDasboard =(props) =>{
    const {id} = useParams()
    const [state,setState] =useState(true)
    const [room,setRoom] =useState()
    const [tipoDocumento,setTipoDocumento] =useState()
    const {DetailDashboard,fetchData} = props
    const [loading,setLoading] =useState({loading:false,error:false})
    const history = useHistory()
    const {iduser} = UseListMotels()
    const {jwt} = useContext(AutoProvider)



   const FindIdHotel=(hotel) =>{
     return hotel.id_hotel == jwt.result.id_hotel
   }

   const hotel = iduser.find(FindIdHotel)

   let countSeguro =0
   
   if(hotel?.segurohotelero ==0){
        countSeguro=0
   }else{
        countSeguro = parseInt(hotel?.valorseguro)
   }
  
    const {progress} =useProgress({id})
    const resultDashboard = DetailDashboard[0] 



    const findPersona =  resultDashboard.tipo_persona == "persona"
    const findEmpresa = resultDashboard.tipo_persona =="empresa"
    const findFirma = resultDashboard.Firma =="1"
    
    

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
      const [loadingFecha,setLoadingFecha] =useState({loading:false,error:false})
      const [huesped,setHuesped] =useState(false)
      const [consumo,setConsumo] =useState(false)
      const [pago,setPago] =useState(false)
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

    const handChangeEdit =() =>{
      setState(!state)
      setLoading({loading:false})      
    }

    const handChangeSave =() =>{
      setState(!state)
      setLoading({loading:false})
      handSubmit()
    }

    const valor = resultDashboard.valor_abono 
    const quitarr = valor.slice(4)
    const numEntero = parseInt(quitarr)
    const add = "000"
    const num  = numEntero + add
    const convertirFinish = parseInt(num) + parseInt(Abono)

    const valort = resultDashboard.valor_abono 
    const quitart = valort.slice(4)
    const numEnterot = parseInt(quitart)
    const addt = "000"
    const numt  = numEnterot + addt
    const convertirFinisht = parseInt(numt)
   
    const total = resultDashboard.valor_habitacion
    const quitarone = total?.slice(4)
    const numEnteroOne = parseInt(quitarone)
    const addone = "000"
    const numOne  = numEnteroOne + addone
    const convertirFinishOne = parseInt(numOne) - convertirFinisht

    const finishValor = formatter.format(convertirFinishOne)

    const finisAbono = formatter.format(convertirFinish)

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
  }   

    const date1 = new Date(fechaOne?.defaultValueone)
    const date2 = new  Date(espan)

    const resultFechaMayor = date2> date1 && true

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

    const handClickNextChecking =() =>{
      history.push("/checking")
    }

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
  
    const handClick =() =>{
        Servicedetailespandir({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:resultDashboard.ID_Tipo_habitaciones,ID_Habitaciones:resultDashboard.ID_Habitaciones,id}).then(index =>{
          setLoadingFecha({loading:true})
        }).catch(e =>{
          setLoadingFecha({error:true})
        })
    }

    const docu = tipoDocumento?.find(index =>  index?.ID == resultDashboard.ID_Tipo_documento)

    const resultFinish = room?.find(index=>index?.id_tipoHabitacion == resultDashboard?.ID_Tipo_habitaciones)
    console.log(resultFinish)
    const item = state  ? <span>Editar</span> : <span>Guardar</span>
    
    const handEditar =(e) =>{
      history.push(`/editarpersonas/${e}`)
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
   
  },[setQuery]) 
  
  const valor_habitacion = formatter.format(resultDashboard?.valor_habitacion)
  const valor_abono =  formatter.format(resultDashboard?.valor_abono)
  const total_Cobrar = resultDashboard?.valor_habitacion - resultDashboard?.valor_abono
  const cobrar = formatter.format(total_Cobrar)

  let count=0

  if(quyery?.length>=resultFinish?.persona && estadia ==2){
      const nochesPay = day*countSeguro
      const subtotal=resultFinish.precio_persona*day
      count=subtotal + nochesPay + parseInt(resultDashboard?.valor_habitacion)
  }else if(estadia==1){
    const nochesPay = 1*countSeguro
      const subtotal=resultFinish.precio_persona*1
      count=subtotal + nochesPay + parseInt(resultDashboard?.valor_habitacion) 
  }else {
    count=resultDashboard?.valor_habitacion
  }

  let dataOne ={
    Abono:Abono,
    Valor:count,
    Valor_habitacion:count
  } 

  let dataCountPeople ={
    Adultos:adultos,
    Ninos:ninos,
    infantes:infantes
  }

  const hanAdd=() =>{
    if (huespe.Tipo_documento =="" || huespe.Num_documento =="" || huespe.Nombre ==""|| huespe.Apellido ==""|| huespe.Celular ==""|| huespe.Correo ==""|| huespe.Fecha_nacimiento =="" || huespe.Ciudad ==""|| huespe.Nacionalidad =="" ){
      setError(true)
    }else {
      ServiceAddHuespedes({id,huespe,data:dataCountPeople,dataPay:dataOne}).then(index =>{
        console.log(index)
        window.location.reload()
    }).catch(e =>{
        console.log("error")
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

  console.log(product)

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
    ServiDelteReservation({id}).then(index =>{
      console.log(index)
      window.location.href="/Home"
  }).catch(e =>{
      console.log("error")
  })
} 

const [pdfOne,setPdfOne] =useState()

const hancPdf =() =>{
  ServePdf({codigoReserva:resultDashboard?.Num_documento,Nombre:resultDashboard?.Nombre,room:resultFinish?.nombre,adults:resultDashboard?.Adultos,children:resultDashboard?.Ninos,tituloReserva:resultDashboard?.Nombre,abono:resultDashboard?.valor_abono,formaPago:resultDashboard?.forma_pago,telefono:resultDashboard.Celular,identificacion:resultDashboard.Num_documento,correo:resultDashboard.Correo,urllogo:"https://github.com/rolandoto/image-pms/blob/main/WhatsApp%20Image%202023-02-06%20at%203.49.08%20PM.jpeg?raw=true",tarifa:resultDashboard.valor_habitacion}).then(index => {
    const link = document.createElement('a')
    link.href =index;
    link.setAttribute('target', '_blank');
    link.download = 'Documento.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link) 
      setPdfOne(index)
  }).catch(e =>{
    console.log(e)
  })
  
} 

console.log(resultDashboard)

const toPriceNigth = UsePrice({number:resultDashboard.valor_dia_habitacion})

  if(!docu) return null
  if(!resultFinish)  return null
    
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
                        title={"no no puede reservar"}  />
           <LoadingDetail  
                        loading={loadingFecha.loading}
                        titleLoading={"Fecha Actualizada"}  />
           <LoadingDetail      error={error}  
                      title="Completa todos los campos por favor" />

          <div className="container-detail-dasboard-in-one" >
              <div className="border-detail" >
                   <span>{day} noches</span>
              </div>
              <div className="border-detail" >
                   <span>{valor_habitacion}</span>
              </div>
              <div className="border-detail" >
                   <span>Valor hospedaje {toPriceNigth.price}</span>
              </div>

              <div className="border-detail" >
                   <span>{resultFinish?.nombre}</span>
              </div>

              <div className="border-detail" >
                   <span>{resultDashboard?.forma_pago}</span>
              </div>
              <div className="border-detail" >
                   <span>Abono {valor_abono}</span>
              </div>
             
          </div>
      </div>
        <div  className="container-flex-init-global" >
            <div className="container-detail-dasboard-in" >
              <input type="date" className="desde-detail" readOnly={true}  defaultValue={fecha.defaultValueone}     />
              <input type="date" className="desde-detail" onChange={(e) =>setspand(e.target.value)}  defaultValue={fechaOne.defaultValueone}   />
              <h2 className="cod-reserva" ><span className="title-code" >COD:</span> X14A-{resultDashboard?.Num_documento}</h2>
          </div>
           {resultFechaMayor && <button className="button-checking-detail-one-two" onClick={handClick} >Actualizar Fecha</button>}
      </div>
      <div className="init" >
        <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 

        <span className="desde-detail-two-title" > Adultos </span>
        <span className="desde-detail-two-title" >Niños </span>
        <span className="desde-detail-three-title-das" >Infantes</span>    
        <span  className="desde-detail-three-title-das">Mascotas</span>
        <span className="desde-detail-two-title" > Ciudad</span>

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

        <form className="container-flex-init" >
          
                
            </form>
        <form className="container-flex-init" >

              
        </form>
      </div>
        <div className="container-flex-init-one" >
              <div>
                  <button className={`${ findFirma ? "button-checking-detail-firma" : "button-checking-detail" } `} onClick={handChecking} >
                      <span className="title-button"  >Realizar Check in</span>
                  </button>
              </div>
              <div>
                  <button className="  button-checking-detail-checkout" onClick={hanClickDetailCheckout}  >
                      <span className="title-button"  >Checkout</span>
                  </button>
              </div>
              <div>
                  <button className="button-checking-detail-firma-po"  onClick={hanDelete} >
                      <span className="title-button"  >Cancelar reserva</span>
                  </button>
              </div>

              <div>
              <button className="button-checking-detail-edita-po" onClick={state ? handChangeEdit :handChangeSave}> <span>{item}</span></button>
            </div>
            <div>
                  <button className="button-checking-detail-firma-po"  onClick={hancPdf} >
                      <span className="title-button"  >Comprobante</span>
                  </button>
              </div>

            

                <div className="container-checkbox" >
                    <input   type="checkbox" 
                            className={`checkbox-round  ${isChecked && "checkbox-round-click"} `}
                            onChange={handleOnChange}
                            defaultValue={(e) =>findPersona && setIsChecked(true)}       
                            checked={isChecked} /> Persona
                    
                </div> 
              <div className="container-checkbox" >
                      <input   type="checkbox" 
                              className={`checkbox-round  ${isChecke && "checkbox-round-click"} `}
                              onChange={handleOnChanger}
                              readOnly={true}
                              checked={isChecked}/> Empresa
              </div> 

            <div>
                <input className="button-checking-detail-one-dash" type={"number"}  disabled={findFirma}  placeholder="Abono" onChange={(e) =>setAbono(e.target.value)} />
            </div> 
            <div>
                <button className="button-checking-detail-one-das" > <span> Total cobro {cobrar}  </span></button>
            </div>
            
      
      </div>

      <div className="container-flex-init-one-container-delete" >
      <textarea                                           rows="10" 
                                                        
                                                        cols="217" 
                                                        placeholder="Observacion" 
                                                        name="observacion"
                                                        defaultValue={resultDashboard.Observacion}
      
                                                        className="obs" ></textarea>  
      
      </div>


      {!stateButton && 
      <div className="init  top-detail " >
      <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 
                <ul className="flex-contain"  >
                    <li className={`${huesped ? "desde-detail-three-estados-black" :"desde-detail-three-estados" } `} onClick={handHuesped} >Huespedes</li>
                    <li className={`${consumo ? "desde-detail-three-estados-black" :"desde-detail-three-estados" } `} onClick={handConsumo} >Consumos</li>
                    <li className={`${pago ? "desde-detail-three-estados-black" :"desde-detail-three-estados" } `}  onClick={handPago} >Pagos</li>
                </ul>
           { huesped && <Huesped  quyery={quyery}
                                  handEditar={handEditar} 
                                  handChangeSubmit={handChangeSubmit} 
                                  stateButton={stateButton} />} 
          {consumo && <Consumo  day={day} 
                                habitacion={resultFinish?.nombre}
                                totalAlojamiento={totalAlojamiento}
                                product={product}
                                totalBebidas={totalBebidas}
                                priceBebidas={priceBebidas}
                                bebidas={bebidas}

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
          {pago && <Pagos pagos={resultDashboard} />}
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
                            <span>Añadir Huesped </span> 
                        </button>
                    </div>}
      </>
    )
}
export default DetailDasboard

const Huesped =({quyery,handEditar,handChangeSubmit ,stateButton}) =>{
  return (
    
    <div >
            
            <TableContainer component={Paper}  onSubmit={(e) =>{
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
                    {quyery?.map((row,e) =>(
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

  const  {day,
          habitacion,
          totalAlojamiento,
          totalBebidas,
          priceBebidas,
          bebidas,
          totalSnacks,
          priceSnacks,
          Snacks,
          totalSouvenir,
          priceSouvenir,
          Souvenir,
          totalDrogueria,
          priceDrogueria,
          Drogueria,
          totalAdultos,
          priceAdultos,
          Adultos,
          totalLenceria,
          priceLenceria,
          Lenceria} = props

  const totalAlojaminetoPrice = UsePrice({number:totalAlojamiento})
  const totalTopriceBebidas= UsePrice({number:priceBebidas})
  const totalTopriceSnacks = UsePrice({number:priceSnacks})
  const totalTopriceSouvenir = UsePrice({number:priceSouvenir})
  const totalTopriceDrogueria = UsePrice({number:priceDrogueria})
  const totalTopriceAdultos = UsePrice({number:priceAdultos})
  const totalTopriceLenceria = UsePrice({number:priceLenceria})
  console.log({"totalLenceria":totalLenceria})
  if(!habitacion) return null

  return (
       <div >  
            <TableContainer component={Paper}  onSubmit={(e) =>{
              e.preventDefault()
            }} >
              <LoadingDetail  
                              loading={true}
                              titleLoading={"Consumos"}  />
                  <Table sx={{width:1300 ,marginTop:4}} size="small" aria-label="a dense table"> 
                  <TableHead>
                      <TableRow>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">Nombre</TableCell>
                      <TableCell align="right">Valor</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                        <TableRow>
                            <TableCell>{day} </TableCell>
                            <TableCell>Alojamiento {habitacion} </TableCell>
                            <TableCell>{totalAlojaminetoPrice?.price} </TableCell>
                        </TableRow>

                        {totalTopriceBebidas.price !="COPNaN"  ?   <>
                        {totalTopriceBebidas.price !="COP 0" ?
                        <TableRow>
                            <TableCell>{totalBebidas}</TableCell>
                            <TableCell>Bebidas</TableCell>
                            <TableCell>{totalTopriceBebidas.price} </TableCell>
                        </TableRow>
                        :null }
                        {totalTopriceSnacks.price !="COP 0" ? 
                        <TableRow>
                            <TableCell>{totalSnacks}</TableCell>
                            <TableCell>Snaks</TableCell>
                            <TableCell>{totalTopriceSnacks.price} </TableCell>
                        </TableRow>
                        : null}
                        {totalTopriceSouvenir.price !="COP 0" ?
                          <TableRow>
                              <TableCell>{totalSouvenir}</TableCell>
                              <TableCell>Souvenir</TableCell>
                              <TableCell>{totalTopriceSouvenir.price} </TableCell>
                          </TableRow>
                          : null }
                        {totalTopriceDrogueria.price !="COP 0"  ? 
                        <TableRow>
                            <TableCell>{totalDrogueria}</TableCell>
                            <TableCell>Drogueria</TableCell>
                            <TableCell>{totalTopriceDrogueria.price} </TableCell>
                        </TableRow>
                         :null}
                         {totalTopriceAdultos.price !="COP 0" ?
                        <TableRow>
                            <TableCell>{totalAdultos}</TableCell>
                            <TableCell>Adultos</TableCell>
                            <TableCell>{totalTopriceAdultos.price} </TableCell>
                        </TableRow>
                        : null}
                          {totalTopriceLenceria.price !="COP 0" ? 
                          <TableRow>
                              <TableCell>{totalLenceria}</TableCell>
                              <TableCell>Lenceria</TableCell>
                              <TableCell>{totalTopriceLenceria.price} </TableCell>
                          </TableRow>
                        : null}
                    </> : null }

                  </TableBody>
                  </Table>
            </TableContainer> 
        </div>  
  )
}



const Pagos =(props) =>{

  const  {pagos} = props

  const abono = UsePrice({number:pagos?.valor_abono})

  return (
    <div >  
         <TableContainer component={Paper}  onSubmit={(e) =>{
           e.preventDefault()
         }} >
           <LoadingDetail  
                           loading={true}
                           titleLoading={"Pagos"}  />
               <Table sx={{width:1300 ,marginTop:4}} size="small" aria-label="a dense table"> 
               <TableHead>
                   <TableRow>
                   <TableCell align="right">Valor</TableCell>
                   <TableCell align="right">Tipo de pago</TableCell>
                   <TableCell align="right">Concepto</TableCell>
                   </TableRow>
               </TableHead>
               <TableBody>
                     <TableRow>
                         <TableCell>{abono?.price}</TableCell>
                         <TableCell>{pagos?.forma_pago}</TableCell>
                         <TableCell>Anticipo alojamiento</TableCell>
                     </TableRow>
               </TableBody>
               </Table>
         </TableContainer> 
     </div>  
)
}
