import React, { useContext, useEffect,useState } from "react";
import { ServiceReservas } from "../../page-resesion/Dashboard/dummy_data";
import { AiOutlineSearch } from "react-icons/ai";
import {useHistory} from "react-router-dom"
import AutoProvider  from "../../privateRoute/AutoProvider";
import LoadingDetail from "../../Ui/LoadingDetail";
import { BsCalendarX } from "react-icons/bs";
import ServiceUpdateReservationWeb from "../../service/ServiceUpdateReservationWeb";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'moment/locale/es';
import esLocale from 'date-fns/locale/es';
import { 
    DateRange , 
    Range, 
    RangeKeyDict
  } from 'react-date-range';
  import { Switch, Spacer } from "@nextui-org/react";

import moment from "moment";
import ButtonBack from "../../component/ButtonBack";
import ButtonHome from "../../component/ButtonHome";
import useReservationActions from "../../action/useReservationActions";

const TemplateSearch =() =>{
    const {jwt} =useContext(AutoProvider)
    const [username,setUsername] =useState("")
    const history = useHistory()
    const [isChecked, setIsChecked] = useState(false);

    const {error,Items,Room,filterRoom
	} = useSelector((state) => state.ReservationSlice)

    const {getPostByReservation} =useReservationActions()

    
    const fetchData =async() =>{
		try {
			await getPostByReservation({type:isChecked})
			} catch (error) {
				console.error("Error fetching data:", error);
			} 
    }

    
	useEffect(() =>{
        fetchData()
    },[isChecked])

    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);
    
      const formattedStartDate = moment(state[0].startDate).format('YYYY/MM/DD');
      const formattedEndDate = moment(state[0].endDate).format('YYYY/MM/DD');


    const filtrarSearching = (terminoBusqueda, fechaDesde, fechaHasta) => {
        let resultadosBusqueda = Items?.filter((elemento, index) => {
            // Filtrar por término de búsqueda
            const condicionBusqueda = elemento.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                                      elemento.document?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                                      elemento.Codigo_Reserva?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                                      elemento.full_name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase());
    
            // Filtrar por rango de fechas
            let condicionFechas = true;
            if (fechaDesde && fechaHasta) {
                const fechaInicio = moment(elemento.start_time).utc().format('YYYY/MM/DD');
                const fechaFin = moment(elemento.start_time).utc().format('YYYY/MM/DD');
                condicionFechas = moment(fechaInicio).isBetween(moment(fechaDesde), moment(fechaHasta), null, '[]') ||
                                  moment(fechaFin).isBetween(moment(fechaDesde), moment(fechaHasta), null, '[]');
            }   
    
            // Retornar elemento si cumple con ambas condiciones
            return condicionBusqueda && condicionFechas;
        });
    
        return { resultadosBusqueda };
    };

    const handChange =(e) =>{
        setUsername(e.target.value)
    }

    

    const handHistory =(e) =>{
        history.push(`/DetailDashboard/${e}`)
    }
    const {resultadosBusqueda} = filtrarSearching(username, formattedStartDate, formattedEndDate);

     
    const getCartTotalCount = () => {
        return Object.keys(resultadosBusqueda).length;
    };

    const totalCuantity = getCartTotalCount()

   if(!resultadosBusqueda) return null

    return (

        <>
        <div className="container-bicta" >
            <ButtonBack />
            <ButtonHome/>
                <div className="contain-search">
                    <ul className="flex-bedrooms-search">   
                            <li>
                               
                                <input  className="input-stores-personality-nine-search"  
                                        name="Ciudad"
                                        value={username}
                                        onChange={handChange}   
                                        placeholder="Buscar tu reserva" />
                                  
                            </li>   
                            <li className="left">
                            <article className="text-justify" >
                            <h3>filtrar fecha anteriores check out</h3>
                            <h3>Total de busquedad ({totalCuantity})</h3>
                            <Switch className="items-start left" onChange={(e) => setIsChecked(!isChecked)}  /> 
                            </article>
                            </li>
                          
                            
                                    <DateRange 
                                    color="black"
                                    rangeColors={['#262626']}
                                    onChange={(item) => setState([item.selection])}
                                    showSelectionPreview={false}
                                    moveRangeOnFirstSelection={true}
                                    months={2}
                                    showDateDisplay={false}
                                    ranges={state}
                                    disabledDates={[]}
                                    direction="horizontal"
                                    locale={esLocale}
                                />

                    <table  className="auto "  >
                    <tbody class="tbody border-y-black "  >                <thead >
                        <tr>        
                                <th>facturacion </th>
                                <th  >Habitacion</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fecha entrada</th>
                                <th>Fecha salida</th>
                                <th>Codigo reserva</th>
                                <th>Obervacion</th>
                                <th>Abono</th>
                                <th>valor dia </th>
                                <th>Total hospedaje</th>
                                <th>Prefijo</th>
                                <th>Celular</th>
                                <th>Nacionalidad</th>
                                <th>Opciones</th>
                            </tr>
                        </thead   >
                        {resultadosBusqueda?.map(index =>{
                            
                            let todaydesde = new Date(index.start_time)
                            const desde = moment(todaydesde).utc().format('YYYY/MM/DD')
                            let todayhasta = new Date(index.end_time)
                            const hasta = moment(todayhasta).utc().format('YYYY/MM/DD')
                            const valor_habitacion =  parseInt(index?.valor_habitacion)
                            const valor_habitacionDia =  parseInt(index?.pagos_dia)
                            const abono = parseInt(index?.abono)
                            
                            const PointerSentSigo = Boolean(index.ID_facturacion.trim()) ? (
                                // Botón para enviar facturas electrónicas
                                <td  className="text-center p-4 bg-green-100 text-green-800 font-semibold">
                                    Facturación electrónica enviada
                                </td>
                                                            
                              ) : (
                                <td  className="text-center p-4 bg-red-100 text-red-800 font-semibold">
                              No enviada aun
                            </td>
                                    
                              )

                            

                            if(index.state ==0){
                                if(index.abono > 0){
                                    return (
                                        <tr className="  bot pay-reservation-search"   >
                                               {PointerSentSigo}
                                            <td>{index.Num_Room}</td>
                                            <td  >{index.name}</td>
                                            <td >{index.last_name}</td>
                                            <td> Desde {desde}</td>
                                            <td> Hasta {hasta}</td>
                                            <td>{index.Codigo_Reserva}</td>
                                            <td>{index.Observation}</td>
                                            <td>${abono.toLocaleString()}</td>
                                            <td>${valor_habitacionDia.toLocaleString()}</td>
                                            <td>${valor_habitacion.toLocaleString()}</td>
                                            <td>{index.codigo}</td>
                                            <td>{index.Celular}</td>
                                            <td>{index.nacionalidad}</td>
                                            <td>
                                            <button className="button-dasboard-thre-search-view"  onClick={() => handHistory(index.id)} >
                                                        <span>ver</span> 
                                                </button>
                                            </td>
                                    </tr>
                                    )
                                } else{
                                    return (
                                        <tr className="border-y-black"  >
                                               {PointerSentSigo}
                                            <td>{index.Num_Room}</td>
                                            <td  >{index.name}</td>
                                            <td>{index.last_name}</td>
                                            <td> Desde {desde}</td>
                                            <td> Hasta {hasta}</td>
                                            <td>{index.Codigo_Reserva}</td>
                                            <td>{index.Observation}</td>
                                            <td>${abono.toLocaleString()}</td>
                                            <td>${valor_habitacionDia.toLocaleString()}</td>
                                            <td>${valor_habitacion.toLocaleString()}</td>
                                            <td>{index.codigo}</td>
                                            <td>{index.Celular}</td>
                                            <td>{index.nacionalidad}</td>
                                            <td>
                                            <button className="button-dasboard-thre-search-view"  onClick={() => handHistory(index.id)} >
                                                        <span>ver</span> 
                                                </button>
                                            </td>
                                    </tr>
                                    )
                                }
                                }else if(index.state ==6){
                                    return (<tr  className="">
                                        {PointerSentSigo}
                                    <td>{index.Num_Room}</td>
                                    <td>{index.name}</td>
                                    <td>{index.last_name}</td>
                                    <td>Desde {desde}</td>
                                    <td>Hasta {hasta}</td>
                                    <td>{index.Codigo_Reserva}</td>
                                    <td>{index.Observation}</td>
                                    <td>${abono.toLocaleString()}</td>
                                    <td>${valor_habitacionDia.toLocaleString()}</td>
                                    <td>${valor_habitacion.toLocaleString()}</td>
                                    <td>{index.codigo}</td>
                                    <td>{index.Celular}</td>
                                    <td>{index.nacionalidad}</td>
                                    <td>
                                        <button 
                                            className="button-dasboard-thre-search-view" 
                                            onClick={() => handHistory(index.id)}
                                        >
                                            <span>ver</span> 
                                        </button>
                                    </td>
                                </tr>)
                                }
                                }
                            )}
                        </tbody>

                 </table>
                    </ul>
                </div>
              
                
        </div>
        </>
    )
}
export default TemplateSearch
