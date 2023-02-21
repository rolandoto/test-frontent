import React, { useContext, useEffect, useState } from "react";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import ServiceInfomeRoomtoSell from "../../service/ServiceInformeRoomTosell";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import ContainerGlobal from "../../Ui/ContainerGlobal";
import LoadingDetail from "../../Ui/LoadingDetail";


const InformeRoomToSell =() =>{    
    const {jwt} =useContext(AutoProvider)

    const [roomtosell,setRoomTosell]=useState()
    const [LookinforFecha,setLokinforFecha] =useState()
    const [loadingInforme,setLoadingInforme] =useState(false)
    const [room,setRoom] =useState()


    const handClikcDescargar =() =>{
        setLoadingInforme(true)
    }

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }

    const hanLookingFor =() =>{
        ServiceInfomeRoomtoSell({id:jwt.result.id_hotel,fecha:LookinforFecha}).then(index =>{
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

    return (
            <ContainerGlobal>
                   <LoadingDetail 
                        loading={true}
                        titleLoading={"Informe  Room to sell"}  />

            <div>
                <input type="date" className="input-selecto-dasboard-n1-reservaction"  onChange={hadChangeFecha}    />
                <button className="button-informe-cosultar" onClick={hanLookingFor} >Consultar</button>
                {roomtosell?.length>0 && <button className="button-informe-descargar"  onClick={handClikcDescargar} >Descargar Informe</button>}
                {roomtosell?.length>0 &&<button className="button-informe-imprimir"  ><a href="#" >
                    Imprimir
                </a></button>}

            <table className="de" >   
                <tbody>     
                <tr >
                <td>Fecha</td>
                        {room?.map((row, i) => (
                            <>
                            
                           <td>{row.nombre}</td>
                           </>
                        ))}    
                         </tr>

                         <tr>
                            {flattened.map((index, i) => {
                                // Compara la fecha actual con la fecha anterior
                                const showBreak = i > 0 && index.fecha !== flattened[i-1].fecha;
                                // Actualiza la fecha anterior con la fecha actual
                                const prevDate = index.fecha;
                                // Devuelve el <td> con la disponibilidad y el posible <br>
                                return (
                                <>
                                    <td>{index.disponible}</td>
                                    {showBreak && <hr/>}
                                </>
                                );
                            })}
                        </tr>
                                                
                                                       
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