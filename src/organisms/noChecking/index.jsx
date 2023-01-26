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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingDetail from "../../Ui/LoadingDetail";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { CiCirclePlus,CiCircleRemove } from "react-icons/ci";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { config } from "../../config";

const NoCheckingOrganism =(props) =>{

    const history =useHistory()
        const {loading,toggleCloseDashboard,toggleOpenDashboardChecking} = props

        const [room,setRoom] = useState()
        
        useEffect(() =>{
            ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
                setRoom(index)
            })
        },[])

        const { handleSubmit, errors, touched, getFieldProps } = useFormik({
            initialValues: {
                fullName: '',
                email: '',
                password: '',
                rol: '',
                gender: '',
                terms: false
            },
            validationSchema: Yup.object({
                fullName: Yup.string().min(3, 'Min. 3 characters').required('Required'),
                email: Yup.string().email('It should be a valid email').required('Required'),
                password: Yup.string().min(6, 'Min. 6 characters').required('Required'),
                terms: Yup.boolean().isTrue('You must accept the terms!'),
                rol: Yup.string().required('Required'),
                gender: Yup.string().required('Required'),
            }),
            onSubmit: values => {
                // TODO: some action
            }
        });

        const [cost, setCost] = useState(0);
        const [state,setState] = useState()
        const [pet,setPet] = useState()
        const [documnet,setDocument] = useState()
        const [bedRoom,setBedroom] =useState()
        const {jwt} = useContext(AutoProvider)
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
            abono:null,
            descuento:null,
            valor:null,
        })

        

        const fechaInicio = new  Date(fechaOne).getTime()

        const fechaFin = new Date(fechaTwo).getTime()

        const ResultFecha = fechaFin - fechaInicio 

        const ResultDay =  ResultFecha/(1000*60*60*24)

       

        let count =0
        
        room?.filter(index => {
            if(index.id_tipoHabitacion ==fecha){
                return count = index.precio*ResultDay 
            }
        })


        console.log({"aqui es":room})
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',  
            currency: 'COP',
            minimumFractionDigits: 0
        })

    
        const [disponibilidad,setDisponibilidad] =useState()
        useEffect(() =>{
            fetch(`${config.serverRoute}/api/resecion/getroomdetalle/${fecha}`)
            .then(index=> index.json())
            .then(data =>setDisponibilidad(data))
        },[fecha])
        
       
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
            console.log("momo", values)
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
            ServicetypeRooms({id:12}).then(index =>{
                setState(index)
            })
        },[setState])

        const habi = state?.map(index => {
            const ID = index.id_tipoHabitacion
            const {nombre} = index
            return {nombre,ID}
        })
            
        useEffect(() =>{
            fetch(`https://grupohoteles.co/api/getTypeRoomByID?id_tipo_habitacion=${change.habitaciones}`)
            .then(index =>index.json())
            .then(data => setBedroom(data))
        },[])
        useEffect(() =>{
            
            fetch(`${config.serverRoute}/api/resecion/gettypepet`)
            .then(res => res.json())
            .then(data  => setPet(data))
        },[])

        useEffect(() =>{
            
            fetch(`${config.serverRoute}/api/getTipeDocument`)
            .then(res => res.json())
            .then(data => setDocument(data))
        },[])    
       
        useEffect(() =>{
            fetch(`${config.serverRoute}/api/resecion/getcanales`)
            .then(resp  => resp.json())
            .then(data =>setchanel(data))
        },[])

        useEffect(() =>{
            fetch(`${config.serverRoute}/api/resecion/getcountry`)
            .then(resp => resp.json())
            .then(data=> setCountry(data))
        },[])



        const handValidateAvaible= async () =>{
        
            try {
                    await HttpClient.PostAvaible({habitaciones,desde,hasta}).then(index => {
                        setPreloading(index.ok)
                    }).catch(e =>{
                        
                    })
                
            } catch (error) {
                    console.log(error)
            }
        }   

        const dataAvaible ={
            desde:`${fechaOne} 15:00:00`,
            hasta:`${fechaTwo} 13:00:00`,
            habitaciones:fecha,
            disponibilidad:asignar
        }   

        const [loadinghabilitada,setLoadinghabilitada] =useState({loading:false,error:false})

        const handClick =() =>{
            ServiceRoomsAviable({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones,ID_Habitaciones:asignar}).then(index =>{
                console.log({"aceptado":index})
                setLoadinghabilitada({loading:true})
                setTo(true)
            }).catch(e =>{
                setLoadinghabilitada({error:true})
            })
        }

        let adiction 

        console.log(change)

        const countPeople = parseInt(change.adultos) + parseInt(change.niños) +parseInt(change.infantes) 

        const PriceDay =  countPeople * ResultDay

        const findHabitacion =  habi?.find(index => index.ID ==change.habitaciones)

        const findCanalReserva = chanel?.query?.find(index => index.ID ==parseInt(change.canal_reserva))

        const findRoom = room?.find(index => index.id_tipoHabitacion == fecha)
     
        const resultFindRoom =  formatter.format(findRoom?.precio)

        console.log({"rere":change.habitaciones})

        const resultValuepeople =formatter.format(4000)

        const resultValueAdicional = formatter.format(findRoom?.precio_persona)
        
        const resultpricePeople =  PriceDay *4000 + count - change.abono

        const resultsPricePeople =  formatter.format(resultpricePeople)

        const resultAbono = formatter.format(change.abono)
        
        const ObservationAll = " Canal de Reserva: "+ findCanalReserva?.Nombre +" ,Tipo de Habitacion:  "+findHabitacion?.nombre+" ,Numero de  Ocupantes: "+ countPeople +" ,Valor por noche: " + resultFindRoom +" ,Noches: "+ResultDay+ " ,Suma alojamiento: "+resultsPricePeople

        let prueba

        console.log(resultFindRoom)

        useEffect(() =>{
            setDefaultobs(ObservationAll)
        },[ObservationAll])

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

        if(change.habitaciones){
            for(let e =0;e<r.length;e++){
                if(r[e]+1 <= min){
                    persona +=1
                }else if(r[e]+1 >max){
                    console.log("nada")
                }else if(r[e]+1 == max){
                    aditional+=1
                }else if(r[e]+1 >min){
                    aditional+=1
                }
            }
        }

        const resultValuePersona = findRoom?.precio_persona * aditional *  ResultDay

        const totalResultglobal =  PriceDay *4000 + count - change.abono + resultValuePersona

        const valor_habiatcion =  PriceDay *4000 + count  + resultValuePersona

        const global  = formatter.format(totalResultglobal)

        const value_habitacion = formatter.format(valor_habiatcion)

        const [variant, setVariant] = React.useState('soft');   
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

        console.log({"verdades":huespe.length>1})

        const handleRemove = (index) => {
            if (huespe.length !== 1) {
              const values = [...huespe.filter((e,i) => i !==index)]
              setHuespe(values)
            }
          }

        console.log(huespe)
        

        const total = parseInt(change.adultos) + parseInt(change.niños) +parseInt(change.infantes)

        if(total){
            
            for(let i =0;i<total.lentgh;i++){
                const min = findRoom?.persona
                const max = findRoom?.max_persona
                
            }

        }else{
            console.log(false)
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
                console.log("no entro")
            }else{
                setValid(true)
            }
        }

        if(valid){
            setLoadingReservation({loading:true})
            ServiceAvaiblereservation({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones,disponibilidad:dataAvaible.disponibilidad,id_estados_habitaciones:0,ID_Canal:change.canal_reserva,Adultos:change.adultos,Ninos:change.niños,ID_Talla_mascota:change.talla_perro,Infantes:change.infantes,Noches:ResultDay,huespe,Observacion:ObservationAll,valor:global,ID_Tipo_Forma_pago:change.ID_Tipo_Forma_pago,abono:resultAbono,valor_habitacion:value_habitacion,Tipo_persona:tipoPersonas}).then(index =>{
                setTimeout(() => {
                    setLoadingReservation({loading:false}) 
                }, 5000);
                window.location.href="/Home"
            }).catch(e =>{
                setLoadingReservation({error:true})
                console.log(e)
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



        if(!room)  return null  

    return (
        <div >
        <div className="" >
                    <div className="" >
                        <div className="contain" >
                            <div className="handclose" onClick={handAll}>
                            
                            </div>
                                    <div>
                                        <div className="contain-board" >
                                        <div className="contain-board-one" >
                                        <div className="title-modal-dashboard" >

                                        <LoadingDetail      error={loadingPersona.error}  
                                                            title="Error maximo de personas" />
                                        <LoadingDetail      error={loadingPersona.habitacion}  
                                                            title="Por favor es obligfatorio el tipo de Habitacion" />

                                        <LoadingDetail      error={loadingReservation.error}  
                                                            title="Completa todos los campos por favor" />
                                    
                                        <LoadingDetail  
                                                        loading={true}
                                                        titleLoading={"Bienvenido a Creacion de Reserva"}  />

                                         <LoadingDetail     error={loadinghabilitada.error}  
                                                            title="la habitacion no esta habilidata" />
                                        <LoadingDetail  
                                                        loading={loadinghabilitada.loading}
                                                        titleLoading={"la habitacion esta habilitadad"}  />

                                        </div>
                                        <ul className="flex-bedrooms">
                                            <Input  title="Fecha desde"  
                                                    type="date" 
                                                    name="desde" 
                                                    change={handleFechaOne}
                                                    value={fechaOne} />
                                            <Input  title="Fecha hasta" 
                                                    type="date" 
                                                    name="hasta" 
                                                    value={fechaTwo}
                                                    change={handleFechaTwo} />
                                            <Selected 
                                                    title="Tipo de habitacion" 
                                                    state={habi} 
                                                    name="habitaciones" 
                                                    value={fecha}
                                                    change={handleChange} />
                                        </ul>

                                        <ul className="container-button-dasboard" >
                                            <li>
                                                <button className="button-dasboard-one-one" onClick={handClick}  >
                                                        {!loadingAvaible.loading && <span>Validar</span>}
                                                        {Loader()}
                                                </button>
                                            </li> 
                                        </ul> 
                                            
                                <div>
                                        
                                    <ul className="flex-bedrooms">
                                            <li>
                                                <label className="title-stores" >Asignar Habitacion</label>
                                                <select onChange={handAsignar}  
                                                        value={asignar}
                                                        name="disponibilidad"
                                                        className='select-hotel-type-rooms'>
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

                                    {to ? 
                                    <li>
                                            <label className="title-stores">Adultos</label>
                                            <input  className="input-stores-personality " 
                                                    name="adultos" 
                                                    type="number" 
                                                    onChange={handleInputChange}
                                                    placeholder="0" 
                                                    defaultValue={0}
                                                    />
                                        </li>
                                     : null }

                                    {to ? 
                                        <li>
                                            <label className="title-stores">Niños</label>
                                            <input  className="input-stores-personality"
                                                    name="niños" 
                                                    type="number" 
                                                    onChange={handleInputChange}
                                                    placeholder="0"
                                                    defaultValue={0}
                                                    />
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
                                                <button className="button-dasboard-thre "   >
                                                        <span>{resultFindRoom =="COPNaN" ?"" :resultFindRoom }</span> 
                                                </button>
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
                                                <button className="button-dasboard-thre "   >
                                                        <span>COP 0  </span> 
                                                </button>
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
                                                
                                                    cols="142" 
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
                                                        <button className="button-dasboard-sevent-two"  >
                                                        <span>Comprobante</span>
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

export default NoCheckingOrganism