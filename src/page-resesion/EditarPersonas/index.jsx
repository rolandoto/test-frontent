import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../../Ui/Container";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import moment from "moment";
import ServiceUpdatePersonas from "../../service/ServiceUpdatePersonas";
import LoadingDetail from "../../Ui/LoadingDetail";

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


    const resulrEditar = state?.find(index => index.id_persona ==id)

    const docu = tipoDocumento?.find(index =>  index?.ID == resulrEditar?.ID_Tipo_documento)

    const resultFinish = room?.find(index=>index?.id_tipoHabitacion == state?.ID_Tipo_habitaciones)

    const n = moment(resulrEditar?.Fecha_nacimiento).utc().format('YYYY/MM/DD')
    
    useEffect(() =>{
        fetch(`http://localhost:4000/api/resecion/getdetailhuespedes/${id}`)    
        .then(index => index.json())
        .then(data  => setSatate(data.link))
    },[])
    
    const fetchData =async() =>{
        fetch("https://grupohoteles.co/api/getTipeDocument")
        .then(index =>index.json())
        .then(data => setTipoDocumento(data))
    }
    
    useEffect(() =>{
        ServicetypeRooms({id:4}).then(index =>{
            setRoom(index)
        })
      fetch("https://grupohoteles.co/api/getTipeDocument")
      .then(index =>index.json())
      .then(data => setTipoDocumento(data))
  },[])


  let data  ={
        Num_documento:document,
        Nombre:nombre,
        Apellido:apellido,
        Fecha_nacimiento:nacimiento,
        Correo:correo,
        Celular:celular
  }

  const handClick =() =>{
    ServiceUpdatePersonas({id,data}).then(index=> {
        setLoading(true)
    }).catch(e =>{
        console.log(e)
    })
  }

    
  if(!docu) return null
  
    return (
        <Container>
             <LoadingDetail loading={loading}  titleLoading="guardado correctame"/>
                 <div className="init" >
               
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
                                defaultValue={resulrEditar?.nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                />

                        <input  type="text" 
                                className="desde-detail-three" 
                                name="Apellido"  
                                placeholder="Apellido" 
                                defaultValue={resulrEditar?.Apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                 />

                        <input  type="text" 
                                className="desde-detail-two" 
                                placeholder="Tipo de documento"
                                name="Fecha" 
                                readOnly={true}
                                defaultValue={docu?.nombre}
                                
                                   />

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
      <span  className="desde-detail-three-das">Celular</span>
  </div>

      <div className="container-detail-dasboard-in" >
        <input  type="text" 
                className="desde-detail-three" 
                placeholder="Fecha Nacimiento"
              
                onChange={(e) => setNacimiento(e.target.value)}
                defaultValue={n}
                   />

        <input  type="text" 
                className="desde-detail-three"
                name="Fecha" 
                placeholder="Nacionalidad"   
                defaultValue={resulrEditar?.nacionalidad}
                readOnly={true}
                />

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
                <button className="button-checking-detail-one-das-one" onClick={handClick} > <span> Editar </span></button>
            </div>

            </div>
        </div>
        </Container>
    )

}

export default EditarPersonas