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
import { GroupAdd } from "@material-ui/icons";

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
            day:fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth()+1) + '/' + fechaInicio.getDate()
        }) 
        fechaInicio.setDate(fechaInicio.getDate()+1);
    }

   
    console.log(array)
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
                            <div className=" ">
                        <div className="w-full overflow-x-auto">
                            <table className="table min-w-full bg-white shadow-md rounded border border-gray-200" ref={componentRef}>
                            <thead>
                                <tr>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                {array.map((index, i) => (
                                    <th key={i} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">{index.day}</th>
                                ))}
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomType?.map((room, ri) => (
                                <tr key={ri} className="border-t border-gray-200">
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{room.nombre}</td>
                                    {RoomTosell.map((index, i) => {


                                    const roomData = index.find(row => row.Room === room.nombre);


                                    if (roomData) {
                                     
                                        return (
                                        <>
                                           <td key={i} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            {roomData.disponible} 
                                        </td>
                                       
                                        </>
                                     
                                        );
                                    }
  
                                    })}
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    {RoomTosell.reduce((acc, index) => {
                                        const roomData = index.find(row => row.Room === room.nombre);
                                        return acc + (roomData ? roomData.disponible : 0);
                                    }, 0)}
                                    </td>
                                </tr>
                                ))}
                                <tr className="border-t border-gray-200">
                              
                                {group.map((index,e) => {
                                    console.log(group)
                                    return (
                                    <td key={e} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index}</td>
                                    );
                                })}
                              
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
        </div>
            </ContainerGlobal>
    )

}

export default InformeRoomToSell

