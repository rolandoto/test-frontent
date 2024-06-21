import React, { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import moment from "moment";
import {Button,Tooltip} from "@nextui-org/react";
import { PiMicrosoftExcelLogoLight } from "react-icons/pi";
import * as XLSX from 'xlsx';
import  AutoProvider  from "../../privateRoute/AutoProvider";
import {DatePicker} from "@nextui-org/react";
import { StyleTitleHotel } from "../../stylecomponent/StyleMenu";
import UseListMotels from "../../hooks/UseListMotels";
import { DonutChart } from "../DonutChart";


const ExportButton = ({ data, filename,color,Value,nameContent }) => {
    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
      XLSX.writeFile(wb, filename);
    };
  
    return (
        <Tooltip content={nameContent} color={color}>
        <Button 
            className="mt-2"
            size="lg" 
            onClick={exportToExcel}
            color={color}
            icon={<PiMicrosoftExcelLogoLight 
            fontSize={30} />}>${Value.toLocaleString()}
        </Button>  
    </Tooltip>
    );
};

const CardReservationActivity =({InformeMonth,selectedDay, setSelectedDay}) =>{

    const {jwt} = useContext(AutoProvider)

    const {iduser} = UseListMotels()

    const FindIdHotel=(hotel) =>{
		return hotel.id_hotel == jwt.result.id_hotel
	}

	const hotel = iduser.find(FindIdHotel)
    
    const Hospedaje = InformeMonth.Totalhospedaje.reduce((acumulador, valorActual) => acumulador + valorActual.abono, 0);

    const Ocasionales = InformeMonth.Ocasionales.reduce((acumulador, valorActual) => acumulador + valorActual.total, 0);

    const Minibar = InformeMonth.queryOne.reduce((acumulador, valorActual) => acumulador + valorActual.total_mes, 0);

    const Tienda = InformeMonth.queryTwo.reduce((acumulador, valorActual) => acumulador + valorActual.total, 0);

    const tiendaOcasionales = InformeMonth.queryThree.reduce((acumulador, valorActual) => acumulador + valorActual.Precio, 0);

    const TotalDian = InformeMonth.roomByIdIDtypeRoomDian.reduce((acumulador, valorActual) => acumulador + valorActual.abono, 0);

    const totalHospedaje = Hospedaje +Ocasionales +Minibar +Tienda +tiendaOcasionales

    const HospedajeExcel = InformeMonth.Totalhospedaje.map((ItenReservation) => {
        const Fecha =moment(ItenReservation.Fecha_pago).utc().format('YYYY/MM/DD')
        const Total =  parseInt( ItenReservation.abono)
        const Tipo ="Hospedaje"
        return {Fecha,Total,Tipo}
    }); 

    const OcasionalesjeExcel = InformeMonth.Ocasionales.map((ItenReservation) => {
        const Fecha =moment(ItenReservation.Fecha).utc().format('YYYY/MM/DD')
        const Total =  parseInt( ItenReservation.total)
        const Tipo ="Ocasioanales"
        return {Fecha,Total,Tipo}
    }); 

    const MinibarjeExcel =InformeMonth.queryOne.map((ItenReservation) => {
        const Fecha =moment(ItenReservation.Fecha_compra).utc().format('YYYY/MM/DD')
        const Total =  parseInt( ItenReservation.total_mes)
        const Tipo ="Minibar"
        return {Fecha,Total,Tipo}
    }); 

    const TiendajeExcel =InformeMonth.queryTwo.map((ItenReservation) => {
        const Fecha =moment(ItenReservation.Fecha_compra).utc().format('YYYY/MM/DD')
        const Total =  parseInt( ItenReservation.total)
        const Tipo ="Tienda"
        return {Fecha,Total,Tipo}
    }); 

    const tiendaOcasionalesjeExcel =InformeMonth.queryThree.map((ItenReservation) => {
        const Fecha =moment(ItenReservation.Fecha_compra).utc().format('YYYY/MM/DD')
        const Total =  parseInt( ItenReservation.Precio)
        const Tipo ="Tienda Ocasioanales"
        return {Fecha,Total,Tipo}
    });    
    
    const TotaldianExcel = InformeMonth.roomByIdIDtypeRoomDian.map((ItenReservation) => {
        const Habitacion =ItenReservation.room
        const Cantidad =ItenReservation.cantidad
        const Total =  parseInt( ItenReservation.abono)
        const Tipo ="Hospedaje dian"
        return {Habitacion,Cantidad,Total,Tipo}
    }); 


    const exportAllToExcel = () => {
        // Inicializar un arreglo para contener los datos combinados
        const allData = [];
        
        const maxLength = Math.max(HospedajeExcel.length, OcasionalesjeExcel.length,MinibarjeExcel.length,TiendajeExcel.length,tiendaOcasionalesjeExcel.length);
        
        // Iterar sobre los datos de HospedajeExcel
        for (let i = 0; i < maxLength; i++) {
            const rowData = {};

            const fechaHospedaje = HospedajeExcel[i].Fecha;
            const matchOcasionales = OcasionalesjeExcel.find(item => item && item.Fecha === fechaHospedaje);
            const matchOcasionalesminibar = MinibarjeExcel.find(item => item && item.Fecha === fechaHospedaje);
            const matchOTienda = TiendajeExcel.find(item => item && item.Fecha === fechaHospedaje);
            const matchOTiendaOcasionales = tiendaOcasionalesjeExcel.find(item => item && item.Fecha === fechaHospedaje);
            // Agregar los datos de HospedajeExcel en la primera fila
            if (HospedajeExcel[i]) {
                rowData.A = HospedajeExcel[i].Fecha; // Asignar a la columna A
                rowData.B = HospedajeExcel[i].Total; // Asignar a la columna B  
                rowData.C = HospedajeExcel[i].Tipo; // Asignar a la columna B  
            }
            if (matchOcasionales) {
                rowData.D = matchOcasionales.Fecha; // Asignar a la columna D de Ocasionales
                rowData.E = matchOcasionales.Total; // Asignar a la columna E de Ocasionales
                rowData.F = matchOcasionales.Tipo; // Asignar a la columna F de Ocasionales
            } else {
                rowData.D =  HospedajeExcel[i].Fecha; // Si no hay coincidencia, asignar valor vacío
                rowData.E = 0;
                rowData.F = 'Ocasioanales';
            }
            if (matchOcasionalesminibar) {
                rowData.G = matchOcasionalesminibar.Fecha; // Asignar a la columna C
                rowData.H = matchOcasionalesminibar.Total; // Asignar a la columna D
                rowData.I = matchOcasionalesminibar.Tipo; // Asignar a la columna D
            }else{
                rowData.G =  HospedajeExcel[i].Fecha; // Si no hay coincidencia, asignar valor vacío
                rowData.H = 0;
                rowData.I = 'Minibar';
            }
            if (matchOTienda) {
                rowData.J = matchOTienda.Fecha; // Asignar a la columna C
                rowData.K = matchOTienda.Total; // Asignar a la columna D
                rowData.L = matchOTienda.Tipo; // Asignar a la columna D
            }else{
                rowData.J = HospedajeExcel[i].Fecha; // Asignar a la columna C
                rowData.K = 0;
                rowData.L = 'Tienda';
            }
            if (matchOTiendaOcasionales) {
                rowData.M = matchOTiendaOcasionales.Fecha; // Asignar a la columna C
                rowData.N = matchOTiendaOcasionales.Total; // Asignar a la columna D
                rowData.O = matchOTiendaOcasionales.Tipo; // Asignar a la columna D
            } else{
                rowData.M = HospedajeExcel[i].Fecha; // Asignar a la columna C
                rowData.N = 0; //
                rowData.O = "Tienda Ocasioanales"; // Asignar a la columna D
            }
            allData.push(rowData);
        }

        const ws = XLSX.utils.json_to_sheet(allData);
    
        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    
        XLSX.writeFile(wb, 'all_data.xlsx');
    };

    
    return  (
        <div className="flex-item-dashboard-one" style={{backgroundColor:"white" }} >
            <div className="card-two-one">
                <span style={{color:"black"}} >	<StyleTitleHotel> {hotel?.nombre} </StyleTitleHotel> </span>
                <ul className="flex-container wrap-reverse-one" >
                                    <li className="flex-item-reservation-one" style={{backgroundColor:"white" }} >
                                            <h4 className="let-letra number-reservation letra-dasboard"   >  12 </h4>
                                            <h4 className="let-letra number-reservation letra-dasboard-one"   >Reservas Creadas </h4>
                                        </li>
                                        <li className="flex-item-reservation-one" style={{backgroundColor:"white" }} >
                                            <h4 className="let-letra number-reservation letra-dasboard"   >  26 </h4>
                                            <h4 className="let-letra number-reservation letra-dasboard-one"   >  Check in  </h4>
                                        </li>
                                        <li className="flex-item-reservation-one" style={{backgroundColor:"white" }} >
                                            <h4 className="let-letra number-reservation letra-dasboard"   >  50 </h4>
                                            <h4 className="let-letra number-reservation letra-dasboard-one"   > Check out </h4>
                                        </li>
                                        <li className="flex-item-reservation-one" style={{backgroundColor:"white" }} >
                                            <h4 className="let-letra number-reservation letra-dasboard"   >  50 </h4>
                                            <h4 className="let-letra number-reservation letra-dasboard-one"   > Ocupadas </h4>
                                        </li>

                                        <li className="flex-item-reservation-one" style={{backgroundColor:"white" }} >
                                            <h4 className="let-letra number-reservation letra-dasboard"   >  18 </h4>
                                            <h4 className="let-letra number-reservation letra-dasboard-one"   > Ocasionales </h4>
                                        </li>
                                        <li className="flex-item-reservation-one" style={{backgroundColor:"white" }} >
                                            <h4 className="let-letra number-reservation letra-dasboard"   >  12 </h4>
                                            <h4 className="let-letra number-reservation letra-dasboard-one"   >Reservas Canceladas </h4>
                                        </li>
                                        <li className="flex-item-reservation-one" style={{backgroundColor:"white" }} >
                                            <h4 className="let-letra number-reservation letra-dasboard"   >  12 </h4>
                                            <h4 className="let-letra number-reservation letra-dasboard-one"   > arrivals </h4>
                                    </li>
                </ul>

                <div className="container-date-range-dashboard" >
                    <div>     
                        < input className="date-text desde-detail-searching" 
                        type="date" 
                        onChange={(e) => setSelectedDay(moment(e.target.value))}
                        placeholder="Buscar fecha" 
                        value={selectedDay.format('YYYY-MM-DD')} 
                        />
                </div>
            </div>

                    <div className="flex justify-between" >
                    <div className="block" >
                                <ExportButton 
                                    data={HospedajeExcel}
                                    nameContent="Hospedaje" 
                                    color={"success"} 
                                    Value={Hospedaje}
                                    filename="output.xlsx" />
                                <ExportButton 
                                    data={OcasionalesjeExcel} 
                                    color={"error"} 
                                    nameContent="Ocasionales" 
                                    Value={Ocasionales}
                                    filename="output.xlsx" />
                                <ExportButton 
                                    data={MinibarjeExcel} 
                                    color={"primary"} 
                                    nameContent="Minibar" 
                                    Value={Minibar}
                                    filename="output.xlsx" />
                                <ExportButton 
                                    data={TiendajeExcel} 
                                    color={"warning"} 
                                    nameContent="Tienda" 
                                    Value={Tienda}
                                    filename="output.xlsx" />
                                <ExportButton 
                                    data={tiendaOcasionalesjeExcel} 
                                    color={"success"} 
                                    nameContent="Tienda Ocasionales" 
                                    Value={tiendaOcasionales}
                                    filename="output.xlsx" />

                                <Tooltip content="Total hospedaje" color="success">
                                    <Button 
                                        size="lg" 
                                        className="mt-2"
                                        onClick={exportAllToExcel}
                                        color="success" 
                                        icon={<PiMicrosoftExcelLogoLight 
                                        fontSize={30} />}>{totalHospedaje.toLocaleString()}
                                    </Button>  
                                </Tooltip>
                               
                    </div>
                    
                    <div className="block" >
                    <ExportButton 
                        data={TotaldianExcel} 
                        color={"gradient"} 
                        nameContent="Dian" 
                        Value={TotalDian}
                        filename="output.xlsx" />
                    </div> 
                    <div className="block" >
                    <DonutChart />
                    </div> 

                        </div>           
                      

                        </div>

                        
        </div>
        )
}

export default CardReservationActivity
