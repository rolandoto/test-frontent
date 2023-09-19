    import React, { useContext, useEffect, useState }  from "react";
    import  AutoProvider  from "../../privateRoute/AutoProvider";
    import ServicetypeRooms from "../../service/ServicetypeRooms";
    import { Loading ,Grid, Button} from "@nextui-org/react";
    import ServiceAvaiblereservation from "../../service/ServiceAviableReception";
    import ServiceRoomsAviable from "../../service/ServiceRoomsAvaible";
    import LoadingDetail from "../../Ui/LoadingDetail";
    import Box from '@mui/material/Box';
    import LinearProgress from '@mui/material/LinearProgress';
    import { useHistory } from "react-router-dom";
    import { CiCirclePlus,CiCircleRemove } from "react-icons/ci";
    import UseListMotels from "../../hooks/UseListMotels";
    import { config } from "../../config";
    import ServePdf from "../../service/PdfServe";
    import moment from "moment";
    import ServiceInfomeMovimiento from "../../service/ServiceInformeMovimiento";
    import Swal from 'sweetalert2'
    import useProgress from "../../hooks/useProgress";
    import LineProgress from "../../Ui/LineProgress";            
    import io from "socket.io-client";

    const socket = io.connect("https://railway.grupo-hoteles.com");

const DashboardModal = (props) => {
        

        const {iduser} = UseListMotels()
        const {jwt} = useContext(AutoProvider)
        const message  =jwt?.result?.photo
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
        const [tipoPersonas,setTipoPersona] =useState("")
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
        const [createReservation,setCreateReservation] = useState(false)

        const now = moment().format("YYYY/MM/DD h:mm:ss")

        const nowOne = moment().format("YYYY/MM/DD h:mm:ss")
    
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



        const totalId = jwt.result.id_hotel == 7 ? true : false
	
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
            ServiceRoomsAviable({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones,ID_Habitaciones:dataAvaible.disponibilidad}).then(index =>{
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
        const totalResultglobal =  PriceDay *countSeguro + count - change.abono -decuento

        console.log(totalResultglobal)

        const valor_habiatcion =  PriceDay *countSeguro + count -decuento

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

        useEffect(() =>{
          for (let i = 0; i < huespe?.length; i++) {
            if (huespe[i]?.Tipo_documento =="" || huespe[i]?.Num_documento =="" || huespe[i]?.Nombre ==""|| huespe[i]?.Apellido ==""|| huespe[i]?.Celular ==""|| huespe[i]?.Correo ==""|| huespe[i]?.Fecha_nacimiento =="" || huespe[i]?.Ciudad ==""|| huespe[i]?.Nacionalidad =="" ) {
                setLoadingReservation({error:true})
                setLoadingPersona({habitacion:false})
                setLoadingPersona({error:false})
            }else{
                setValid(true)
            }
        }

        },[setHuespe,huespe])

        const totalFindRoom =  disponibilidad?.query?.find(index => index.ID ==  asignar)

        const findRoomOne =  room?.find(index => index?.id_tipoHabitacion == fecha)
       
          const handClickReservation = async () => {
            if(valid){
                setLoadingReservation({loading:true})
                    ServiceAvaiblereservation({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones,disponibilidad:dataAvaible.disponibilidad,id_estados_habitaciones:0,ID_Canal:change.canal_reserva,Adultos:change.adultos,Ninos:change.niños,ID_Talla_mascota:change.talla_perro,Infantes:change.infantes,Noches:ResultDay,huespe,Observacion:change.observacion,valor:totalResultglobal,ID_Tipo_Forma_pago:change.ID_Tipo_Forma_pago,abono:change.abono,valor_habitacion:valor_habiatcion,Tipo_persona:"sdasdsa",valor_dia_habitacion:default_Value,resepcion:jwt.result.name,link:"https://test-frontent-n9ec.vercel.app/webchecking",id_hotel:jwt.result.id_hotel,nowOne}).then(index =>{
                        setLoadingReservation({loading:false}) 
                        socket.emit("sendNotification",message);
                        setCreateReservation(true)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '<p>Reserva creada</p>',
                            showConfirmButton: false,
                            timer: 500
                          })
                        
                      
                      ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Creación reserva tipo habitacion ${findRoomOne.nombre} ${totalFindRoom.Numero}`,id:jwt.result.id_hotel}).then(index =>{
                        setTimeout(() =>{
                            window.location.href="/Home"
                        },1000)
                      }).catch(e =>{
                          console.log(e)
                      })
                  
                }).catch(e =>{
                    setLoadingReservation({error:false})
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '<p>Completa todos los formularios</p>',
                        showConfirmButton: false,
                        timer: 2000
                      })
                })
            }else{
                setLoadingReservation({error:true})
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: '<p>Completa todos los formularios</p>',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
          };

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
   
        const {progress} = useProgress({id:"1"})
/*
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
    */


      /**
       *  <label className="title-stores">Fecha desde</label>
                        <input className="input-selecto-dasboard-n1-reservaction"   
                        name="desde"  
                        type="date" 
                        onChange={handleFechaOne}  
                        value={fechaOne} />

                        <label className="title-stores">Fecha hasta</label>
                        <input  className="input-selecto-dasboard-n1-reservaction"     
                                    name="hasta"   
                                    type="date" 
                                onChange={handleFechaTwo}  
                                value={fechaTwo} />
                    
                    <Selected 
                            title="Tipo de habitacion" 
                            state={habi} 
                            name="habitaciones" 
                            value={fecha}
                            change={handleChange} />
                
                
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
                
                    
                        <Button
                                className="button-dasboard-one-one"
                                    onClick={handClick}  
                                style={{width:"100%"}}  
                                color="success" 
                        > <span  className="text-words" >Continuar</span> </Button>
                                                      
                                                    
       * 
       * 
       */


    /**
 * <div  className="container-border-gray "  >
        
    <ul className="flex-bedrooms paddint-let-terifa-day">
        
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
                    <option value={3} >No</option>
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
     * 
     */

        if(!room)  return null

        if(createReservation) return   <LineProgress progress={progress} />  
        return (
            <div className="container-bictaONe" >
              
                                            <LoadingDetail      error={loadingPersona.error}  
                                                                    title="Error maximo de personas" />
                                                <LoadingDetail      error={loadingPersona.habitacion}  
                                                                    title="Por favor es obligfatorio el tipo de Habitacion" />
                                            
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
                                                            <div className="contain-board " >

                                                            <div className="contain-board-one" >
                                                                
                                                            <div className="init-dasboard-modal" >
                                                                <form  className="container-flex-init" >
                                                                <div className="container-detail-dasboard-in" > 

                                                                <span className="desde-detail-two-title" > Fecha desde:</span>
                                                                <span className="desde-detail-two-title" >Fecha hasta:</span>
                                                                <span className="desde-detail-three-title-das" >Tipo de habitacion:</span>    
                                                                <span  className="desde-detail-three-title-das">Asignar Habitacion:</span>
                                                                    </div>
                                                                    <div className="container-detail-dasboard-in" > 
                                                                        <input   
                                                                            
                                                                            name="desde"  
                                                                            type="date" 
                                                                            className="desde-detail-two"  
                                                                            onChange={handleFechaOne}  
                                                                            value={fechaOne} 
                                                                            />
                                                                        <input 
                                                                            className="desde-detail-two" 
                                                                            name="hasta"   
                                                                            type="date" 
                                                                        onChange={handleFechaTwo}  
                                                                        value={fechaTwo}  
                                                                        />

                                                                        <select onChange={handleChange}  
                                                                            name="habitaciones"
                                                                            value={fecha}
                                                                            className="desde-detail-two">
                                                                            <option >Seleccionar tipo de habitacion </option>
                                                                                                {habi?.map(category =>(
                                                                                                    <option 
                                                                                                    value ={category.ID}   
                                                                                                    key={category.ID}
                                                                                                >
                                                                                                    {category.nombre}
                                                                                                </option>
                                                                                                )
                                                                                )}
                                                                                
                            
                                                                            </select>
                                                                            <select onChange={handAsignar}  
                                                                                value={asignar}
                                                                                name="disponibilidad"
                                                                                className="desde-detail-two">
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
                                                                    </div>
                                                                </form>

                                                               
                                                            </div>

                                                         
                                                        
                                                    </div>

                                                  
                                                </div>

                                                <Button
                                                    className="button-dasboard-one-one"
                                                        onClick={handClick}  
                                                    style={{width:"100%"}}  
                                                    color="success" 
                                            > <span  className="text-words" >Continuar</span> </Button>
                                                
                                            {to  ? (                                            
                                                <div className="init-dasboard-modal" >
                                                    <form  className="container-flex-init" >
                                                    <div className="container-detail-dasboard-in" > 

                                                    <span className="desde-detail-two-title" > Adultos:</span>
                                                    <span className="desde-detail-two-title" >Niños:</span>
                                                    <span className="desde-detail-three-title-das" >Infantes:</span>    
                                                    <span  className="desde-detail-three-title-das">Mascotas:</span>
                                                    <span className="desde-detail-two-title" > Canal de Reserva:</span>

                                                        </div>
                                                        <div className="container-detail-dasboard-in" > 
                                                            <input 
                                                                className="desde-detail-two"  
                                                                name="adultos" 
                                                                type="number" 
                                                                onChange={handleInputChange}
                                                                placeholder="0" 
                                                                max={countMax}
                                                                defaultValue={0}
                                                                min={0}
                                                                isAllowed={withValueCap}
                                                            />
                                                            <input 
                                                                className="desde-detail-two" 
                                                                name="niños" 
                                                                type="number" 
                                                                onChange={handleInputChange}
                                                                placeholder="0"
                                                                max={totalMaximopersona}
                                                                defaultValue={0}
                                                                min={0} 
                                                                isAllowed={withValueCap}
                                                                />

                                                            <input 
                                                                    className="desde-detail-three" 
                                                                    name="infantes" 
                                                                    type="number" 
                                                                    onChange={handleInputChange}
                                                                    placeholder="0"
                                                                    defaultValue={0}
                                                                   
                                                                    />

                                                            <select onChange={handleInputChange}  
                                                                                    name={"talla_perro"}
                                                                                    className="desde-detail-three"
                                                                            >
                                                                                <option value={3} >No</option>
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

                                                             <select onChange={handleInputChange}  
                                                                name={"canal_reserva"}
                                                                className="desde-detail-two" 
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
                                                        </div>
                                                    </form>
                                                </div>

                                    ) :null}

{to  ? ( 
                                                <div>
                                                {huespe?.map((item, index) => (
                                                        <div className="init-dasboard-modal-modal" >
                                                            <form  className="container-flex-init" >
                                                                <div className="container-detail-dasboard-in" > 

                                                                <span className="desde-detail-two-title" > Nombre:</span>
                                                                <span className="desde-detail-two-title" >Apellido:</span>
                                                                <span className="desde-detail-three-title-das" >Tipo de Doc:</span>    
                                                                <span  className="desde-detail-three-title-das">Nacionalidad:</span>
                                                                <span className="desde-detail-two-title" > No Documento:</span>

                                                                </div>
                                                                    <div className="container-detail-dasboard-in" > 
                                                                        <input 
                                                                            className="desde-detail-two"  
                                                                            required 
                                                                            name="Nombre" 
                                                                            type={"text"} 
                                                                            value={item.Nombre} 
                                                                            onChange={(event) =>  handleInpuHuespe(event, index)}  
                                                                        />
                                                                        <input 
                                                                            
                                                                        className="desde-detail-two"  
                                                                            required  
                                                                            name="Apellido" 
                                                                            type={"text"} 
                                                                            value={item.Apellido}  
                                                                            onChange={(event) =>  handleInpuHuespe(event, index)}
                                                                            />

                                                                        <select  onChange={(event) =>  handleInpuHuespe(event, index)} 
                                                                                                name={"Tipo_documento"}
                                                                                                value={item.Tipo_documento}
                                                                                                required
                                                                                                className="desde-detail-three">
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

                                                                        <select required  onChange={(event) =>  handleInpuHuespe(event, index)} 
                                                                                                name={"Nacionalidad"}
                                                                                                value={item.Nacionalidad}
                                                                                                className="desde-detail-three">
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

                                                                        <input  className="desde-detail-two"  
                                                                                required 
                                                                                name="Num_documento" 
                                                                                type="text" 
                                                                                value={item.Num_documento}  
                                                                                onChange={(event) =>  handleInpuHuespe(event, index)} />
                                                                    </div>
                                                                </form>


                                                                <form  className="container-flex-init" >
                                                                <div className="container-detail-dasboard-in" > 

                                                                <span className="desde-detail-two-title" > Fecha nacimiento:</span>
                                                                <span className="desde-detail-two-title" >Ciudad residencia:</span>
                                                                <span className="desde-detail-three-title-das" >Correo:</span>    
                                                                <span  className="desde-detail-three-title-das">prefijo:</span>
                                                                <span className="desde-detail-two-title" > Celular/sin indicativo:</span>

                                                                </div>
                                                                    <div className="container-detail-dasboard-in" > 
                                                                        <input 
                                                                            className="desde-detail-two"  
                                                                            required name="Fecha_nacimiento"  
                                                                            type="date" 
                                                                            value={item.Fecha_nacimiento}  
                                                                            onChange={(event) =>  handleInpuHuespe(event, index)} 
                                                                        />
                                                                        <input 
                                                                            className="desde-detail-two"    
                                                                            required  name="Ciudad" 
                                                                            type="text" 
                                                                            value={item.Ciudad}  
                                                                            onChange={(event) =>  handleInpuHuespe(event, index)} 
                                                                            />

                                                                      
                                                                        <input 
                                                                              className="desde-detail-three"    
                                                                              required name="Correo"
                                                                               type="text" 
                                                                               value={item.Correo}  
                                                                               onChange={(event) =>  handleInpuHuespe(event, index)}
                                                                            />


                                                                        <select required  onChange={(event) =>  handleInpuHuespe(event, index)} 
                                                                                            disabled={true}
                                                                                                name={"Nacionalidad"}
                                                                                                value={item.Nacionalidad}
                                                                                                className="desde-detail-three">
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

                                                                        <input  className="desde-detail-two"  
                                                                                required  name="Celular"     
                                                                                type="number"  
                                                                                value={item.Celular}  
                                                                                onChange={(event) =>  handleInpuHuespe(event, index)}  />
                                                                    </div>
                                                                </form>
                                                                
                                                            </div>
                                                     ))}

                                            </div>
                                         ):null}   
                                          {to  ? (                
                                            <div className="init-dasboard-modal-modal">
                                                
                                            <form  className="container-flex-init" >
                                                                <div className="container-detail-dasboard-in" > 

                                                                <span className="desde-detail-two-title-update-tafira" > Tarifa por dia:</span>
                                                                <span className="desde-detail-two-title-update-tafira" >V. Seguro:</span>
                                                                <span className="desde-detail-three-title-das-update-one" >V. P Adicional:</span>    
                                                                <span  className="desde-detail-three-title-das-update">Tipo de pago:</span>

                                                                </div>
                                                                    <div className="container-detail-dasboard-in negrita-one-update " > 
                                                                        <input 
                                                                             type="number"
                                                                            className="desde-detail-two"  
                                                                            defaultValue={default_Value}  
                                                                            onChange={handChangeValueEditar}  
                                                                        />
                                                                        
                                                                    <button className="desde-detail-two negrita-one-update "   disabled={true}  >
                                                                            <span>{resultValuepeople =="COPNaN" ?"" :resultValuepeople  }</span> 
                                                                    </button>

                                                                    <button className="desde-detail-two negrita-one-update "   disabled={true}   >
                                                                            <span>{resultValueAdicional =="COPNaN" ?"" :resultValueAdicional }</span> 
                                                                    </button>

                                                                    <select onChange={handleInputChange}  
                                                                            required
                                                                            name="ID_Tipo_Forma_pago"
                                                                            className="desde-detail-three">
                                                                        <option value={1}  >Tipo de pago</option>
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
                                                                    </div>
                                                                </form>

                                                                <form  className="container-flex-init" >
                                                                <div className="container-detail-dasboard-in" > 

                                                              
                                                                <span className="desde-detail-two-title-update" >Descuento:</span>
                                                                <span className="desde-detail-two-title-update" >Abono reserva:</span>
                                                                <span className="desde-detail-two-title" >Valor total  Hospedaje:</span>

                                                                </div>
                                                                    <div className="container-detail-dasboard-in" > 
                                                                       
                                                                   
                                                                        <input   className="desde-detail-three"  type="number" onChange={(e) => setDescuento(e.target.value) }    />
                                                                       

                                                                        <input  className="desde-detail-three" 
                                                                                name="abono" type="number" onChange={handleInputChange} 
                                                                                />

                                                                        <button className="desde-detail-three values-total "  disabled={true} >
                                                                            <span>{global =="COPNaN" ?"" :global}</span> 
                                                                        </button>
                                                                    </div>
                                                                </form>

                                           
                                            
                                            </div>
)                                       :null}  

{to  ? (
                                                <div >   
                                                    <textarea    rows="10" 
                                                                
                                                                    cols="215" 
                                                                    placeholder="Observacion" 
                                                                    name="observacion"
                                                                    defaultValue={ObservationAll}  
                                                                    onChange={handleInputChange}
                                                                    className="obs" ></textarea>                
                                                    </div>  
                                                ) :null} 


                                                {to  ? (
                                                    <div className="row-button-created" >

                                                
                                                            {loadingReservation.loading ? <Loading type="spinner" size="lg" />:
                                                                              
                                                                                    <button className="button-dasboard-sevent-one"  onClick={handClickReservation} >
                                                                                            <span>Crear Reserva</span>
                                                                                    </button>
                                                                              
                                                                }
                                                                                    <button className="button-dasboard-six-one"  onClick={handAdd}   >
                                                                                    <CiCirclePlus fontSize={30} /> <span>  Añadir personas  </span> 
                                                                                    </button>
                                                                               
                                                                                
                                                                                    <button className="button-dasboard-sevent-two" onClick={hancPdf}  >
                                                                                    
                                                                                    <span   >Comprobante</span>
                                                                                    </button>
                                                                               
                                                                                    <button className="button-dasboard-nine-one"  onClick={handNextCLickNoChecking}   >
                                                                                            <span>Wolking</span> 
                                                                                    </button>
                                                                               
                                                            </div>     
                                                                  
                                                                  ):null}
                                                    </div>

                                                   
                                                </div>  
                                        </div>
                                </div>
                            
                        </div>
        )
    }
    export  default  DashboardModal