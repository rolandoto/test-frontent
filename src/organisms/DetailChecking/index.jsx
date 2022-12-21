import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { ServiceReservas } from "../../page-resesion/Dashboard/dummy_data";
import {useHistory} from "react-router-dom"
import { useSelector } from "react-redux";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import moment from "moment/moment";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import LoadingDetail from "../../Ui/LoadingDetail";

const DetailChekingOrganism =({id}) =>{
    const [state,setState] =useState(true)
    const [search,setSearch] =useState("")
    const [reservas,SetReservas] =useState()
    const [preReservas,SetPresewrvas]=useState()
    const {getDetailReservationById} = useDetailDashboardAction()
    const {loading,error,DetailDashboard} = useSelector((state) => state.DetailDashboard)
    const [tipoDocumento,setTipoDocumento] =useState()
    const [room,setRoom] =useState()


    const  resulDetailDashboard = DetailDashboard[0]
    console.log(DetailDashboard)
    const findPersona =  resulDetailDashboard?.tipo_persona == "persona"
    const findEmpresa = resulDetailDashboard?.tipo_persona =="empresa"
   
    const [tipoPersonas,setTipoPersona] =useState()
    const [isChecked, setIsChecked] = useState(findPersona);
    const [isChecke, setIsChecke] = useState(findEmpresa);

    console.log(findPersona)
    
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

    const history = useHistory()

    console.log(DetailDashboard)


    useEffect(() =>{
		ServiceReservas().then(index=> {
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
            ServicetypeRooms({id:4}).then(index =>{
                setRoom(index)
            })
          fetch("https://grupohoteles.co/api/getTipeDocument")
          .then(index =>index.json())
          .then(data => setTipoDocumento(data))
      },[])

      const resultFinish = room?.find(index=>index?.id_tipoHabitacion == resulDetailDashboard?.ID_Tipo_habitaciones)

      const item  = state ? <span>editar</span> : <span>guardar</span>
      
      if(!resultFinish) return null
        return (
            <>
            <div className="container-flex-init-global" >

                            <LoadingDetail
                                        loading={true}
                                        titleLoading={"Bienvenido  Checking Reserva"}  />

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
                <div  >
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
                                defaultValue={resulDetailDashboard?.Adultos}
                                />  
                        
                        
                            <input type="text" 
                                className="desde-detail-two-one" 
                                name="Fecha" 
                                placeholder="Niños"  
                                defaultValue={resulDetailDashboard?.Ninos}
                                />

                            <input  type="text" 
                                    className="desde-detail-three-one" 
                                    name="Infantes"
                                    placeholder="Infantes"  
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

                    {DetailDashboard.map(index => {

                        const find  = tipoDocumento?.find(item=> parseInt(item.ID) == index.ID_Tipo_documento )
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
                                        defaultValue={index.nacionalidad} 
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
                    <form className="container-flex-init" >
                    
                    </form>
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
                            <button className="button-checking-detail-one-das" > <span> Medio pago   </span></button>
                        </div>
                        
                        <div>
                            <button className="button-checking-detail-one-one" onClick={handState}  > <span>{item}</span></button>
                        </div> 
                        <div>
                            <button className="button-checking-detail"  >
                                <span className="title-button"  >Continuar</span>
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