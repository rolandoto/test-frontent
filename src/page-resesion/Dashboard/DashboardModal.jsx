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
import Box from '@mui/material/Box';

const DashboardModal = ({loading,toggleCloseDashboard}) => {

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

    
    
    const [change,setChange] =useState({
        desde:``,
        hasta:null,
        habitaciones:null,
        disponibilidad:null,
        adultos:0,
        niños:0,
        infantes:null,
        tipo_documento:null,
        numero_documento:null,
        ciudad:null,
        nombre:null,
        apellido:null,
        celular:null,
        fecha_nacimiento:null,
        correo:null,
        descuento:null,
        talla_perro:null,
        canal_reserva:null
    })

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
        [
        {
            Tipo_documento:null,
            Num_documento:null,
            Nombre:null,
            Apellido:null,
            Celular:null,
            Correo:null,
            Fecha_nacimiento:null,
            Ciudad:null
        }
    ]
    )

    console.log(huespe)

    const handleInpuHuespe =(event) =>{
        setHuespe({
            ...huespe,
            [event.target.name]:event.target.value
        })
    }

    const totalDate = parseInt(change.adultos) + parseInt(change.niños)

    let number  = parseInt(totalDate)
    console.log(number)

  
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
        fetch(`https://grupohoteles.co/api/getTypeRoomByID?id_tipo_habitacion=${change.habitaciones}`)
        .then(index =>index.json())
        .then(data => setBedroom(data))
    },[])
    useEffect(() =>{
        fetch("http://localhost:4000/api/resecion/gettypepet")
        .then(res => res.json())
        .then(data  => setPet(data))
    },[])

    useEffect(() =>{
        fetch("https://grupohoteles.co/api/getTipeDocument")
        .then(res => res.json())
        .then(data => setDocument(data))
    },[])    


    useEffect(() =>{
        fetch("http://localhost:4000/api/resecion/getcanales")
        .then(resp  => resp.json())
        .then(data =>setchanel(data))
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
        desde:`${change.desde} 15:00:00`,
        hasta:`${change.hasta} 13:00:00`,
        habitaciones:change.habitaciones,
        disponibilidad:change.disponibilidad
    }

    const handClick =() =>{
        setLoadingAvaible({loading:true})
        ServiceRoomsAviable ({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones}).then(index =>{
            setLoadingAvaible({loading:false,error:false})
            setAvaible(index)
        }).catch(e =>{
           setLoadingAvaible({error:true})
        })
    }


    const handClickReservation =() =>{
        setLoadingReservation({loading:true})
        ServiceAvaiblereservation({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones,disponibilidad:dataAvaible.disponibilidad }).then(index =>{
            setLoadingReservation({loading:false})
            window.location.reload();
        }).catch(e =>{
            setLoadingReservation({error:true})
        })
    }

    const handleInputChange =(event) =>{
        setChange({
            ...change,
            [event.target.name]:event.target.value
        })
    }


    const Loader =() =>{

        if(loadingAvaible.loading){
            return (
                <div>
                    
                    <Grid.Container gap={2}  >
                            <Grid> 
                                <Loading type="default" />
                            </Grid>
                    </Grid.Container>
        
                </div>
            )
        }
        
        return (
            <>
               
                {!loadingAvaible.error && <div>
                        <div className="title-modal-dashboard" >
                        <h1>Habitaciones Disponibles</h1>
                    </div>
                
                        <li>
                        <label className="title-stores" >Habitaciones Disponibles</label>
                        <select onChange={handleInputChange}  
                                name="disponibilidad"
                                className='select-hotel-type'
                        >
                             <option>Selecion la habiatacion</option>
                            {avaible?.queryDefinid?.map(category =>(
                                <option 
                                value={category.ID}   
                                key={category.ID}
                            >
                                {category.Numero}
                            </option>
                            )
                            )}
                        </select>
                       
                    </li>
                    </div>
                }
                </>
        )
    }

    const handAdd =() =>{
        setHuespe([
            ...huespe,
            {
                Tipo_documento:null,
                Num_documento:null,
                Nombre:null,
                Apellido:null,
                Celular:null,
                Correo:null,
                Fecha_nacimiento:null,
                Ciudad:null
            }
          ])
    }

    const total = parseInt(adultos) + parseInt(niños) 

    const handSubmitDashboard =() =>{
        console.log(change)
    }

    if(total > bedRoom?.max_persona) {
        alert("supera maximo de personas")
    }

    const handAll =() =>{
        toggleCloseDashboard()
        setPreloading(false)
    }

    const ray = [1,2,4]
    return (
        <div>
            {loading && <div className="border-ri modalNewBooking" >
                        <div className="content-Modal-dasboard" >
                            <div className="contain" >
                                <div className="handclose" onClick={handAll}>
                                    
                                   <IoMdCloseCircle fontSize={30} color="black" />
                               
                                </div>
                                   
                                        <div>

                                            <div className="contain-board" >

                                           
                                            <div className="contain-board-one" >


                                            <div className="title-modal-dashboard" >
                                                <h1>Crear Reserva</h1>
                                            </div>
                                            <ul className="flex-bedrooms">
                                                <Input  title="Fecha desde"  
                                                        type="date" 
                                                        name="desde" 
                                                        change={handleInputChange} />
                                                <Input  title="Fecha hasta" 
                                                        type="date" 
                                                        name="hasta" 
                                                        change={handleInputChange} />
                                                <Selected 
                                                        title="Tipo de habitacion" 
                                                        state={habi} 
                                                        name="habitaciones" 
                                                        change={handleInputChange} />
                                            </ul>

                                            <ul className="container-button-dasboard" >
                                                <li>
                                                    <button className="button-dasboard-one" onClick={handClick}  >
                                                        Validar
                                                    </button>
                                                </li> 
                                            </ul> 

                                            
                                            {Loader()}
                                              

                                      <div>
                                            <div className="title-modal-dashboard" >
                                                <h1>Cantidad huespedes</h1>
                                            </div>
                                        <ul className="flex-bedrooms">
                                            <li>
                                                <label className="title-stores">Adultos</label>
                                                <input className="input-stores-personality " name="Adultos" type="number" onChange={handleInputChange} />
                                            </li>

                                            <li>
                                                <label className="title-stores">Niños</label>
                                                <input className="input-stores-personality " name="niños" type="number" onChange={handleInputChange} />
                                            </li>

                                            <li>
                                                <label className="title-stores">Infantes</label>
                                                <input className="input-stores-personality " name="infantes" type="number" onChange={handleInputChange} />
                                            </li>
                                                <li>
                                                    <label className="title-stores" >Mascota</label>
                                                    <select onChange={handleInputChange}  
                                                            name={"talla_perro"}
                                                            className='select-hotel-type-personality'
                                                    >
                                                        <option >{null}</option>
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

                                                <li>
                                                    <label className="title-stores" >Canal de Reserva</label>
                                                    <select onChange={handleInputChange}  
                                                            name={"canal_reserva"}
                                                            className='select-hotel-type-personality-unica'
                                                    >
                                                        <option >{null}</option>
                                                        {chanel.query?.map(category =>(
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
                                            
                                            </ul>
                                        </div>
                                    </div>

                                    </div>



                                {huespe?.map(index => (
                                        <div className="contain-board" >
                                        <div className="contain-board-one" >
                                        <div className="title-modal-dashboard" >
                                                    <h1>Datos Basicos</h1>
                                                </div>
                                                                
                                            <ul className="flex-bedrooms">
                                            
                                            <Input  title="Nombre"  
                                                        type="text" 
                                                        name="Nombre" 
                                                        change={handleInpuHuespe} />

                                                
                                            <Input  title="Apellido "  
                                                        type="text" 
                                                        name="Apellido" 
                                                        change={handleInpuHuespe} />
                                                
                                                <li>
                                                        <label className="title-stores" >Tipo de Doc</label>
                                                        <select onChange={handleInpuHuespe}  
                                                                name={"Tipo_documento"}
                                                                className='select-hotel-type-personality'
                                                        >
                                                            <option >{null}</option>
                                                            {documnet.map(category =>(
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
                                                        <input className="input-stores-personality-one" name="Num_documento" type="text" onChange={handleInpuHuespe} />
                                                    </li>   
                                            </ul>
                                            <ul className="flex-bedrooms">
                                            <Input  title="Fecha Nacimiento"  
                                                        type="date" 
                                                        name="Fecha_nacimiento" 
                                                        change={handleInpuHuespe} />
                                                <Input  title="Ciudad Residencia"  
                                                        type="text" 
                                                        name="Ciudad" 
                                                        change={handleInpuHuespe} />
                                                    <li>
                                                        <label className="title-stores">Correo electronico</label>
                                                        <input className="input-stores-personality-two" name="Correo" type="text" onChange={handleInpuHuespe} />
                                                    </li>
                                            </ul>
                                            <ul className="flex-bedrooms">
                                                <Input  title="Celular"
                                                        name="Celular"
                                                        type="text"
                                                        change={handleInpuHuespe} />
                                            </ul>
                                    </div>
                                </div>                 


                                ))}                             

                                            <ul className="container-button-dasboard-one" >
                                                <li>
                                                    <button className="button-dasboard"  onClick={handAdd} >
                                                            <span>Agregar</span> 
                                                    </button>
                                                </li> 
                                            </ul>

                                    
                                            <ul className="container-button-dasboard-one" >
                                                <li>
                                                    <button className="button-dasboard"  onClick={handClickReservation} >
                                                    {loadingReservation.loading ? <Loading type="spinner" size="lg" />:<span>Crear Reserva</span>} 
                                                    </button>
                                                </li> 
                                            </ul>
                                            {loadingReservation.error && <span style={{color:'red'}} >Error de Credenciales</span>}
                                           
                                    </div>
                                   

                        </div>  

                        
                    </div>
                </div>}
        </div>
    )
}
export  default  DashboardModal