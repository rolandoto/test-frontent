import react from "react"
import { useContext } from "react"
import { useState } from "react"
import  AutoProvider  from "../../privateRoute/AutoProvider"
import ServiceInfomeMovimientoPost from "../../service/ServiceInformeMovimientoPost"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import LoadingDetail from "../../Ui/LoadingDetail"
import { CiUser } from "react-icons/ci";
import Swal from 'sweetalert2'
import moment from "moment"
import "moment/locale/es";
import ButtonBack from "../../component/ButtonBack"
import ButtonHome from "../../component/ButtonHome"
import { StyleSpan, StyleSpanIcons, StyledContextMenuTypeRoomCamareria, StyledMenuItemSelectedRoom } from "../../stylecomponent/StyleMenu"
import { CiSearch } from "react-icons/ci";
import { RxDropdownMenu } from "react-icons/rx";
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { 
    DateRange , 
    Range, 
    RangeKeyDict
  } from 'react-date-range';

const ExportButton = ({ data, filename }) => {
    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
      XLSX.writeFile(wb, filename);
    };
  
    return (
        <button className="button-informe-cosultar-excel"  onClick={exportToExcel} >Descargar Excel</button>

    );
  };


const InformeMovimiento =() =>{

    const [LookinforFecha,setLokinforFecha] =useState()
    const {jwt} = useContext(AutoProvider)
    const [state,setState] =useState()
    const [OpenTypeRoom,setTypeRoom] =useState(false)
    const [username,setUsername] =useState("")
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });


    
    const [stateFecha, setStateFecha] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }

    const handConsultar = ()  =>{
        ServiceInfomeMovimientoPost({id:jwt.result.id_hotel,fecha:LookinforFecha}).then(index => {
            setState(index.query)
        }).catch(e =>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '<p>No encontro ningun dato</p>',
                showConfirmButton: false,
                timer: 1000
              })
        })
    }


    const filtrarSearchingRoom = (terminoBusqueda, fechaDesde, fechaHasta) => {
		let resultadosBusquedaRoom = state?.filter((elemento, index) => {
			// Filtrar por término de búsqueda
			const condicionBusqueda = elemento.Movimiento?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
			
            let condicionFechas = true;
            if (fechaDesde && fechaHasta) {
                const fechaInicio = moment(elemento.Fecha).utc().format('YYYY/MM/DD');
                const fechaFin = moment(elemento.Fecha).utc().format('YYYY/MM/DD');
                condicionFechas = moment(fechaInicio).isBetween(moment(fechaDesde), moment(fechaHasta), null, '[]') ||
                                  moment(fechaFin).isBetween(moment(fechaDesde), moment(fechaHasta), null, '[]');
            }   
    
            // Retornar elemento si cumple con ambas condiciones
            return condicionBusqueda && condicionFechas;
		});

        return {resultadosBusquedaRoom}
	}; 
    
    

    const  type_room =  [   
        {   
            type_name:"Creación",
            name:"Reservas creadas",
        },
    ]
    
    const handClick =(event) => {
        setUsername(event)
        setTypeRoom(false)
    }


    const handClickOpentypeRoom =() =>{
		setContextMenuPosition({top:700, left: 168})
		setTypeRoom(!OpenTypeRoom)
	}


    const formattedStartDate = moment(stateFecha[0].startDate).format('YYYY/MM/DD');
    const formattedEndDate = moment(stateFecha[0].endDate).format('YYYY/MM/DD');

    const {resultadosBusquedaRoom} = filtrarSearchingRoom(username, formattedStartDate, formattedEndDate) 

    const generarPDF = () => {
        const doc = new jsPDF();
        const margen = 10;
        let y = margen;
        const nombresImpresos = new Set(); // Conjunto para almacenar nombres ya impresos
    
        resultadosBusquedaRoom?.forEach(reserva => {
            const nombre = reserva.Nombre_recepcion;
            if (!nombresImpresos.has(nombre)) { // Verificar si el nombre ya ha sido impreso
                const textoHeight = doc.getTextDimensions(nombre).h;
                if (y + textoHeight > doc.internal.pageSize.height - margen) {
                    doc.addPage();
                    y = margen;
                }
                // Establecer estilo para el nombre
                doc.setFontStyle("bold");
                doc.setFontSize(14);
                doc.text(margen, y, nombre);
                y += textoHeight + 5;
                nombresImpresos.add(nombre); // Agregar el nombre al conjunto de nombres impresos
            }
    
            const movimiento = reserva.Movimiento;
            const NombreCanal = reserva.Nombre;
            const ValorHabitacion = reserva.Valor_habitacion;

            const fecha =  moment(reserva.Fecha).utc().format('YYYY-MM-DD HH:mm:ss ')

            const textoMovimientoHeight = doc.getTextDimensions(movimiento).h;
            if (y + textoMovimientoHeight > doc.internal.pageSize.height - margen) {
                doc.addPage();
                y = margen;
            }

            doc.setFontStyle("normal");
            doc.setFontSize(12);
            doc.text(margen, y,`Fecha creacion: ${fecha}` );
            y += textoMovimientoHeight + 5;
            // Establecer estilo para el movimiento
            doc.setFontStyle("normal");
            doc.setFontSize(12);
            doc.text(margen, y, movimiento);
            y += textoMovimientoHeight + 5;
            doc.setFontStyle("bold");
            doc.setFontSize(12);
            doc.text(margen, y, `Canal de reserva: ${NombreCanal}`);
            y += textoMovimientoHeight + 5;


            const valorFormateado = parseFloat(ValorHabitacion).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            doc.setFontStyle("bold");
            doc.setFontSize(12);
            doc.text(margen, y, `Total del Hospedaje: ${valorFormateado}`);
            y += textoMovimientoHeight + 5;

           
        });
    
        doc.save('reservas.pdf');
    };
    
    const filterReservation = resultadosBusquedaRoom?.map((reservation) => {

        const Recepcionista = reservation.Nombre_recepcion
        const Fecha =  moment(reservation.Fecha).utc().format('YYYY-MM-DD HH:mm:ss ')
        const Movimiento = reservation.Movimiento
        const valor =  parseInt(reservation.Valor_habitacion)
        const ValorHabitacion =  valor.toLocaleString()  
        const Canal = reservation.Nombre

        return  {Recepcionista,Movimiento,ValorHabitacion,Canal,Fecha}

    });





    return (
        <ContainerGlobal>

            <LoadingDetail
                        loading={true}
                        titleLoading={"Informe movimiento"}  />
            <ButtonBack/>
            <ButtonHome/>
               <div>
               <DateRange 
                color="black"
                rangeColors={['#262626']}
                onChange={(item) => setStateFecha([item.selection])}
                showSelectionPreview={false}
                moveRangeOnFirstSelection={true}
                months={2}
                showDateDisplay={false}
                ranges={stateFecha}
                disabledDates={[]}
                direction="horizontal"
               
                />
                <br />
                <br />
                <button className="button-informe-cosultar" onClick={handConsultar} >Consultar</button>
                <br />
            </div>
            <br />
                <button className="button-informe-cosultar-pdf"  onClick={generarPDF} >Descargar pdf</button>
            <br />
            <br />
            <ExportButton data={filterReservation} filename="output.xlsx" />
          
           {state &&  <div className="Row-bar-one"  onClick={handClickOpentypeRoom}>
							<RxDropdownMenu   fontSize={18}   />
			</div> 
           
             } 


         
            {OpenTypeRoom &&

            
					<StyledContextMenuTypeRoomCamareria className="fade-in" top={contextMenuPosition.top} left={contextMenuPosition.left} >
						
						{type_room?.map((option, index) => {

							return (
							<StyledMenuItemSelectedRoom
                                onClick={(e) =>handClick(option.type_name)}
								key={index}>
								<StyleSpanIcons   > <CiSearch fontWeight={"500"}  fontSize={20} /></StyleSpanIcons> 
								<StyleSpan>{option.name} </StyleSpan>
							</StyledMenuItemSelectedRoom>
							)
						})}
					</StyledContextMenuTypeRoomCamareria>
				}
                

        
            {resultadosBusquedaRoom?.map(index => {

                const fecha =  moment(index.Fecha).utc().format('YYYY-MM-DD HH:mm:ss ')
                
                return (
                    <div className="card-one" > 
                        <div className="display-flex-card" >
                        <div>   
                                <div className="flex-card-One" >
                                    <span><CiUser fontSize={30} color="black" /></span>
                                    <span  >{index.Nombre_recepcion}</span>
                                </div>
                                <h4 className="let-letra-movimiento" >{index.Movimiento}</h4>
                            </div>
                                
                            <div>
                                <span>{fecha}</span>
                            </div>
                            
                        </div>
                
                    </div>
                )

            })}

        </ContainerGlobal>
    )

}

export default InformeMovimiento