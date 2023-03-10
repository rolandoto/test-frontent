import React, { useContext, useEffect, useRef, useState } from "react";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import ServiceInfomeRoomtoSell from "../../service/ServiceInformeRoomTosell";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import ContainerGlobal from "../../Ui/ContainerGlobal";
import LoadingDetail from "../../Ui/LoadingDetail";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";

const InformeRoomToSell =() =>{    
    const {jwt} =useContext(AutoProvider)
    const [roomtosell,setRoomTosell]=useState()
    const [LookinforFecha,setLokinforFecha] =useState()
    const [LookinforFechaOne,setLokinforFechaOne] =useState()
    const [loadingInforme,setLoadingInforme] =useState(false)
    const [room,setRoom] =useState()

    const handClikcDescargar =() =>{
        setLoadingInforme(true)
    }

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }
    const hadChangeFechaOne =(e) =>{
        setLokinforFechaOne(e.target.value)
    }

    const hanLookingFor =() =>{
        ServiceInfomeRoomtoSell({id:jwt.result.id_hotel,fechaInicio:LookinforFecha ,fechaFinal:LookinforFechaOne}).then(index =>{
            setRoomTosell(index.groupedDataWithoutDates)
        }).catch(e =>{
            console.log(e)
        })
    }
    useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setRoom(index)
        })
    },[setRoom])


    const flattened = roomtosell?.flatMap(num => num);

    

    var fechaInicio = new Date(LookinforFecha);
    var fechaFin    = new Date(LookinforFechaOne);

    const array =[]

    while(fechaFin.getTime() >= fechaInicio.getTime()){
        fechaInicio.setDate(fechaInicio.getDate() + 1);

        array.push({
            day:fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getDate()
        }) 
    }
    

    let componentRef = useRef();


    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    

    return (
            <ContainerGlobal>
                   <LoadingDetail 
                        loading={true}
                        titleLoading={"Informe  Room to sell"}  />

            <div>
                <input type="date" className="input-selecto-dasboard-n1-reservaction"  onChange={hadChangeFecha}    />
                <input type="date" className="input-selecto-dasboard-n1-reservaction"  onChange={hadChangeFechaOne}    />
                <button className="button-informe-cosultar  with-button-room-to-sell " onClick={hanLookingFor} >Consultar</button>
                {roomtosell?.length>0 && <button className="button-informe-descargar  with-button-room-to-sell "  onClick={handClikcDescargar} >Descargar Informe</button>}
                {roomtosell?.length>0 &&<button className="button-informe-imprimir with-button-room-to-sell-One"  onClick={handlePrint} ><a href="#" >
                    Imprimir
                </a></button>}

            <table className="de  "  >   
            
            <tbody ref={componentRef}  >
                    

                <tr>
                    <th  className="top-pq"  >Nombre</th>
                    {array.map(index => (
                        <th className=" top-room-to-sell-width" >{index.day}</th>
                    ))}
                    
                </tr>

                <div className="template-flex" >
                <tr className="to-tr top-pq" >
                   {room?.map(index  =>(
                    <td>{index.nombre}</td>
                   ))}
                </tr> 
                {roomtosell?.map((index)  => (
                    <tr  className="flex-room-to-sell top-room-to-sell-width" > 
                        {index?.map((row, i) => {
                        const fechaActual = row.fecha;
                        const fechaAnterior = i > 0 ? index[i - 1].fecha : null;
                        if (fechaAnterior !== null && fechaActual !== fechaAnterior) {
                            return (
                            <>
                                    <th  >{row.disponible} </th>  
                                    
                                </>
                            );
                        } else {
                            return (
                               
                                <th  >{row.disponible}  </th>  
                           
                            );
                        }
                        })}
                        
                        
                        </tr> 
                     ))}
                </div>

              
            </tbody>       
              
         
            </table>

            
        </div>
            </ContainerGlobal>
    )

}

export default InformeRoomToSell



function RoomAvailabilityList({ availabilityData }) {
    return (
      <ul>
        {availabilityData?.map((data, index) => (
          <li key={index}>
            <h2>{data.Room}</h2>
            <p>Disponible en {data.fecha}: {data.disponible} habitaciones</p>
          </li>
        ))}
      </ul>
    );
  }