import React, { useEffect, useState } from "react"
import moment from "moment";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import "./style.css"
import ServiceUpdateReservation from "../../service/ServiceUpdatereservation";
import {useParams} from "react-router-dom"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingDetail from "../../Ui/LoadingDetail";
import {useHistory} from "react-router-dom"
import ServiceUpdateReservationpay from "../../service/ServiceUpdatereservationpay";
import useProgress from "../../hooks/useProgress";
import LineProgress from "../../Ui/LineProgress";

const DetailDasboard =(props) =>{
    const [state,setState] =useState(true)
    const [room,setRoom] =useState()
    const [tipoDocumento,setTipoDocumento] =useState()
    const {DetailDashboard,fetchData} = props
    const [loading,setLoading] =useState({loading:false,error:false})
    const hisotry = useHistory()
    const {id} = useParams()

    const {progress} =useProgress({id})

    const resultDashboard = DetailDashboard[0] 

    const findPersona =  resultDashboard.tipo_persona == "persona"
    const findEmpresa = resultDashboard.tipo_persona =="empresa"

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

    var fechaInicio =  new Date(init).getTime() 
    var fechaFin    = new Date(fin).getTime() 

    var diff = fechaFin - fechaInicio  
    
    const day =diff/(1000*60*60*24)

    const handChangeEdit =() =>{
      setState(!state)
      console.log("no guardar")
      setLoading({loading:false})
      
    }


    const handChangeSave =() =>{
      setState(!state)
      setLoading({loading:false})
      console.log("guardar")
      handSubmit()
      fetchData()
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

    console.log(data)

    let dataOne ={
      Abono:finisAbono,
      Valor:finishValor
    } 


    const handSubmit =() =>{
              ServiceUpdateReservation({id,data}).then(index =>{
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

    const handClickNextChecking =() =>{
      hisotry.push("/checking")
    }

   
    useEffect(() =>{
          ServicetypeRooms({id:4}).then(index =>{
              setRoom(index)
          })
        fetch("https://grupohoteles.co/api/getTipeDocument")
        .then(index =>index.json())
        .then(data => setTipoDocumento(data))
    },[])

    const docu = tipoDocumento?.find(index =>  index?.ID == resultDashboard.ID_Tipo_documento)

    const resultFinish = room?.find(index=>index?.id_tipoHabitacion == resultDashboard?.ID_Tipo_habitaciones)

    const item = state  ? <span>Editar</span> : <span>Guardar</span>
    if(progress < 100){
      return <LineProgress progress={progress} />
    }
      if(!docu) return null
      if(!resultFinish) return null
    return (
      <>
        <div className="container-flex-init-global" >
          <LoadingDetail  
                        loading={loading.loading}
                        error={loading.error}  />

        <LoadingDetail  
                        loading={true}
                        titleLoading={"Bienvenido a detalle de la reserva"}  />

          <div className="container-detail-dasboard-in-one" >
              <div className="border-detail" >
                   <span>{day} noches</span>
              </div>

              <div className="border-detail" >
                   <span>{resultDashboard?.valor_habitacion}</span>
              </div>

              <div className="border-detail" >
                   <span>{resultFinish?.nombre}</span>
              </div>

              <div className="border-detail" >
                   <span>{resultDashboard?.forma_pago}</span>
              </div>
              <div className="border-detail" >
                   <span>Abono {resultDashboard?.valor_abono}</span>
              </div>
          </div>
      </div>
        <div  className="container-flex-init-global" >
            <div className="container-detail-dasboard-in" >
              <input type="text" className="desde-detail" defaultValue={i}  readOnly={true}  />
              <input type="text" className="desde-detail" name="Fecha" defaultValue={f} readOnly={true}  onChange={handleChange("Fecha")}   />
              <h2 className="cod-reserva" ><span className="title-code" >COD:</span> X14A-{resultDashboard.Num_documento}</h2>
          </div>
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
                      readOnly={state}
                      onChange={handleChange("Adultos")}  />  
             
             
                <input type="text" 
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Niños"  
                      readOnly={state}
                      defaultValue={resultDashboard.Ninos}  
                      onChange={handleChange("Niños")}   />

                <input  type="text" 
                        className="desde-detail-three" 
                        name="Infantes"
                        placeholder="Infantes"  
                        readOnly={state}
                        defaultValue={resultDashboard.Infantes}
                        onChange={handleChange("Infantes")}   />

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
                            readOnly={state}
                            defaultValue={resultDashboard.Nombre}
                            onChange={(e) => setNombre(e.target.value)} />

                    <input  type="text" 
                            className="desde-detail-three" 
                            name="Apellido"  
                            placeholder="Apellido" 
                            readOnly={state}
                            defaultValue={resultDashboard.Apellido}
                            onChange={(e) => (setApellido(e.target.value))}   />

                    <input  type="text" 
                            className="desde-detail-two" 
                            placeholder="Tipo de documento"
                            name="Fecha" 
                            readOnly={state}
                            defaultValue={docu.nombre}
                            onChange={handleChange("Fecha")}   />

                    <input  type="text" 
                            className="desde-detail-two" 
                            name="Fecha" 
                            placeholder="No Documento"  
                            readOnly={state}
                            defaultValue={resultDashboard.Num_documento}
                            onChange={(e) => setDocumento(e.target.value)}   />
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
                        defaultValue={n}
                        readOnly={state} 
                        onChange={(e) => setNacimiento(e.target.value)}
                           />

                <input  type="text" 
                        className="desde-detail-three"
                        name="Fecha" 
                        placeholder="Nacionalidad"   
                        readOnly={state}
                        defaultValue={resultDashboard.nacionalidad}
                        onChange={handleChange("Nacionalidad")} />

                <input  type="text" 
                        className="desde-detail-two" 
                        name="Correo" 
                        placeholder="Correo  electronico"  
                        readOnly={state}
                        defaultValue={resultDashboard.Correo}
                        onChange={(e) => setCorreo(e.target.value)}   />

                <input  type="text" 
                        className="desde-detail-two" 
                        name="Celular"  
                        placeholder="Celular"  
                        readOnly={state}
                        defaultValue={resultDashboard.Celular}
                        onChange={handleChange("Celular")}   />
            </div>
        </form>
      </div>

        <div className="container-flex-init-one" >
              <div>
                  <button className="button-checking-detail" onClick={handClickNextChecking} >
                      <span className="title-button"  >Realizar Check in</span>
                  </button>
              </div>

                <div className="container-checkbox" >
                    <input   type="checkbox" 
                            className={`checkbox-round  ${isChecked && "checkbox-round-click"} `}
                            onChange={handleOnChange}
                            defaultValue={(e) =>findPersona && setIsChecked(true)}       
                            checked={isChecked}/> Persona
                    
                </div> 

              <div className="container-checkbox" >
                      <input   type="checkbox" 
                              className={`checkbox-round  ${isChecke && "checkbox-round-click"} `}
                              onChange={handleOnChanger}
                              readOnly={true}
                            checked={isChecked}/> Empresa
              </div> 

            <div>
                <input className="button-checking-detail-one-dash" type={"number"}   placeholder="Abono" onChange={(e) =>setAbono(e.target.value)} />
            </div> 

            <div>
                <button className="button-checking-detail-one-das" > <span> Total cobro {finishValor}  </span></button>
            </div>

            <div>
                <button className="button-checking-detail-one" onClick={state ? handChangeEdit :handChangeSave}> <span>{item}</span></button>
            </div>  
      </div>

      </>
    )

}
export default DetailDasboard