
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../../Ui/Container";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import moment from "moment";
import ServiceUpdatePersonas from "../../service/ServiceUpdatePersonas";
import LoadingDetail from "../../Ui/LoadingDetail";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import { config } from "../../config";
import ServiceUpdateReservation from "../../service/ServiceUpdatereservation";
import UseDocument from "../../hooks/useDocument";

const ReservasUpdate =(props) =>{
    const {DetailDashboard,fetchData} = props
    const {id} =useParams()

    const [nombre,setNombre] =useState()
    const [apellido,setApellido] =useState()
    const [document,setDocumento] =useState()
    const [nacimiento,setNacimiento] =useState()
    const [correo,setCorreo] =useState()
    const [celular,setCelular] =useState()
    const [loading,setLoading] =useState(false)
    const [nacionalidad,setNacionalidad] =useState()
    const [typeDocument,setypeDocument] = useState() 
    const [country,setCountry] =useState()
    const {jwt} = useContext(AutoProvider)
    const  documentUse = UseDocument()

    const resultDasboard =  DetailDashboard[0]

    const init  =moment(resultDasboard?.Fecha_inicio).utc().format('MM/DD/YYYY')
    const fin = moment(resultDasboard?.Fecha_final).utc().format('MM/DD/YYYY')

    var fechaInicio =  new Date(init).getTime() 
    var fechaFin    = new Date(fin).getTime() 

    var diff = fechaFin - fechaInicio  
    
    const day =diff/(1000*60*60*24)

    const docu = documentUse.document?.find(index =>  index?.ID == resultDasboard?.ID_Tipo_documento)
    
   

    console.log(docu)
  
    const i = moment(resultDasboard?.Fecha_inicio).utc().format('YYYY/MM/DD')
    const f = moment(resultDasboard?.Fecha_final).utc().format('YYYY/MM/DD')
    const n = moment(resultDasboard?.Fecha_nacimiento).utc().format('YYYY/MM/DD')
    
    useEffect(() =>{
        
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
    ServiceUpdateReservation({id,data}).then(index =>{
        console.log(index)
        window.location.reload()
        }).catch(e =>{
        console.log(e)
    })
  }


    return (
        <>
            <div className="container-flex-init-global"  >
            <LoadingDetail loading={loading}  titleLoading="guardado correctame"/>
            <LoadingDetail loading={true}  titleLoading="Editar personas"/>
            <div className="container-detail-dasboard-in-one" >
          </div>

            <div  className="" >
                <div className="container-detail-dasboard-in" >
                <input type="text" className="desde-detail" readOnly={true} defaultValue={i} />
                <input type="text" className="desde-detail" readOnly={true} name="Fecha"  defaultValue={f}  />
                <h2 className="cod-reserva" ><span className="title-code" >COD:</span> X14A-</h2>
            </div>
            </div>

                        <div className=" one-detail" >
                    
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
                                            defaultValue={resultDasboard?.Nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            />

                                    <input  type="text" 
                                            className="desde-detail-three" 
                                            name="Apellido"  
                                            placeholder="Apellido" 
                                            defaultValue={resultDasboard?.Apellido}
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
                                            defaultValue={resultDasboard?.Num_documento}
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
                                                                        defaultValue={resultDasboard?.nacionalidad}
                                                                        className="desde-detail-three">
                                                                    <option >{resultDasboard?.nacionalidad}</option>
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
                        defaultValue={resultDasboard?.Correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        />

                <input  type="text" 
                        className="desde-detail-two" 
                        name="Celular"  
                        placeholder="Celular"  
                        defaultValue={resultDasboard?.Celular}
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

export default ReservasUpdate