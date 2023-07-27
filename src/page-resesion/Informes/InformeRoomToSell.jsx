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

    const group = []

 
    return (
            <ContainerGlobal>
                   <LoadingDetail 
                        loading={true}
                        titleLoading={"Informe  Room to sell"}  />

                <div >
                    <div style={{display:"flex",alignItems:"center"}} >
                        <input type="date" className="input-selecto-dasboard-n1-reservaction"  onChange={hadChangeFecha}    />
                        <input type="date" className="input-selecto-dasboard-n1-reservaction"  onChange={hadChangeFechaOne}    />
                        <button className="button-informe-cosultar  with-button-room-to-sell " onClick={hanLookingFor} >Consultar</button>
                        <button className="button-informe-imprimir"  onClick={handlePrint} >
                                Imprimir
                        </button>
                            </div>
                                <table className="de">   
                                    <tbody ref={componentRef}  >
                                        <tr>
                                            <th  className="top-pq"  >Nombre</th>
                                                {array.map(index => (
                                                    <th className="top-room-to-sell-width" >{index.day}</th>
                                                ))}
                                                <th   className="top-room-to-sell-width"  >Total</th>
                                            </tr>
                                            <div className="template-flex" >
                                            <tr className="to-tr top-pq" >
                                                {room?.map(index  =>(
                                                    <>
                                                    <td>{index.nombre}</td>
                                                
                                                    </>
                                                ))}
                                                 <td>Total por dia</td>
                                            </tr> 
                                        {roomtosell?.map((index)  => {

                                            const totaGroup =  index.map((row, i)=>{
                                                const fechaActual = row.fecha;
                                                const fechaAnterior = i > 0 ? index[i - 1].fecha : null;
                                                if (fechaAnterior !== null && fechaActual !== fechaAnterior) {
                                                    
                                                }else {
                                                    return row.disponible
                                                }
                                            })

                                            const sumWithInitial = totaGroup.reduce(
                                                (accumulator, currentValue) => accumulator + currentValue,
                                                0
                                            );
                                            return (
                                                <tr  className="flex-room-to-sell top-room-to-sell-width" > 
                                                {index?.map((row, i) => {
                                                group.push(row)
                                                const fechaActual = row.fecha;
                                                const fechaAnterior = i > 0 ? index[i - 1].fecha : null;   
                                                if (fechaAnterior !== null && fechaActual !== fechaAnterior) {
                                                    return (
                                                        <>
                                                            <th > </th>  
                                                        </>
                                                    );
                                                } else {

                                                    return (
                                                    <>
                                                        <th  >{row.disponible}  </th> 
                                                        </> 
                                                    );
                                                    }
                                                })} 
                                               <th  >{sumWithInitial}</th> 
                                                </tr> 
                                            )
                                           
                                        })}
                                    { <tr className="flex-room-to-sell top-room-to-sell-width" >
                                        {room?.map(index  =>{
                                            const filterIndex =   group.filter((Item)=> Item.Room == index.nombre  )
                                            const sumWithInitial = filterIndex.reduce(
                                                (accumulator, currentValue) => accumulator + currentValue.disponible,
                                                0
                                            );
                                            return (
                                                <th>{sumWithInitial}</th>
                                            )
                                        })}
                                        <th>0</th>
                                        </tr> 
                                    }
                                        </div>
                                    </tbody>       
            </table>
        </div>
            </ContainerGlobal>
    )

}

export default InformeRoomToSell

