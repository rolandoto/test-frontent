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
  
import moment from "moment";

const TemplateSearch =() =>{
    const {jwt} =useContext(AutoProvider)
    const [username,setUsername] =useState("")
    const [fechaDesdeFiltro,setfechaDesdeFiltro] =useState("")
    const [fechaHastaFiltro,setfechaHastaFiltro] =useState("")
    const [loading,setLoading] =useState(false)
    const history = useHistory()

    const {error,Items,Room,filterRoom
	} = useSelector((state) => state.ReservationSlice)

    const handCreateReservation =(e) =>{
        history.push("/Createreservaction")
    }

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

    const handChangeDesde  =(e) =>{
        setfechaDesdeFiltro(e.target.value)
    }

    const handChangeHasta  =(e) =>{
        setfechaHastaFiltro(e.target.value)
    }

    const handHistory =(e) =>{
        history.push(`/DetailDashboard/${e}`)
    }


    const handCLickUdpate =(e) => {      
        ServiceUpdateReservationWeb({id:e,cancelado:1}).then(index=>{
            console.log(index)
            setLoading(true)
            
        }).catch(e=> {
            console.log(e)
            setLoading(false)
        })
    }

   
const {resultadosBusqueda} = filtrarSearching(username, formattedStartDate, formattedEndDate);

console.log(resultadosBusqueda)


   if(!resultadosBusqueda) return null

    return (

        <>
        <div className="container-bicta" >
                <div className="contain-search">
                    <ul className="flex-bedrooms-search">   
                            <li>
                               
                                <input  className="input-stores-personality-nine-search"  
                                        name="Ciudad"
                                        value={username}
                                        onChange={handChange}   
                                        placeholder="Buscar tu reserva" />
                            </li>   
                            
                                    <DateRange 
                                    color="black"
                                    minDate={new Date()}
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

            <table  className="de"  >
                    <tbody class="tbody"  > 
                <thead >
                <tr>    
                        <th>Habitacion</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha entrada</th>
                        <th>Fecha salida</th>
                        <th>Codigo reserva</th>
                        <th>Abono</th>
                        <th>Total hospedaje</th>
                        <th>Prefijo</th>
                        <th>Celular</th>
                        <th>Nacionalidad</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                  {resultadosBusqueda?.map(index =>{
                     let todaydesde = new Date(index.start_time)
                     const desde = moment(todaydesde).utc().format('YYYY/MM/DD')

                     let todayhasta = new Date(index.end_time)
                     const hasta = moment(todayhasta).utc().format('YYYY/MM/DD')

                     const valor_habitacion =  parseInt(index?.valor_habitacion)

                     const abono = parseInt(index?.abono)

                    if(index.state ==0)
                       if(index.abono > 0){
                        return (
                            <tr className="pay-reservation-search"   >
                                <td>{index.Num_Room}</td>
                                <td  >{index.name}</td>
                                <td >{index.last_name}</td>
                                <td> Desde {desde}</td>
                                <td> Hasta {hasta}</td>
                                <td>{index.Codigo_Reserva}</td>
                                <td>${abono.toLocaleString()}</td>
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
                       }else{
                        return (
                            <tr className=""  >
                                <td>{index.Num_Room}</td>
                                <td  >{index.name}</td>
                                <td>{index.last_name}</td>
                                <td> Desde {desde}</td>
                                <td> Hasta {hasta}</td>
                                <td>{index.Codigo_Reserva}</td>
                                <td>${abono.toLocaleString()}</td>
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
