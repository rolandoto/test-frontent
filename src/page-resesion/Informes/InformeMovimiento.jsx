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


const InformeMovimiento =() =>{

    const [LookinforFecha,setLokinforFecha] =useState()
    const {jwt} = useContext(AutoProvider)
    const [state,setState] =useState()
    const [OpenTypeRoom,setTypeRoom] =useState(false)
    const [username,setUsername] =useState("")
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });

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


    const filtrarSearchingRoom = (terminoBusqueda) => {
		let resultadosBusquedaRoom = state?.filter((elemento, index) => {
			// Filtrar por término de búsqueda
			const condicionBusqueda = elemento.Movimiento?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
			
			return condicionBusqueda ;
		});
	
		return { resultadosBusquedaRoom };
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
		setContextMenuPosition({top:230, left: 168})
		setTypeRoom(!OpenTypeRoom)
	}



    const {resultadosBusquedaRoom} = filtrarSearchingRoom(username) 

    console.log(resultadosBusquedaRoom)

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
            const textoMovimientoHeight = doc.getTextDimensions(movimiento).h;
            if (y + textoMovimientoHeight > doc.internal.pageSize.height - margen) {
                doc.addPage();
                y = margen;
            }
            // Establecer estilo para el movimiento
            doc.setFontStyle("normal");
            doc.setFontSize(12);
            doc.text(margen, y, movimiento);
            y += textoMovimientoHeight + 5;
        });
    
        doc.save('reservas.pdf');
    };
    


    return (
        <ContainerGlobal>

            <LoadingDetail
                        loading={true}
                        titleLoading={"Informe movimiento"}  />
            <ButtonBack/>
            <ButtonHome/>
               <div>
                <input type="date" className="input-selecto-dasboard-n1-reservaction" onChange={hadChangeFecha} value={LookinforFecha}   />
                <br />
                <br />
                <button className="button-informe-cosultar" onClick={handConsultar} >Consultar</button>
             
            </div>
            <br />
            <button className="button-informe-cosultar-pdf"  onClick={generarPDF} >Descargar pdf</button>

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