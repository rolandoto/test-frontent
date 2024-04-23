import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import moment from "moment";
import {Button,Tooltip} from "@nextui-org/react";
import { PiMicrosoftExcelLogoLight } from "react-icons/pi";

const CardReservationActivity =({InformeMonth}) =>{

    console.log(InformeMonth)

    const Hospedaje = InformeMonth.Totalhospedaje.reduce((acumulador, valorActual) => acumulador + valorActual.abono, 0);

    const Ocasionales = InformeMonth.Ocasionales.reduce((acumulador, valorActual) => acumulador + valorActual.Abono, 0);

    const Minibar = InformeMonth.queryOne.reduce((acumulador, valorActual) => acumulador + valorActual.total_mes, 0);

    const Tienda = InformeMonth.queryTwo.reduce((acumulador, valorActual) => acumulador + valorActual.total, 0);

    const tiendaOcasionales = InformeMonth.queryThree.reduce((acumulador, valorActual) => acumulador + valorActual.Precio, 0);

    const totalHospedaje = Hospedaje +Ocasionales +Minibar +Tienda +tiendaOcasionales

    const [selectedDay, setSelectedDay] = useState(moment());



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
                                                        placeholder="Buscar fecha" 
                                                        value={selectedDay.format('YYYY-MM-DD')} 
                                                        />
                                                    </div>
                                                </div>
                                                

                                                   
            
                                                <div className="flex gap-4 justify-center items-center" >
                                                <Tooltip content="Hospedaje" color="success">
                                                     <Button 
                                                        size="lg" 
                                                        color="success" 
                                                        icon={<PiMicrosoftExcelLogoLight 
                                                        fontSize={30} />}>{Hospedaje.toLocaleString()}
                                                    </Button>  
                                                </Tooltip>

                                                <Tooltip content="Ocasionales" color="error">
                                                     <Button 
                                                        size="lg"
                                                        color="error" 
                                                        icon={<PiMicrosoftExcelLogoLight fontSize={30} />}>{Ocasionales.toLocaleString()}
                                                    </Button>  
                                                </Tooltip>

                                                <Tooltip content="Minibar" color="primary">
                                                     <Button 
                                                        size="lg" 
                                                        color="primary" 
                                                        icon={<PiMicrosoftExcelLogoLight fontSize={30} />}>{Minibar.toLocaleString()}
                                                    </Button>  
                                                </Tooltip>
                                                <Tooltip content="Tienda" color="warning">
                                                     <Button 
                                                            size="lg" 
                                                            color="warning" 
                                                            icon={<PiMicrosoftExcelLogoLight 
                                                            fontSize={30} />}>{Tienda.toLocaleString()}
                                                    </Button>  
                                                </Tooltip>

                                                <Tooltip content="Tienda ocasionales" color="secondary">
                                                     <Button size="lg"
                                                             color="secondary"
                                                                icon={<PiMicrosoftExcelLogoLight fontSize={30} />}>{tiendaOcasionales.toLocaleString()}
                                                    </Button>  
                                                </Tooltip>
                                                   
                                                </div>

                                               
                                            <div>

                                            <div className="flex gap-4 justify-center items-center" >
                                                <br />
                                                <Tooltip content="Hospedaje" color="success">
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
