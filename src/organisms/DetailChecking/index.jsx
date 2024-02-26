import React, { useContext, useEffect, useState } from "react";
import {useHistory} from "react-router-dom"
import { useSelector } from "react-redux";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import moment from "moment/moment";
import LoadingDetail from "../../Ui/LoadingDetail";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import { config } from "../../config";
import ServiceUpdateReservation from "../../service/ServiceUpdatereservation";
import Swal from 'sweetalert2'

import esLocale from 'date-fns/locale/es';
import { DateRange } from "react-date-range";
import HttpClient from "../../HttpClient";

const DetailChekingOrganism =({id}) =>{
    const history = useHistory()
    const [state,setState] =useState(true)
    const {getDetailReservationById} = useDetailDashboardAction()
    const {loading,error,DetailDashboard} = useSelector((state) => state.DetailDashboard)
    const [loadingUpdate,setLoadingUpdate] =useState(false)
    const  {jwt} = useContext(AutoProvider)
    
    const [change,setChange] =useState({
        ID_Tipo_Forma_pago:null,
        Iva:null,
        ID_facturacion:null
    })

    const  resulDetailDashboard = DetailDashboard[0]
    const findPersona =  resulDetailDashboard?.tipo_persona == "persona"
    const findEmpresa = resulDetailDashboard?.tipo_persona =="empresa"
    const [tipoPersonas,setTipoPersona] =useState()
    const [isChecked, setIsChecked] = useState(findPersona);
    const [isChecke, setIsChecke] = useState(findEmpresa);
    const [DateEmpresa, setDateEmpresa] = useState();
    const [quyery,setQuery] =useState()

    const query =[]

    for(let i =0;i<quyery?.length;i++){
        if(quyery[i+1]){
        query.push(quyery[i])
        }
    }   

    const body ={
        tipo_identificacion:"C.C",
        numero_identificacion:"00000000",
        nombres:"Test ",
        apellidos:"Prueba",
        cuidad_residencia:"Bogota",
        cuidad_procedencia:"Mexico",
        numero_habitacion:"1-04G",
        motivo:"Trabajo",
        numero_acompanantes:"3",
        check_in:"2022-11-01",
        check_out:"2022-11-01",
        tipo_acomodacion:"Casa",
        costo:"1212",
        nombre_establecimiento:"hotel prueba 12",
        rnt_establecimiento:"00000000"
        }



    const handClickTra =() => {
        HttpClient.PostRegisterTRA({body, totoken:"bH46iyd42bkcREK596b1KP3qcP03zJ4Lrm10TnPM"}).then((itemtra) =>{
            console.log(itemtra)
        }).catch((e) =>{
            console.log(e)
        })
    }

    handClickTra()
    
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


    const init  =   moment(resulDetailDashboard?.Fecha_inicio).utc().format('MM/DD/YYYY')
    const fin = moment(resulDetailDashboard?.Fecha_final).utc().format('MM/DD/YYYY')

    const i = moment(resulDetailDashboard?.Fecha_inicio).utc().format('YYYY/MM/DD')
    const f = moment(resulDetailDashboard?.Fecha_final).utc().format('YYYY/MM/DD')
    const n = moment(resulDetailDashboard?.Fecha_nacimiento).utc().format('YYYY/MM/DD')


    const [stateDate, setStateDate] = useState([
        {
          startDate: new Date(i),
          endDate: new Date(f),
          key: "selection",
        },
      ]);


 

    var fechaInicio =  new Date(init).getTime() 
    var fechaFin    = new Date(fin).getTime() 

    var diff = fechaFin - fechaInicio  
    
    const day =diff/(1000*60*60*24)
        const fetchData =async() =>{
        await getDetailReservationById({id})
        }

    useEffect(() =>{

        fetch(`${config.serverRoute}/api/resecion/getdetailchecking/${id}`)
      .then(resp => resp.json())
      .then(data=> setQuery(data?.query))

       fetch(`${config.serverRoute}/api/resecion/getFacturacion`)
      .then(index=> index.json())
      .then(data =>setDateEmpresa(data.query))
    fetchData()
    },[id])


    

    const  tarifa =  [
        {   
            id:1,
            name:"Nacional",
        },
        {
            id:2,
            name:"Extranjero",
        }
        ]

    const handleInputChange =(event) =>{
        setChange({
            ...change,
            [event.target.name]:event.target.value
        })
    }

    let totalId = false;

    if ( jwt.result.id_hotel == 3 || jwt.result.id_hotel == 4 || jwt.result.id_hotel == 23 || jwt.result.id_hotel == 5 || jwt.result.id_hotel == 6 || jwt.result.id_hotel == 12 || jwt.result.id_hotel == 10 || jwt.result.id_hotel == 2 ) {
        totalId = true;
    }

    let dataTwo = {
        Tipo_persona: tipoPersonas,
        Iva: totalId ? 2 : change.Iva,
        ID_facturacion:change.ID_facturacion ? change.ID_facturacion :resulDetailDashboard.ID_facturacion
    };


    const hanClickingn2 =() =>{
        if(change.Iva== null){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '<p>Elije si es extranjero o nacional</p>',
                showConfirmButton: false,
                timer: 2000
        })
            
        }else if(dataTwo.Tipo_persona==null){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '<p>Elije si es persona o empresa</p>',
                showConfirmButton: false,
                timer: 2000
            })
        } else{
                ServiceUpdateReservation({id:resulDetailDashboard.id_persona,data:dataTwo}).then(index =>{
                            history.push(`/checkingin2/${id}`)
                }).catch(e =>{
                console.log(e)
             })           
           
        }
    
    }

  
        return (
            <>
            <div className="container-flex-init-global" >

                            <LoadingDetail
                                        loading={true}
                                        titleLoading={"Check In"}  />
                              <LoadingDetail
                                        error={loadingUpdate}
                                        title={"Tienes que "}  />

                    <div className="container-detail-dasboard-in-one" >
                        <div style={{background: "#ebebeb"}} className="border-detail"  >
                            <span> noches {day}  </span>
                        </div>

                        <div style={{background: "#ebebeb"}} className="border-detail" >
                            <span>{resulDetailDashboard?.valor_habitacion}</span>
                        </div>

                        <div style={{background: "#ebebeb"}} className="border-detail"  >
                            <span>{resulDetailDashboard.Numero} {resulDetailDashboard?.nombre_habitacion}</span>
                        </div>
                        <div style={{background: "#ebebeb"}} className="border-detail"  >
                            <span>{resulDetailDashboard?.forma_pago}</span>
                        </div>
                        <div style={{background: "#ebebeb",}} className="border-detail"  >
                            <span>Abono {resulDetailDashboard?.valor_abono} </span>
                        </div>
                    </div>
                </div>
                    <div  className="container-flex-init-global" >
                        <div className="container-detail-dasboard-in" >
                        <DateRange 
                        color="black"
                        minDate={new Date()}
                        rangeColors={['#262626']}
                        onChange={(item) => setStateDate([item.selection])}
                        months={1}
                        
                        showDateDisplay={false}
                        ranges={stateDate}
                        disabledDates={[]}
                        direction="horizontal"
                        locale={esLocale}
                    />
                        <input type="text" className="desde-detail" defaultValue={i}   />
                        <input type="text" className="desde-detail" name="Fecha" defaultValue={f}   />
                        <h2 className="cod-reserva" ><span className="title-code" >COD:</span> X14A-{resulDetailDashboard?.Num_documento}</h2>
                    </div>
                </div>
                <div>
                  
                </div>
                    <div className="container-flex-init-one-row" >
                            <div className="container-checkbox" >
                            <input   type="checkbox" 
                                        className={`checkbox-round  ${isChecked && "checkbox-round-click"} `}
                                        onChange={handleOnChange}
                                        defaultValue={(e) =>findPersona && setIsChecked(true)}        
                                        checked={isChecked}/> Persona
                                
                            </div> 

                            { totalId  ? null :
                        <div className="container-checkbox" >
                        <input   type="checkbox" 
                                         className={`checkbox-round  ${isChecke && "checkbox-round-click"} `}
                                        onChange={handleOnChanger}
                                        checked={isChecked}/> Empresa
                        </div>
                        }

                    {tipoPersonas =="empresa"  && ( <div className="container-checkbox" >
                        <select onChange={handleInputChange}  
                                            required
                                            name="ID_facturacion"
                                            className='select-hotel-type-rooms-finis-dasboard-finish-one ote'>
                            <option>Selecione empresa</option>
                            {DateEmpresa?.map(category =>(
                                <option 
                                value={category.id}   
                                key={category}
                            >
                                {category.name_people }
                            </option>
                            )
                            )}  
                        </select>  
                    </div>  
                    )}

                        <div className="container-checkbox" >
                        <select onChange={handleInputChange}  
                                            required
                                            name="Iva"
                                            className='select-hotel-type-rooms-finis-dasboard-finish-one ote'>
                                        <option>Tipo huesped</option>
                                        {tarifa?.map(category =>(
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

            
            <div className="container-checkbox"  style={{width:"37%",height:"20%"}}   >
                <button
                onClick={hanClickingn2}
                className="button-checking-detail-one-das-one-fins"
                color="success" > <span  className="text-words" >Continuar</span> </button>
                </div>
            </div>
                <div className="container-flex-init-one-row" >  
                <textarea    
                        rows="10"                                         
                        cols="142" 
                        placeholder="Observacion" 
                        name="observacion"
                        readOnly={state}
                        defaultValue={resulDetailDashboard?.Observacion}
                        className="obs-checking" ></textarea>  
                </div>
            </>
        )

}

export default DetailChekingOrganism