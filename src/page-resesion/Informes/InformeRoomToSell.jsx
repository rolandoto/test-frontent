import React, { useContext, useEffect, useRef, useState } from "react";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import ServiceInfomeRoomtoSell from "../../service/ServiceInformeRoomTosell";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import ContainerGlobal from "../../Ui/ContainerGlobal";
import LoadingDetail from "../../Ui/LoadingDetail";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import esLocale from 'date-fns/locale/es';
import { 
    DateRange , 
    Range, 
    RangeKeyDict
  } from 'react-date-range';
  import moment from "moment";
import useDetailRoomAction from "../../action/useDetailRoomAction";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ButtonBack from "../../component/ButtonBack";
import ButtonHome from "../../component/ButtonHome";

const InformeRoomToSell =() =>{    
    const {jwt} =useContext(AutoProvider)
    
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);

    const formattedStartDate = moment(state[0].startDate).format('YYYY/MM/DD');
    const formattedEndDate = moment(state[0].endDate).format('YYYY/MM/DD');

    const {roomType,RoomTosell
} = useSelector((state) => state.RoomDetail)

    console.log(RoomTosell)

    const {postTypeRoom,
        postTypeRoomtosell} = useDetailRoomAction()

    const fetchDate =async() =>{
        try {
         await postTypeRoom({id:jwt.result.id_hotel})
      
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    }

    const handSubmit =async() =>{
        try {   
            toast.success("encontrado")

            const to = await postTypeRoomtosell({id:jwt.result.id_hotel,fechaInicio:formattedStartDate ,fechaFinal:formattedEndDate})
            console.log({"to":to})
        } catch (error) {
            toast.error("Error no encontrado")
        }
    }

    var fechaInicio = new Date(formattedStartDate);
    var fechaFin    = new Date(formattedEndDate);
   

    const array =[]

    while(fechaFin.getTime() >= fechaInicio.getTime()){
        array.push({
            day:fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth()) + '/' + fechaInicio.getDate()
        }) 
        fechaInicio.setDate(fechaInicio.getDate()+1);
    }

   
    let componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const group = []

    useEffect(() =>{
         fetchDate()
    },[])

    return (
            <ContainerGlobal>
                   <LoadingDetail 
                        loading={true}
                        titleLoading={"Informe  Room to sell"}  />
            <ButtonBack/>
            <ButtonHome/>

                <div >
                    <div style={{display:"flex",alignItems:"center"}} >

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
                       
                        <button className="button-informe-cosultar-roomtosell " onClick={handSubmit} >Consultar</button>
                        <button className="button-informe-imprimir-roomtosell"  onClick={handlePrint} >
                                Imprimir
                        </button>
                            </div>
                            <div className="tablecontainer">
                                <table className="de">   
                                    <tbody ref={componentRef}  >
                                        <tr>
                                            <th  className="top-pq sticky-left"  >Nombre</th>
                                                {array.map(index => (
                                                    <th className="top-room-to-sell-width" >{index.day}</th>
                                                ))}
                                                <th   className="top-room-to-sell-width"  >Total</th>
                                            </tr>
                                            <div className="template-flex" >
                                            <tr className="to-tr top-pq " >
                                                {roomType?.map(index  =>(
                                                    <>
                                                    <td>{index.nombre}</td>
                                                
                                                    </>
                                                ))}
                                                 <td>Total por dia</td>
                                            </tr> 
                                        {RoomTosell?.map((index)  => {

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
                                            {roomType?.map(index  =>{
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
        </div>
            </ContainerGlobal>
    )

}

export default InformeRoomToSell

