import React, { useContext, useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { ServiceReservas } from "../../page-resesion/Dashboard/dummy_data";
import {useHistory} from "react-router-dom"
import { useSelector } from "react-redux";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import moment from "moment/moment";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import LoadingDetail from "../../Ui/LoadingDetail";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import ServiceUpdateReservationpay from "../../service/ServiceUpdatereservationpay";
import { CiCirclePlus,CiCircleRemove } from "react-icons/ci";
import ServiceAddHuespedes from "../../service/ServiceAddHuespedes";
import { config } from "../../config";

const DetailChekingOrganism =({id}) =>{
    const history = useHistory()
    const [state,setState] =useState(true)
    const [search,setSearch] =useState("")
    const [reservas,SetReservas] =useState()
    const [preReservas,SetPresewrvas]=useState()
    const {getDetailReservationById} = useDetailDashboardAction()
    const {loading,error,DetailDashboard} = useSelector((state) => state.DetailDashboard)
    const [tipoDocumento,setTipoDocumento] =useState()
    const [room,setRoom] =useState()
    const [loadingUpdate,setLoadingUpdate] =useState(false)
    const  {jwt} = useContext(AutoProvider)
    const [quyery,setQuery] =useState()
    const [stateButton,setStateButton] =useState(false)
    const [documnet,setDocument] = useState()
    const [country,setCountry] =useState()
    
    useEffect(() =>{
        fetch(`${config.serverRoute}/api/resecion/getdetailchecking/${id}`)
        .then(resp => resp.json())
        .then(data=> setQuery(data.query))
    },[])

    const [change,setChange] =useState({
        ID_Tipo_Forma_pago:null,
    })

    const  resulDetailDashboard = DetailDashboard[0]
    const findPersona =  resulDetailDashboard?.tipo_persona == "persona"
    const findEmpresa = resulDetailDashboard?.tipo_persona =="empresa"
   
    const [tipoPersonas,setTipoPersona] =useState()
    const [isChecked, setIsChecked] = useState(findPersona);
    const [isChecke, setIsChecke] = useState(findEmpresa);
    const [adultos,setAdultos] =useState()
    const [ninos,setNinos] = useState()
    const [infantes,setInfantes] =useState()
    const [valid,setValid] =useState(true)
    
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

    const handState =() =>{
       history.push(`/checkingediatar/${id}`)
    }

    const init  =   moment(resulDetailDashboard?.Fecha_inicio).utc().format('MM/DD/YYYY')
    const fin = moment(resulDetailDashboard?.Fecha_final).utc().format('MM/DD/YYYY')

    const i = moment(resulDetailDashboard?.Fecha_inicio).utc().format('YYYY/MM/DD')
    const f = moment(resulDetailDashboard?.Fecha_final).utc().format('YYYY/MM/DD')
    const n = moment(resulDetailDashboard?.Fecha_nacimiento).utc().format('YYYY/MM/DD')

    var fechaInicio =  new Date(init).getTime() 
    var fechaFin    = new Date(fin).getTime() 

    var diff = fechaFin - fechaInicio  
    
    const day =diff/(1000*60*60*24)

    useEffect(() =>{
		ServiceReservas({id:jwt.result.id_hotel}).then(index=> {
			SetPresewrvas(index)
            setSearch(index)
		})
	},[setSearch])
    
    const handChangeSearch =(e) =>{
        setSearch(e.target.value)
    }

        const fetchData =async() =>{
        await getDetailReservationById({id})
        }

        useEffect(() =>{
        fetchData()
        },[id])

        

        useEffect(() =>{
            ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
                setRoom(index)
            })
          fetch("https://grupohoteles.co/api/getTipeDocument")
          .then(index =>index.json())
          .then(data => setTipoDocumento(data))
      },[id])

      const resultFinish = room?.find(index=>index?.id_tipoHabitacion == resulDetailDashboard?.ID_Tipo_habitaciones)

      const people = parseInt(resultFinish?.max_persona)
      const handAdd =() =>{
        if(quyery.length == people){
                setStateButton(false)
        
        }else if( huespe.length+1 == people){
            handClickButton()
        }
        else{
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

    const handClickButton =() =>{
        setStateButton(true)
    }

    const item  = state ? <span>Editar Huespedes</span> : <span>guardar</span>

      const hanClickingn2 =() =>{
        if(change.ID_Tipo_Forma_pago== null){
            setLoadingUpdate(true)
        }else{
            history.push(`/checkingin2/${id}`)
            handUpdateConfirms()
            handPay()
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

        const handleInputChange =(event) =>{
            setChange({
                ...change,
                [event.target.name]:event.target.value
            })
        }
    let dataOne = {
        ID_Tipo_Forma_pago:change.ID_Tipo_Forma_pago
    }

   
    const handUpdateConfirms =() =>{
        ServiceUpdateReservationpay({id,dataOne}).then(index  =>{
            console.log(index)
        }).catch(e =>{
            console.log(e)
        }) 
    }

    let data ={
        Adultos:adultos,
        Ninos:ninos,
        infantes:infantes
    }


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

    useEffect(() =>{
        fetch("https://grupohoteles.co/api/getTipeDocument")
        .then(res => res.json())
        .then(data => setDocument(data))
    },[]) 
    
    useEffect(() =>{
       
        fetch( `${config.serverRoute}/api/resecion/getcountry`)
        .then(resp => resp.json())
        .then(data=> setCountry(data))
    },[])

    const e = parseInt(resulDetailDashboard?.Adultos) +  parseInt(resulDetailDashboard?.Infantes)+ parseInt(resulDetailDashboard?.Ninos)

    const  min = parseInt(resultFinish?.persona)

    const max = parseInt(resultFinish?.max_persona)

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
            console.log("nada")
        }else if(r[e]+1 == max){
            aditional+=1
        }else if(r[e]+1 >min){
            aditional+=1
        }
    }
    
    const PriceDay =  e * day

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',  
        currency: 'COP',
        minimumFractionDigits: 0
    })
   
    const valort = resulDetailDashboard?.valor_abono 
    const quitart = valort?.slice(4)
    const numEnterot = parseInt(quitart)
    const addt = "000"
    const numt  = numEnterot + addt
    const convertirFinisht = parseInt(numt)
    const resultValuePersona = resultFinish?.precio_persona * aditional *  day
    const count = resultFinish?.precio * day
    const totalResultglobal =  PriceDay *4000 + count -convertirFinisht+ resultValuePersona
    const total = formatter.format(totalResultglobal)

    let dataPay ={
        Valor:total
    }

    const handClickReservation =() =>{
        ServiceAddHuespedes({id,huespe,data,dataPay}).then(index =>{
            window.location.href =`/detailchecking/${id}`
        }).catch(e =>{
            console.log(e)
        }) 
    }
    
    const tota = resulDetailDashboard?.valor_habitacion
    const quitarone = tota?.slice(4)
    const numEnteroOne = parseInt(quitarone)
    const addone = "000"
    const numOne  = numEnteroOne + addone
    const convertirFinishOne = parseInt(numOne) - convertirFinisht

    const finishValor = formatter.format(convertirFinishOne)

    const handPay =() =>{
        ServiceUpdateReservationpay({id,dataOne:dataPay}).then(index =>{
            console.log(index)
        }).catch(e =>{
            console.log(e)
        })
    }


    console.log(quyery)
  
    if(!resultFinish) return null
        return (
            <>
            <div className="container-flex-init-global" >

                            <LoadingDetail
                                        loading={true}
                                        titleLoading={"Checking"}  />
                              <LoadingDetail
                                        error={loadingUpdate}
                                        title={"Tienes que confirmar medio de pago"}  />

                    <div className="container-detail-dasboard-in-one" >
                        <div className="border-detail" >
                            <span> noches {day}  </span>
                        </div>

                        <div className="border-detail" >
                            <span>{resulDetailDashboard?.valor_habitacion}</span>
                        </div>

                        <div className="border-detail" >
                            <span>{resultFinish?.nombre}</span>
                        </div>
                        <div className="border-detail" >
                            <span>{resulDetailDashboard?.forma_pago}</span>
                        </div>
                        <div className="border-detail" >
                            <span>Abono {resulDetailDashboard?.valor_abono} </span>
                        </div>
                    </div>
                </div>
                    <div  className="container-flex-init-global" >
                        <div className="container-detail-dasboard-in" >
                        <input type="text" className="desde-detail" defaultValue={i}   />
                        <input type="text" className="desde-detail" name="Fecha" defaultValue={f}   />
                        <h2 className="cod-reserva" ><span className="title-code" >COD:</span> X14A-{resulDetailDashboard?.Num_documento}</h2>
                    </div>
                </div>
                <div>
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
                                className="desde-detail-two-one"  
                                placeholder="Adultos" 
                                name="Adultos"
                                onChange={(e) =>setAdultos(e.target.value)}
                                defaultValue={resulDetailDashboard?.Adultos}
                                />  
                        
                            <input type="text" 
                                className="desde-detail-two-one" 
                                name="Fecha" 
                                placeholder="Niños"  
                                onChange={(e) =>setNinos(e.target.value)}
                                defaultValue={resulDetailDashboard?.Ninos}
                                />

                            <input  type="text" 
                                    className="desde-detail-three-one" 
                                    name="Infantes"
                                    placeholder="Infantes"  
                                    onChange={(e) =>setInfantes(e.target.value)}
                                    defaultValue={resulDetailDashboard?.Infantes}
                                    />

                            <input  type="text" 
                                    className="desde-detail-three-one" 
                                    name="Mascotas" 
                                    placeholder="Mascotas"   
                                    defaultValue={resulDetailDashboard?.Talla}
                                    />

                            <input  type="text" 
                                    className="desde-detail-two-one" 
                                    name="Fecha"  
                                    placeholder="Mascotas" 
                                    defaultValue={resulDetailDashboard?.Ciudad}   
                                    />
                        </div>
                    </form>

                    {quyery?.map(index => {

                        const find  = tipoDocumento?.find(item=> parseInt(item?.ID) == index?.ID_Tipo_documento )
                        const nacimiento = moment(index?.Fecha_nacimiento).utc().format('YYYY/MM/DD')
                        return (
                
                        <form className="container-flex-init init ono" >
                        <div className="container-detail-dasboard-in" > 
                            <span className="desde-detail-three-das" > Nombre</span>
                            <span className="desde-detail-three-das" >Apellido </span>
                            <span className="desde-detail-two-das" >Tipo de Documento</span>    
                            <span  className="desde-detail-three-das">No documento</span>
                        </div>
                            <div className="container-detail-dasboard-in" >
                                <input  type="text" 
                                        className="desde-detail-three"  
                                        placeholder="Nombre" 
                                        defaultValue={index.Nombre}
                                        readOnly={state}
                                        />

                                <input  type="text" 
                                        className="desde-detail-three" 
                                        name="Apellido"  
                                        placeholder="Apellido" 
                                        defaultValue={index.Apellido}
                                        readOnly={state}
                                        />

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        placeholder="Tipo de documento"
                                        name="Fecha" 
                                        defaultValue={find?.nombre}
                                        readOnly={state}
                                        />

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        name="Fecha" 
                                        placeholder="No Documento"  
                                        defaultValue={index.Num_documento}
                                        readOnly={state}
                                        />
                            </div>

                            <div className="container-detail-dasboard-in" > 
                            <span className="desde-detail-three-das" > Fecha Nacimiento </span>
                            <span className="desde-detail-three-das" >Nacionalidad </span>
                            <span className="desde-detail-two-das" >Correo electronico</span>    
                            <span  className="desde-detail-three-das">Celular</span>
                        </div>

                            <div className="container-detail-dasboard-in" >
                                <input  type="text" 
                                        className="desde-detail-three" 
                                        placeholder="Fecha Nacimiento"
                                        defaultValue={nacimiento}
                                        readOnly={state}
                                        />

                                <input  type="text" 
                                        className="desde-detail-three"
                                        name="Fecha" 
                                        placeholder="Nacionalidad"  
                                        defaultValue={index.nombre} 
                                        readOnly={state}
                                        />

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        name="Correo" 
                                        placeholder="Correo  electronico"  
                                        defaultValue={index.Correo}
                                        readOnly={state}
                                        />

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        name="Celular"  
                                        placeholder="Celular"  
                                        defaultValue={index.Celular}
                                        readOnly={state}
                                        />
                            </div>
                    </form>
                    ) })}
                    
                    {stateButton && huespe?.map((item, index) =>(
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
                                            onChange={(event) =>  handleInpuHuespe(event, index)}
                                            required  />

                                <input  type="text" 
                                        className="desde-detail-three" 
                                        name="Apellido"  
                                        placeholder="Apellido" 
                                        value={item.Apellido} 
                                        onChange={(event) =>  handleInpuHuespe(event, index)}
                                        required  />
                                     

                                     <select  onChange={(event) =>  handleInpuHuespe(event, index)} 
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
                                        placeholder=""  
                                        value={item.Num_documento} 
                                        onChange={(event) =>  handleInpuHuespe(event, index)} 
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
                                        onChange={(event) =>  handleInpuHuespe(event, index)} 
                                        required />

                                        <select  onChange={(event) =>  handleInpuHuespe(event, index)} 
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
                                        onChange={(event) =>  handleInpuHuespe(event, index)}  
                                        required/>

                                <input  type="number" 
                                        className="desde-detail-two" 
                                        name="Celular"  
                                        placeholder="Celular"  
                                        value={item.Celular} 
                                        onChange={(event) =>  handleInpuHuespe(event, index)}
                                        required  />
                                        
                            </div>

                            <div className="container-detail-dasboard-in" > 
                            <span className="desde-detail-three-das" >Ciudad </span>
                        </div>

                            <div className="container-detail-dasboard-in" >
                                <input  type="text" 
                                        className="desde-detail-two" 
                                        name="Ciudad"  
                                        placeholder="Ciudad"   
                                        value={item.Ciudad} 
                                        onChange={(event) =>  handleInpuHuespe(event, index)}
                                        required  />
                            </div>
                    </form>
                    ))}
                    {stateButton &&<div className="container-flex-init-one" >
                        <button className="button-dasboard-six-one-one-one"  onClick={handClickReservation}  >
                            <span>  Guardar Personas Añadidas </span> 
                        </button>
                    </div>
                    }
                </div>

                    <div className="container-flex-init-one" >
                        

                            <div className="container-checkbox" >
                            <input   type="checkbox" 
                                        className={`checkbox-round  ${findPersona && "checkbox-round-click"} `}
                                        onChange={handleOnChange}
                                        checked={isChecked}/> Persona
                                
                            </div> 

                        <div className="container-checkbox" >
                        <input   type="checkbox" 
                                        className={`checkbox-round  ${findEmpresa && "checkbox-round-click"} `}
                                        onChange={handleOnChanger}
                                        readOnly={true}
                                        checked={isChecked}/> Empresa
                        </div> 

                        <div>
                            <button className="button-checking-detail-one-das" > <span> 
                                <select onChange={handleInputChange}  
                                            required
                                            name="ID_Tipo_Forma_pago"
                                            className='select-hotel-type-rooms-finis-dasboard-finish-one'>
                                        <option>Medio de pago</option>
                                        {typy_buy?.map(category =>(
                                            <option 
                                            value={category.id}   
                                            key={category}
                                        >
                                            {category.name}
                                        </option>
                                        )
                                        )}
                                    </select>   </span></button>
                        </div>

                            <button className="button-dasboard-six-one-one-one"  onClick={handAdd}   >
                                <CiCirclePlus fontSize={30}  /> <span>  Añadir personas  </span> 
                            </button>
               
                        
                        <div>
                            <button className="button-checking-detail-one-one" onClick={handState}  > <span>{item}</span></button>
                        </div> 
                        <div>
                            <button className="button-checking-detail"   onClick={hanClickingn2} >
                                <span className="title-button"   >Continuar</span>
                            </button>
                        </div> 
                </div>

                <div className="container-flex-init-one" >  
                <textarea    
                        rows="10"                                         
                        cols="142" 
                        placeholder="Observacion" 
                        name="observacion"
                        readOnly={state}
                        defaultValue={resulDetailDashboard?.Observacion}
                        className="obs" ></textarea>  
                </div>
            </>
        )

}

export default DetailChekingOrganism