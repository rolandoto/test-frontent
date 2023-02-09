    import React, { useContext, useEffect, useState }  from "react";
    import { IoMdCloseCircle } from "react-icons/io";
    import HttpClient from "../../HttpClient";
    import  AutoProvider  from "../../privateRoute/AutoProvider";
    import ServicetypeRooms from "../../service/ServicetypeRooms";
    import Input from "../../Ui/Input";
    import Selected from "../../Ui/Select";
    import { Loading ,Grid} from "@nextui-org/react";
    import ServiceAvaiblereservation from "../../service/ServiceAviableReception";
    import ServiceRoomsAviable from "../../service/ServiceRoomsAvaible";
    import CurrencyInput from 'react-currency-input-field';
    import LoadingDetail from "../../Ui/LoadingDetail";
    import Box from '@mui/material/Box';
    import LinearProgress from '@mui/material/LinearProgress';
    import { useHistory } from "react-router-dom";
    import { useFormik } from "formik";
    import { CiCirclePlus,CiCircleRemove } from "react-icons/ci";
    import * as Yup from "yup";
    import CircularProgress from '@mui/material/CircularProgress';
    import NumberFormat from "react-number-format";
    import Skeleton from "@mui/material/Skeleton";
    import Stack from "@mui/material/Stack";
    import UseListMotels from "../../hooks/UseListMotels";
    import { config } from "../../config";
    import jsPDF from "jspdf";
    import {renderToString} from "react-dom/server";
    import h2c from "html2canvas";
    import { Document, Page, Text,Svg } from '@react-pdf/renderer'
    import { PDFDownloadLink } from '@react-pdf/renderer';
    import ServePdf from "../../service/PdfServe";

    const ref = React.createRef();

   
    const   PdfComprobante =() =>{
      return (
          <div className="App-new" id="tab_customers" class="table table-striped" > 
            <button >Descargar comprobante</button>
                                                         
          <div className="App-new" >
          <div className="container-flex">
            <div>
              <span className="container-pdf-title" >Comprobante </span>
            </div>
            <div>
              <img
              className="image-pdf"
                alt=""
                src="data:image/png;base64,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"
              />
            </div>
          </div>
    
          <div className="container-flex">
            <div>
              <span  >Tu codigo de Reserva </span>
            </div>
    
            <div>
              <span>Rnt:2132456455</span>
            </div>
          </div>
    
          <div>
            <div>
            </div>
    
            <div>
              <h2>
               
              </h2>
            </div>
          </div>
    
        
    
          <div className="flex-comprobante">
            <div className="container-consulte">
              <span className="consulte">Consulte su Reserva</span>
            </div>
            <div>
              <img
                className="codigo-reservation"
                alt=""
                src="data:image/png;base64,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"
              />
            </div>
          </div>
        </div>
        </div>
      )
  }   


const DashboardModal = (props) => {

        const {iduser} = UseListMotels()
        const {jwt} = useContext(AutoProvider)
        const [valueEditar,setValueEditar] =useState()


        const handChangeValueEditar =(e) =>{
            setValueEditar(e.target.value)
        }

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
       
        const Skeleto =() =>{
            return (
                <Stack spacing={1}  className="App-new-skeleto" >
                {/* For variant="text", adjust the height via font-size */}
          
                {/* For other variants, adjust the size with `width` and `height` */}
                <div>
                  <ul className="container-skeleto">
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={200}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={200}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={200}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={100}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={200}
                      height={70}
                    />
                  </ul>
          
                  <ul className="container-skeleto">
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={180}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={180}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={180}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={150}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={180}
                      height={70}
                    />
                  </ul>
                  <ul className="container-skeleto">
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={200}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={200}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={180}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={100}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={200}
                      height={70}
                    />
                  </ul>
          
                  <ul className="container-skeleto">
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={100}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={100}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={130}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={100}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={100}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={140}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={140}
                      height={70}
                    />
                  </ul>
          
                  <ul className="container-skeleto">
                    <Skeleton variant="rounded" width={1300} height={100} />
                  </ul>
          
                  <ul className="container-skeleto">
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={180}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={150}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={180}
                      height={70}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={150}
                      height={70}
                    />
                  </ul>
                </div>
              </Stack>
            )
        }
        
       

    

        const Print = () => {
        const string = renderToString();
        const pdf = new jsPDF("p", "mm", "a4");
        const columns = [
          "SOW Creation Date",
          "SOW Start Date",
          "Project",
          "Last Updated",
          "SOW End Date"
        ];
        var rows = [
          [
            "Dec 13, 2017",
            "Jan 1, 2018",
            "ABC Connect - ABCXYZ",
            "Dec 13, 2017",
            "Dec 31, 2018"
          ]
        ];
        pdf.fromHTML(string);
        pdf.save("pdf");
      };

        
        const history =useHistory()
        const {loading,toggleCloseDashboard,toggleOpenDashboardChecking} = props

        const [room,setRoom] = useState()
        const [cost, setCost] = useState(0);
        const [state,setState] = useState()
        const [pet,setPet] = useState()
        const [documnet,setDocument] = useState()
        const [bedRoom,setBedroom] =useState()
        const [preloading,setPreloading] = useState(false)
        const [chanel,setchanel] =useState()
        const [avaible,setAvaible] =useState(null)
        const [loadingAvaible,setLoadingAvaible] =useState({loading:false,error:true})
        const [loadingReservation,setLoadingReservation] =useState({loading:false,error:false})
        const [loadingPersona,setLoadingPersona] =useState({error:false,habitacion:false})
        const data =""
        const [valid,setValid] =useState(false)
        const [country,setCountry] =useState()
        const [defaultobs,setDefaultobs] =useState("")
        const [tipoPersonas,setTipoPersona] =useState()
        const [isChecked, setIsChecked] = useState(false);
        const [isChecke, setIsChecke] = useState(false);
        const [select,setSelect] =useState(false)
        const [to,setTo] =useState(false)
        const [fecha,setFecha] =useState()
        const [fechaOne,setFechaOne] =useState()
        const [fechaTwo,setFechaTwo] =useState()
        const [asignar,setAsignar] =useState()
        const [loadingSkeleto,setLoadingSkeleto] =useState(true)
        const [decuento,setDescuento] =useState(0)
        const [observacion,setObservacion] =useState()

        const handAsignar =(event)  =>{
            setTo(false)
            setAsignar(event.target.value)
        }

        const handleFechaOne =(event) =>{
            setFechaOne(event.target.value)
            setTo(false)
        }

        const handleFechaTwo =(event) =>{
            setFechaTwo(event.target.value)
            setTo(false)
        }

        const handleChange =(event) => {
            setTo(false)
            setFecha(event.target.value);
          }

        const handChecking =() =>{
            toggleOpenDashboardChecking()
            toggleCloseDashboard()
        }



        const [change,setChange] =useState({
            desde:fechaOne,
            hasta:fechaTwo,
            habitaciones:null,
            disponibilidad:fecha,
            adultos:0,
            niños:0,
            infantes:0,
            tipo_documento:null,
            numero_documento:null,
            ciudad:null,
            nombre:null,
            apellido:null,
            celular:null,
            fecha_nacimiento:null,
            correo:null,
            descuento:null,
            talla_perro:"3  ",
            canal_reserva:null,
            observacion:"",
            ID_Tipo_Forma_pago:null,
            abono:0,
            descuento:null,
            valor:null,
        })


        console.log(change)

        const fechaInicio = new  Date(fechaOne).getTime()

        const fechaFin = new Date(fechaTwo).getTime()

        const ResultFecha = fechaFin - fechaInicio 

        const ResultDay =  ResultFecha/(1000*60*60*24)

        let count =0

        const findRoom = room?.find(index => index.id_tipoHabitacion == fecha)

        const default_Value = valueEditar ? valueEditar : findRoom?.precio
        
        room?.filter(index => {
            if(index.id_tipoHabitacion ==fecha){
                return count = default_Value*ResultDay 
            }
        })

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',  
            currency: 'COP',
            minimumFractionDigits: 0
        })

        const valuesEditar = formatter.format(valueEditar)

        const [disponibilidad,setDisponibilidad] =useState()
      
        
        const resultPay = formatter.format(count)

        const resultDescuento = formatter.format(cost)
    
    /*  ID_Reserva:parseInt(result.toString()),
        ID_Tipo_genero:1,
        ID_Tipo_documento:5,
        Num_documento:"1043668080",
        Nombre:"rolando",
        Apellido:"guerrro",
        Celular:"3202720874",
        Correo:"rolando22_@outlook.co   m",
        Fecha_nacimiento:"2020-09-16",
        Ciudad:"Medellin"
    */
        
        const [huespe,setHuespe] =useState(
            [{
                Tipo_documento:"",
                Num_documento:"",
                Nombre:"",
                Apellido:"",
                Celular:"",
                Correo:"",
                Fecha_nacimiento:"",
                Ciudad:"",
                Nacionalidad:""
            }]
        )
        const handleInpuHuespe =(event, index) =>{
            const values = [...huespe]
           
            values[index][event.target.name] = event.target.value
            setHuespe(values)
        }

        const handleInputChange =(event) =>{

            setChange({
                ...change,
                [event.target.name]:event.target.value
            })
        }

        useEffect(() =>{
                setSelect(false)
        },[change.disponibilidad])

        const totalDate = parseInt(change.adultos) + parseInt(change.niños)
    
        const  {adultos,niños,habitaciones,desde,hasta} = change

        useEffect(() =>{
            ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
                setState(index)
            })
        },[setState])

        const habi = state?.map(index => {
            const ID = index.id_tipoHabitacion
            const {nombre} = index
            return {nombre,ID}
        })

        useEffect(() =>{
         
            fetch(`${config.serverRoute}/api/resecion/getcanales`)
            .then(resp  => resp.json())
            .then(data =>setchanel(data))
           
            fetch(`${config.serverRoute}/api/resecion/getcountry`)
            .then(resp => resp.json())
            .then(data=> setCountry(data))

            fetch("https://grupohoteles.co/api/getTipeDocument")
            .then(res => res.json())
            .then(data => setDocument(data))

           
            fetch(`${config.serverRoute}/api/resecion/gettypepet`)
            .then(res => res.json())
            .then(data  => setPet(data))

            fetch(`https://grupo-hoteles.co/api/getTypeRoomByID?id_tipo_habitacion=${change.habitaciones}`)
            .then(index =>index.json())
            .then(data => setBedroom(data))

            fetch(`${config.serverRoute}/api/resecion/getroomdetalle/${fecha}`)
            .then(index=> index.json())
            .then(data =>setDisponibilidad(data))

            ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
              setRoom(index)
          })
          
        },[fecha,setRoom])

        const dataAvaible ={
            desde:`${fechaOne} 15:00:00`,
            hasta:`${fechaTwo} 13:00:00`,
            habitaciones:fecha,
            disponibilidad:asignar
        }   

        const [loadinghabilitada,setLoadinghabilitada] =useState({loading:false,error:false})

        const handClick =() =>{
            setLoadinghabilitada({loading:false})
            ServiceRoomsAviable({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones,ID_Habitaciones:asignar}).then(index =>{
               
                setLoadinghabilitada({loading:true})
                setTo(true)
            }).catch(e =>{
                setLoadinghabilitada({error:true})
            })
        }

        let adiction 

        const countPeople = parseInt(change.adultos) + parseInt(change.niños) +parseInt(change.infantes) 

        const PriceDay =  countPeople * ResultDay

        const findHabitacion =  habi?.find(index => index.ID ==change.habitaciones)

        const findCanalReserva = chanel?.query?.find(index => index.ID ==parseInt(change.canal_reserva))
       
        const resultFindRoom =  formatter.format(default_Value)

        const resultValuepeople =formatter.format(countSeguro)

        const resultValueAdicional = formatter.format(findRoom?.precio_persona)
        
        const resultpricePeople =  PriceDay *countSeguro + count - change.abono

        const resultsPricePeople =  formatter.format(resultpricePeople)

        const resultAbono = formatter.format(change.abono)
        
        const ObservationAll = " Canal de Reserva: "+ findCanalReserva?.Nombre +" ,Tipo de Habitacion:  "+findRoom?.nombre?.nombre+" ,Numero de  Ocupantes: "+ countPeople +" ,Valor por noche: " + resultFindRoom +" ,Noches: "+ResultDay+ " ,Suma alojamiento: "+resultsPricePeople

        let prueba

        let acum

        const num  =change.adultos 

        const cobroPeople = room?.filter(index => {
            if(countPeople >(index.persona) ){
                const res =   countPeople - index.persona
                acum +=res
            }
        })
        
        const e = parseInt( change?.adultos) +  parseInt(change?.niños)
 
        const  min = parseInt(findRoom?.persona)

        const max = parseInt(findRoom?.max_persona)
      
        const p = e ? e :2

        let arr = new Array(p)
        
        let r =[] 

    let persona =0
    let aditional =0

    for(let i  =0;i<arr?.length;i++){
        r.push(i)
    } 

        for(let e =0;e<r.length;e++){

            if(r[e]+1 <= min){
                persona +=1
              
            }else if(r[e]+1 >max){
              
            }else if(r[e]+1 == max){
                aditional+=1
            }else if(r[e]+1 >min){
                aditional+=1
            }
        }

        const resultValuePersona = findRoom?.precio_persona * aditional *  ResultDay
       
        const totalResultglobal =  PriceDay *countSeguro + count - change.abono + resultValuePersona -decuento

        const valor_habiatcion =  PriceDay *countSeguro + count  + resultValuePersona -decuento

        const global  = formatter.format(totalResultglobal)

        const value_habitacion = formatter.format(valor_habiatcion)

    //const concatenar = change.canal_reserva+"" +change.habitaciones+ ""+change.

        const Loader =() =>{

            if(loadingAvaible.loading){
                return (
                    <div>
                        <Box  spacing={2} sx={{ flex: 1 }}   size="lg"   >
                            <LinearProgress  color="inherit"   />
                        </Box>
                    </div>
                )
            }
        }

        const handAdd =() =>{

            const people = parseInt(findRoom?.max_persona)

        if(huespe.length == people ){
                setLoadingPersona({error:true})
        }else if(!fecha){
                setLoadingPersona({habitacion:true})
        }
        else{
            setLoadingPersona({habitacion:false})
            setLoadingPersona({error:false})
            setHuespe([
                ...huespe,
                {
                    Tipo_documento:"",
                    Num_documento:"",
                    Nombre:"",
                    Apellido:"",
                    Celular:"",
                    Correo:"",
                    Fecha_nacimiento:"",
                    Ciudad:"",
                    Nacionalidad:""
                }
            ])    
        }
        }


        const handleRemove = (index) => {
            if (huespe.length !== 1) {
              const values = [...huespe.filter((e,i) => i !==index)]
              setHuespe(values)
            }
          }

        const total = parseInt(change.adultos) + parseInt(change.niños) +parseInt(change.infantes)




        if(total){
            
            for(let i =0;i<total.lentgh;i++){
                const min = findRoom?.persona
                const max = findRoom?.max_persona
                
            }

        }else{
           
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

        const handAll =() =>{
            toggleCloseDashboard()
            setPreloading(false)
            formatter.format(0)  
        }

        const ray = [1,2,4]

        /* <li>
                                                    <label className="title-stores">Abono reserva</label>
                                                    <input className="input-stores-personality-one-finish" name="abono" type="number" onChange={handleInputChange} />
                                                </li> 

        */

    const handClickReservation =() =>{
        for (let i = 0; i < huespe?.length; i++) {
            if (huespe[i]?.Tipo_documento =="" || huespe[i]?.Num_documento =="" || huespe[i]?.Nombre ==""|| huespe[i]?.Apellido ==""|| huespe[i]?.Celular ==""|| huespe[i]?.Correo ==""|| huespe[i]?.Fecha_nacimiento =="" || huespe[i]?.Ciudad ==""|| huespe[i]?.Nacionalidad =="" ) {
                setLoadingReservation({error:true})
                setLoadingPersona({habitacion:false})
                setLoadingPersona({error:false})
              
            }else{
                setValid(true)
            }
        }

        if(valid){
            setLoadingReservation({loading:true})
            ServiceAvaiblereservation({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones,disponibilidad:dataAvaible.disponibilidad,id_estados_habitaciones:0,ID_Canal:change.canal_reserva,Adultos:change.adultos,Ninos:change.niños,ID_Talla_mascota:change.talla_perro,Infantes:change.infantes,Noches:ResultDay,huespe,Observacion:change.observacion,valor:totalResultglobal,ID_Tipo_Forma_pago:change.ID_Tipo_Forma_pago,abono:change.abono,valor_habitacion:valor_habiatcion,Tipo_persona:tipoPersonas,valor_dia_habitacion:default_Value}).then(index =>{
                setTimeout(() => {
                    setLoadingReservation({loading:false}) 
                }, 5000);
                window.location.href="/Home"
            }).catch(e =>{
                setLoadingReservation({error:true})
               
            })
        }
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

        const handNextCLickNoChecking=() =>{
            history.push("/nochecking")
        }

        const [statePdf,setStatePdf] =useState(false)

        const handClickPdf =() =>{
            setStatePdf(true)
        }

        const resultHuespe= huespe[0]

        const findRoomOne =  room?.find(index => index?.id_tipoHabitacion == fecha)

        const totalPersonas= parseInt( change?.adultos) + parseInt( change.niños)

        let countMax=0
        
        let totalMaximopersona = parseInt(findRoomOne?.max_persona)
        countMax=totalMaximopersona
        

        const MAX_VAL = 6;
        
        const withValueCap = (inputObj) => {
          const { value } = inputObj;
          if (value <= MAX_VAL) return true;
          return false;
        };
    
        const  [pdf,setPdf] =useState(false)
        const [pdfOne,setPdfOne] =useState()
        const [loadingPdf,setTloadging] =useState(false)
      
        const PdfGenerate =[]

        const tipo_forma_pago = typy_buy?.find(index => index.id == change.ID_Tipo_Forma_pago)
       
        const habitacion_asignar = disponibilidad?.query?.find(index=> index.ID == asignar)

        const hancPdf =() =>{
            ServePdf({codigoReserva:resultHuespe?.Num_documento,Nombre:resultHuespe?.Nombre,room:habitacion_asignar?.Numero,adults:change?.adultos,children:change?.niños,tituloReserva:findRoomOne?.nombre,abono:change?.abono,formaPago:tipo_forma_pago?.name,telefono:resultHuespe.Celular,identificacion:resultHuespe.Num_documento,correo:resultHuespe.Correo,urllogo:"https://github.com/rolandoto/image-pms/blob/main/WhatsApp%20Image%202023-02-06%20at%203.49.08%20PM.jpeg?raw=true"}).then(index => {
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
         
        
      console.log(findRoomOne)
      
      /**const link = document.createElement('a');
        link.href =PdfGenerate;
        link.setAttribute('target', '_blank');
        link.download = 'Documento.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)  
      */
      
         

      
          

        if(!room)  return null

        return (
            <div className="container-bicta" >
              
                                            <LoadingDetail      error={loadingPersona.error}  
                                                                    title="Error maximo de personas" />
                                                <LoadingDetail      error={loadingPersona.habitacion}  
                                                                    title="Por favor es obligfatorio el tipo de Habitacion" />

                                                <LoadingDetail      error={loadingReservation.error}  
                                                                    title="Completa todos los campos por favor" />
                                            
                                                <LoadingDetail  
                                                                loading={true}
                                                                titleLoading={"Crear Reserva"}  />

                                                 <LoadingDetail     error={loadinghabilitada.error}  
                                                                    title="la habitacion no esta habilidata" />
                                                <LoadingDetail  
                                                                loading={loadinghabilitada.loading}
                                                                titleLoading={"Habitacion disponible"}  />
                <div className="" >
                            <div className="" >
                                <div className="contain" >
                                    <div className="handclose" onClick={handAll}>
                                    </div>
                                            <div>
                                                <div className="contain-board" >
                                                <div className="contain-board-one" >
                                                <div className="title-modal-dashboard" >


                                                </div>
                                                <ul className="flex-bedrooms">
                                                  
                                                    <li>
                                                        <label className="title-stores">Fecha desde</label>
                                                        <input className="input-selecto-dasboard-n1-reservaction"   name="desde"  type="date" onChange={handleFechaOne}  value={fechaOne} />
                                                    </li>
                                                    <li>
                                                        <label className="title-stores">Fecha desde</label>
                                                        <input className="input-selecto-dasboard-n1-reservaction"      name="hasta"   type="date"  onChange={handleFechaTwo}   value={fechaTwo} />
                                                    </li>
                                                    <Selected 
                                                            title="Tipo de habitacion" 
                                                            state={habi} 
                                                            name="habitaciones" 
                                                            value={fecha}
                                                            change={handleChange} />
                                                
                                                <li>
                                                        <label className="title-stores" >Asignar Habitacion</label>
                                                        <select onChange={handAsignar}  
                                                                value={asignar}
                                                                name="disponibilidad"
                                                                className='select-hotel-type-one'>
                                                            <option></option>
                                                            {disponibilidad?.query?.map(category =>(
                                                                <option 
                                                                value={category.ID}   
                                                                key={category.ID}>
                                                                {category.Numero}
                                                            </option>
                                                            )
                                                            )}
                                                        </select>
                                                    </li>
                                                </ul>

                                                <ul className="container-button-dasboard" >
                                                    <li>
                                                        <button className="button-dasboard-one-one" onClick={handClick}  >
                                                                { <span>Validar</span>}  
                                                        </button>
                                                    </li> 
                                                </ul> 
                                                    
                                        <div>
                                                
                                            <ul className="flex-bedrooms">
                                                   

                                            {to ? 
                                            <li>
                                                    <label className="title-stores">Adultos</label>
                                                             <NumberFormat    className="input-stores-personality " 
                                                            name="adultos" 
                                                            type="number" 
                                                            onChange={handleInputChange}
                                                            placeholder="0" 
                                                            max={countMax}
                                                            defaultValue={0}
                                                            min={0}
                                                            isAllowed={withValueCap}  />
                                                </li>
                                             : null }

                                            {to ? 
                                                <li>
                                                    <label className="title-stores">Niños</label>
                                                    <NumberFormat   className="input-stores-personality"
                                                            name="niños" 
                                                            type="number" 
                                                            onChange={handleInputChange}
                                                            placeholder="0"
                                                            max={totalMaximopersona}
                                                            defaultValue={0}
                                                            min={0} 
                                                            isAllowed={withValueCap} />
                                                </li>
                                            :null }
                                             {to ? 
                                                <li>
                                                    <label className="title-stores">Infantes</label>
                                                    <input  className="input-stores-personality"
                                                            name="infantes" 
                                                            type="number" 
                                                            onChange={handleInputChange}
                                                            placeholder="0"
                                                            defaultValue={0} />
                                                </li>
                                                  : null }
                                                
                                                {to ? 
                                                    <li>
                                                        <label className="title-stores" >Mascota</label>
                                                        <select onChange={handleInputChange}  
                                                                name={"talla_perro"}
                                                                className='select-hotel-type-personality'
                                                        >
                                                            <option >No</option>
                                                            {pet?.query?.map(category =>(
                                                                <option 
                                                                value={category.ID}   
                                                                key={category.ID}
                                                            >
                                                                {category.nombre}
                                                            </option>
                                                            )
                                                            )}
                                                        </select>
                                                    </li>
                                                 : null   }
                                                 {to ? 
                                                    <li>
                                                        <label className="title-stores" >Canal de Reserva</label>
                                                        <select onChange={handleInputChange}  
                                                                name={"canal_reserva"}
                                                                className='select-hotel-type-personality-unica'
                                                        >
                                                            <option >{null}</option>
                                                            {chanel?.query?.map(category =>(
                                                                <option 
                                                                value={category.ID}   
                                                                key={category.ID}
                                                            >
                                                                {category.Nombre}
                                                            </option>
                                                            )
                                                            )}
                                                        </select>
                                                    </li>
                                              :null}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                   
                                 
                                    {to ? <div>
                                    {huespe?.map((item, index) => (
                                            <div className="contain-board" >
                                                <div className="contain-board-one" >
                                                <ul className="flex-bedrooms-finis-one" >
                                                            <li  >
                                                               
                                                              <div  className="button-remove" onClick={(e) =>handleRemove(index)} > <CiCircleRemove  fontSize={25}   /></div>
                                                               
                                                           </li>
                                                    </ul>  
                                                <ul className="flex-bedrooms">
                                                        <li>
                                                            <label className="title-stores">Nombre</label>
                                                            <input className="input-selecto-dasboard-n1-name"  required name="Nombre" type={"text"} value={item.Nombre} onChange={(event) =>  handleInpuHuespe(event, index)} />
                                                        </li>
                                                    <li>
                                                        <label className="title-stores">Apellido</label>
                                                        <input className="input-selecto-dasboard-n1-name" required  name="Apellido" type={"text"} value={item.Apellido}  onChange={(event) =>  handleInpuHuespe(event, index)}/>
                                                    </li>

                                                        <li>
                                                                <label className="title-stores" >Tipo de Doc</label>
                                                                <select  onChange={(event) =>  handleInpuHuespe(event, index)} 
                                                                        name={"Tipo_documento"}
                                                                        value={item.Tipo_documento}
                                                                        required
                                                                        className='select-hotel-type-personality-identificacion'>
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
                                                        </li>
                                                        <li>
                                                                <label className="title-stores" >Nacionalidad</label>
                                                                <select required  onChange={(event) =>  handleInpuHuespe(event, index)} 
                                                                        name={"Nacionalidad"}
                                                                        value={item.Nacionalidad}
                                                                        className='select-hotel-type-personality-country'>
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
                                                        </li>
                                                        
                                                            <li>
                                                                <label className="title-stores">No Documento</label>
                                                                <input className="input-stores-personality-finish" required name="Num_documento" type="text" value={item.Num_documento}  onChange={(event) =>  handleInpuHuespe(event, index)} />
                                                            </li>  
                                                    </ul>

                                                   
                                                    <ul className="flex-bedrooms">
                                                            <li>
                                                                    <label className="title-stores">Fecha nacimiento</label>
                                                                    <input className="input-stores-personality-thre" required name="Fecha_nacimiento"  type="date" value={item.Fecha_nacimiento}  onChange={(event) =>  handleInpuHuespe(event, index)} />
                                                            </li>   
                                                    
                                                            <li>
                                                                <label className="title-stores">Ciudad residencia</label>
                                                                <input className="input-stores-personality-four " required  name="Ciudad"    type="text" value={item.Ciudad}  onChange={(event) =>  handleInpuHuespe(event, index)} />
                                                            </li>   
                                                            <li>
                                                                <label className="title-stores">Correo electronico</label>
                                                                <input className="input-stores-personality-five" required name="Correo" type="text" value={item.Correo}  onChange={(event) =>  handleInpuHuespe(event, index)}/>
                                                            </li>
                                                                    <li>
                                                                    <label className="title-stores" >prefijo</label>
                                                            <select  onChange={(event) =>  handleInpuHuespe(event, index)} 
                                                                    name={"Nacionalidad"}
                                                                    value={item.Nacionalidad}
                                                                    disabled={true}
                                                                    required
                                                                    className='select-hotel-type-personality-country-fixed'>
                                                                <option >{null}</option>
                                                                {country?.query?.map(category =>(
                                                                    <option 
                                                                    value={category.ID}   
                                                                    key={category.ID}
                                                                >
                                                                    {category.codigo}
                                                                </option>
                                                                )
                                                                )}
                                                            </select>
                                                        </li>

                                                    <li>
                                                        <label className="title-stores">Celular</label>
                                                        <input className="input-stores-personality-one--fininsh-prefijo " required  name="Celular"     type="number"  value={item.Celular}  onChange={(event) =>  handleInpuHuespe(event, index)} />
                                                    </li>   

                                                </ul>
                                                <ul className="flex-bedrooms" >
                                                    <hr width="50%" height="50%"  />  
                                                </ul>
                                        </div>
                                      
                                    </div> 
                                   
                                    ))}

                                </div>: null }

                                {to ?
                                    
                                        <ul className="flex-bedrooms">
                                                <li>
                                                    <label className="title-stores">Tafira por dia</label>
                                                        <input className="button-dasboard-thre " defaultValue={default_Value}  onChange={handChangeValueEditar}   />
                                                </li>
                                                <li>
                                                    <label className="title-stores">V. Seguro</label>
                                                        <button className="button-dasboard-thre "   >
                                                                <span>{resultValuepeople =="COPNaN" ?"" :resultValuepeople  }</span> 
                                                        </button>
                                                </li>
                                                <li>
                                                        <label className="title-stores">V. P Adicional</label>
                                                        <button className="button-dasboard-thre "   >
                                                                <span>{resultValueAdicional =="COPNaN" ?"" :resultValueAdicional }</span> 
                                                        </button>
                                                </li>
                                               

                                                    <li>
                                                        <label className="title-stores" >Tipo de pago</label>
                                                        <select onChange={handleInputChange}  
                                                                required
                                                                name="ID_Tipo_Forma_pago"
                                                                className='select-hotel-type-rooms-finis-dasboard'>
                                                            <option>Tipo de pago</option>
                                                            {typy_buy?.map(category =>(
                                                                <option 
                                                                value={category.id}   
                                                                key={category}
                                                            >
                                                                {category.name}
                                                            </option>
                                                            )
                                                            )}
                                                        </select>
                                                    </li>

                                                    <li>
                                                        <label className="title-stores">Descuento</label>
                                                        <input className="button-dasboard-thre not-number " type="number" onChange={(e) => setDescuento(e.target.value) }    />
                                                      
                                                     </li>

                                                <li>
                                                    <label className="title-stores">Abono reserva</label>
                                                    <input className="input-stores-personality-one-finish-dasboard" name="abono" type="number" onChange={handleInputChange} />
                                                </li> 
                                                <li>
                                                    <label className="title-stores">Valor total  Hospedaje</label>
                                                        <button className="button-dasboard-thre-dasboard"   >
                                                                <span>{global =="COPNaN" ?"" :global}</span> 
                                                        </button>
                                                </li>
                                                
                                            </ul>
                                    : null}

                                    {to ?  
                                            <ul className="flex-bedrooms">
                                                            <li>
                                            <textarea    rows="10" 
                                                        
                                                            cols="215" 
                                                            placeholder="Observacion" 
                                                            name="observacion"
                                                            defaultValue={ObservationAll}  
                                                            onChange={handleInputChange}
                                                            className="obs" ></textarea>                
                                        </li>
                                        </ul>
                                     :null}

                                     {to ? 

                                        <ul className="flex-bedrooms">

                                            
                                        <div className="container-checkbox-one" >
                                            <input   type="checkbox" 
                                                    className={`checkbox-round  ${isChecked && "checkbox-round-click"} `}
                                                    onChange={handleOnChange}
                                                
                                                    checked={isChecked}/> Persona
                                            
                                        </div> 

                                        <div className="container-checkbox" >
                                                <input   type="checkbox" 
                                                    className={`checkbox-round  ${isChecke && "checkbox-round-click"} `}
                                                    onChange={handleOnChanger}
                                                    readOnly={true}
                                                    checked={isChecked}/> Empresa
                                        </div> 


                                                            <li>
                                                                <button className="button-dasboard-sevent-one"  onClick={handClickReservation} >
                                                                {loadingReservation.loading ? <Loading type="spinner" size="lg" />:<span>Crear Reserva</span>} 
                                                                </button>
                                                            </li> 
                                                            <li>
                                                                <button className="button-dasboard-six-one"  onClick={handAdd}   >
                                                                <CiCirclePlus fontSize={30} /> <span>  Añadir personas  </span> 
                                                                </button>
                                                            </li> 
                                                            <li>
                                                             
                                                                <button className="button-dasboard-sevent-two" onClick={hancPdf}  >
                                                                
                                                                <span   >Comprobante</span>
                                                                </button>
                                                            </li> 
                                                        

                                                            <li>
                                                                <button className="button-dasboard-nine-one"  onClick={handNextCLickNoChecking}   >
                                                                        <span>Wolking</span> 
                                                                </button>
                                                            </li> 

                                                            
                                                    </ul>
                                                : null}
                                                <ul className="container-button-dasboard-one" >               
                                                </ul>

                                         </div>
                                    </div>  
                            </div>
                    </div>
                   
            </div>
        )
    }
    export  default  DashboardModal