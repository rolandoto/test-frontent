import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import moment from "moment";
import {Button,Tooltip} from "@nextui-org/react";
import { PiMicrosoftExcelLogoLight } from "react-icons/pi";
import * as XLSX from 'xlsx';

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
            size="lg" 
            onClick={exportToExcel}
            color={color}
            icon={<PiMicrosoftExcelLogoLight 
            fontSize={30} />}>${Value.toLocaleString()}
        </Button>  
    </Tooltip>
    );
  };


const CardReservationActivity =({InformeMonth,selectedDay, 
    setSelectedDay}) =>{

    

    const Hospedaje = InformeMonth.Totalhospedaje.reduce((acumulador, valorActual) => acumulador + valorActual.abono, 0);

    const Ocasionales = InformeMonth.Ocasionales.reduce((acumulador, valorActual) => acumulador + valorActual.Abono, 0);

    const Minibar = InformeMonth.queryOne.reduce((acumulador, valorActual) => acumulador + valorActual.total_mes, 0);

    const Tienda = InformeMonth.queryTwo.reduce((acumulador, valorActual) => acumulador + valorActual.total, 0);

    const tiendaOcasionales = InformeMonth.queryThree.reduce((acumulador, valorActual) => acumulador + valorActual.Precio, 0);

    const totalHospedaje = Hospedaje +Ocasionales +Minibar +Tienda +tiendaOcasionales

    const HospedajeExcel = InformeMonth.Totalhospedaje.map((ItenReservation) => {
        const Fecha =moment(ItenReservation.Fecha_pago).utc().format('YYYY/MM/DD')
        const Total =  parseInt( ItenReservation.abono).toLocaleString()
        return {Fecha,Total}
    }); 

    const OcasionalesjeExcel = InformeMonth.Ocasionales.map((ItenReservation) => {
        const Fecha =moment(ItenReservation.Fecha).utc().format('YYYY/MM/DD')
        const Total =  parseInt( ItenReservation.Abono).toLocaleString()
        return {Fecha,Total}
    }); 

    const MinibarjeExcel =InformeMonth.queryOne.map((ItenReservation) => {
        const Fecha =moment(ItenReservation.Fecha_compra).utc().format('YYYY/MM/DD')
        const Total =  parseInt( ItenReservation.total_mes).toLocaleString()
        return {Fecha,Total}
    }); 

    const TiendajeExcel =InformeMonth.queryTwo.map((ItenReservation) => {
        const Fecha =moment(ItenReservation.Fecha_compra).utc().format('YYYY/MM/DD')
        const Total =  parseInt( ItenReservation.total).toLocaleString()
        return {Fecha,Total}
    }); 


    const tiendaOcasionalesjeExcel =InformeMonth.queryThree.map((ItenReservation) => {
        const Fecha =moment(ItenReservation.Fecha_compra).utc().format('YYYY/MM/DD')
        const Total =  parseInt( ItenReservation.Precio).toLocaleString()
        return {Fecha,Total}
    }); 


    return  (
        <div className="flex-item-dashboard-one" style={{backgroundColor:"white" }} >

                        <div className="card-two-one">
                            <span style={{color:"black"}} >Actividad de reserva</span>
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
                                        
                        <div className="flex gap-4 justify-center items-center " >
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
                        </div>

                                               
                        <div>
                            <div className="flex gap-4 justify-center items-center" >
                                <br />
                                <Tooltip content="Total hospedaje" color="success">
                                    <Button 
                                        size="lg" 
                                        color="success" 
                                        icon={<PiMicrosoftExcelLogoLight 
                                        fontSize={30} />}>{totalHospedaje.toLocaleString()}
                                    </Button>  
                                </Tooltip>
                            </div>              
                        </div>

                                
                        </div>

                      
                       
                    </div>
        )
}

export default CardReservationActivity
