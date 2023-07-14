import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../../Ui/Container";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import moment from "moment";
import ServiceUpdatePersonas from "../../service/ServiceUpdatePersonas";
import LoadingDetail from "../../Ui/LoadingDetail";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import { config } from "../../config";
import UseDocument from "../../hooks/useDocument";

const EditarPersonas =() =>{
    const history =useHistory()
    const {id} =useParams()
    const [state,setSatate] =useState()
    const [room,setRoom] =useState()
    const [tipoDocumento,setTipoDocumento] =useState()
    const [nombre,setNombre] =useState()
    const [apellido,setApellido] =useState()
    const [document,setDocumento] =useState()
    const [nacimiento,setNacimiento] =useState()
    const [correo,setCorreo] =useState()
    const [celular,setCelular] =useState()
    const [loading,setLoading] =useState(false)
    const [nacionalidad,setNacionalidad] =useState()
    const [country,setCountry] =useState()
    const [typeDocument,setypeDocument] = useState() 
    const {jwt} = useContext(AutoProvider)
    const  documentUse = UseDocument()

    const resulrEditar = state?.find(index => index.huespedes ==id)

    const init  =   moment(resulrEditar?.Fecha_inicio).utc().format('MM/DD/YYYY')
    const fin = moment(resulrEditar?.Fecha_final).utc().format('MM/DD/YYYY')

    var fechaInicio =  new Date(init).getTime() 
    var fechaFin    = new Date(fin).getTime() 

    var diff = fechaFin - fechaInicio  
    
    const day =diff/(1000*60*60*24)

    const docu = documentUse.document?.find(index =>  index?.ID == resulrEditar?.ID_Tipo_documento)

    const resultFinish = room?.find(index=>index?.id_tipoHabitacion == state?.ID_Tipo_habitaciones)

    const i = moment(resulrEditar?.Fecha_inicio).utc().format('YYYY/MM/DD')
    const f = moment(resulrEditar?.Fecha_final).utc().format('YYYY/MM/DD')
    const n = moment(resulrEditar?.Fecha_nacimiento).utc().format('YYYY/MM/DD')
    
    useEffect(() =>{
        fetch(`${config.serverRoute}/api/resecion/getdetailhuespedes/${id}`)    
        .then(index => index.json())
        .then(data  => setSatate(data.link))
    },[])
    
    const fetchData =async() =>{
        fetch("https://grupohoteles.co/api/getTipeDocument")
        .then(index =>index.json())
        .then(data => setTipoDocumento(data))
    }
    
    useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setRoom(index)
        })
      fetch(`${config.serverRoute}/api/resecion/getcountry`)
            .then(resp => resp.json())
            .then(data=> setCountry(data))
  },[])


  let data  ={
        Num_documento:document,
        Nombre:nombre,
        Apellido:apellido,
        Fecha_nacimiento:nacimiento,
        Correo:correo,
        Celular:celular,
        ID_Prefijo:nacionalidad,
        ID_Tipo_documento:typeDocument
  }

  const handClick =() =>{
    ServiceUpdatePersonas({id,data}).then(index=> {
        setLoading(true)
    }).catch(e =>{
        console.log(e)
    })
  }

  const habitacion = room?.find(index=>index?.id_tipoHabitacion == resulrEditar?.ID_Tipo_habitaciones)

  if(!docu) return null

  
    return (
        <>
                <div className="container-flex-init-global"  >

                <LoadingDetail loading={loading}  titleLoading="guardado correctame"/>
                <LoadingDetail loading={true}  titleLoading="Editar personas"/>

                <div className="container-detail-dasboard-in-one" >
                <div className="border-detail" >
                    <span>{day} noches</span>
                </div>

                <div className="border-detail" >
                    <span>{resulrEditar?.Valor_habitacion}</span>
                </div>

                <div className="border-detail" >
                    <span>{habitacion?.nombre}</span>
                </div>

                <div className="border-detail" >
                    <span>{resulrEditar?.nombre_pago}</span>
                </div>
                <div className="border-detail" >
                    <span>Abono {resulrEditar?.Abono} </span>
                </div>
            </div>

                <div  className="container-flex-init-global" >
                    <div className="container-detail-dasboard-in" >
                    <input type="text" className="desde-detail" readOnly={true} defaultValue={i} />
                    <input type="text" className="desde-detail" readOnly={true} name="Fecha"  defaultValue={f}  />
                    <h2 className="cod-reserva" ><span className="title-code" >COD:</span> X14A-</h2>
                </div>
                </div>

                            <div className="init one-detail" >
                        
                                <form className="container-flex-init" >

                                <div className="container-detail-dasboard-in" > 
                                    <span className="desde-detail-three-das" > Nombre </span>
                                    <span className="desde-detail-three-das" >Apellido </span>
                                    <span className="desde-detail-two-das" >Tipo de Documento</span>    
                                    <span  className="desde-detail-three-das">No documento</span>
                                </div>
                                        <div className="container-detail-dasboard-in" >
                                        <input  type="text" 
                                                className="desde-detail-three"  
                                                placeholder="Nombre" 
                                                defaultValue={resulrEditar?.Nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                />

                                        <input  type="text" 
                                                className="desde-detail-three" 
                                                name="Apellido"  
                                                placeholder="Apellido" 
                                                defaultValue={resulrEditar?.Apellido}
                                                onChange={(e) => setApellido(e.target.value)}
                                                />

<select  type="text" 
                                            className="desde-detail-two" 
                                            placeholder="Tipo de documento"
                                            name="Fecha"
                                            onChange={(e) => setypeDocument(e.target.value)}
                                            defaultValue={docu?.nombre}
                                            
                                    >
                                        <option >{docu?.nombre}</option>
                                                                    {documentUse?.document?.map(category =>(
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
                                                name="Fecha" 
                                                placeholder="No Documento"  
                                                onChange={(e) => setDocumento(e.target.value)}
                                                defaultValue={resulrEditar?.Num_documento}
                                                />
                                    </div>
                                </form>
                            <form className="container-flex-init" >

                
                <div className="container-detail-dasboard-in" > 
                    <span className="desde-detail-three-das" > Fecha Nacimiento </span>
                    <span className="desde-detail-three-das" >Nacionalidad </span>
                    <span className="desde-detail-two-das" >Correo electronico</span>    
                    <span  className="desde-detail-three-das">Celular /sin indicativo</span>
                </div>

                <div className="container-detail-dasboard-in" >
                    <input  type="text" 
                            className="desde-detail-three" 
                            placeholder="Fecha Nacimiento"
                        
                            onChange={(e) => setNacimiento(e.target.value)}
                            defaultValue={n}
                            />

                
                                                                <select required  onChange={(e) => setNacionalidad(e.target.value)} 
                                                                            name={"Nacionalidad"}
                                                                            defaultValue={resulrEditar?.nacionalidad}
                                                                            className="desde-detail-three">
                                                                        <option >{resulrEditar?.nombre}</option>
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
                            defaultValue={resulrEditar?.Correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            />

                    <input  type="text" 
                            className="desde-detail-two" 
                            name="Celular"  
                            placeholder="Celular"  
                            defaultValue={resulrEditar?.Celular}
                            onChange={(e) => setCelular(e.target.value)}
                            />
                </div>
            </form>

            <div className="container-flex-init-one" >
                        

                        <div>
                            <button className="button-checking-detail-one-das-one" onClick={handClick} > <span> Guardar </span></button>
                        </div>

                        </div>
                    </div>

            </div>
        </>
    )

}

export default EditarPersonas