import { AiOutlineFieldTime ,AiOutlineDelete,AiOutlineDeliveredProcedure,AiOutlineDownload,AiOutlineHeart,AiOutlineIssuesClose} from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BiTaxi } from "react-icons/bi";
import { AiOutlineSafetyCertificate ,AiOutlineShoppingCart} from "react-icons/ai";
import { AiOutlineContainer,AiOutlineCopy ,AiOutlineCreditCard ,AiOutlineBook,AiOutlineFileAdd,AiOutlineFilePpt  ,AiOutlineProfile     } from "react-icons/ai";
import { IoBedOutline } from "react-icons/io5";

export const contextMenuOptions = [
    { label: 'Asignar tiempo', action: 'asignar',icon:<AiOutlineFieldTime fontSize={20} style={{marginRight:"8px"}}  /> },
    { label: 'Eliminar', action: 'delete' ,icon:<AiOutlineDelete fontSize={20} style={{marginRight:"8px"}} />},
    { label: 'Facturar', action: 'Facturar' ,icon:<AiOutlineDeliveredProcedure fontSize={20} style={{marginRight:"8px"}} /> },
    { label: 'Editar', action: 'delete' ,icon:<AiOutlineDownload fontSize={20}  style={{marginRight:"8px"}}/> },
    { label: 'Copiar', action: 'delete'  ,icon:<AiOutlineHeart fontSize={20} style={{marginRight:"8px"}} />},
    { label: 'Actualizar', action: 'delete' ,icon:<AiOutlineIssuesClose fontSize={20} style={{marginRight:"8px"}} /> },
];

export const contextMenuOptionsHeader = [
    { label: 'Bictacoras', action: 'Bictacoras' ,icon:<AiOutlineSafetyCertificate fontSize={20} style={{marginRight:"8px"}} />},
    { label: 'Tienda', action: 'Tienda' ,icon:<AiOutlineShoppingCart fontSize={20} style={{marginRight:"8px"}} /> },
    { label: 'Taxi', action: 'Taxi' ,icon:<BiTaxi fontSize={20} style={{marginRight:"8px"}} /> },
    { label: 'Salir', action: 'Salir' ,icon:<RiLogoutBoxLine fontSize={20} style={{marginRight:"8px"}} /> },
];


export const contextMenuOptionsInform = [
    { label: 'Informe Camareria', action: 'Camareria' ,icon:<AiOutlineContainer  fontSize={20} style={{marginRight:"8px"}} />},
    { label: 'Informe auditoría', action: 'auditoría' ,icon:<AiOutlineCopy  fontSize={20} style={{marginRight:"8px"}} /> },
    { label: 'Informe room to sell', action: 'sell' ,icon:<AiOutlineCreditCard  fontSize={20} style={{marginRight:"8px"}} /> },
    { label: 'Informe tienda', action: 'tienda' ,icon:<AiOutlineDeliveredProcedure  fontSize={20} style={{marginRight:"8px"}} /> },
    { label: 'Informe cuentas pendientes', action: 'pendientes' ,icon:<AiOutlineBook  fontSize={20} style={{marginRight:"8px"}} /> },
    { label: 'Informe consolidado', action: 'consolidado' ,icon:<AiOutlineFileAdd  fontSize={20} style={{marginRight:"8px"}} /> },
    { label: 'Informe movimiento', action: 'movimiento' ,icon:<AiOutlineFilePpt  fontSize={20} style={{marginRight:"8px"}} /> },
    { label: 'Informe contabilidad', action: 'contabilidadad' ,icon:<AiOutlineProfile   fontSize={20} style={{marginRight:"8px"}} /> },
];

export const contextMenuOptionsReservation = [
    { label: 'Crear Reserva', action: 'Reservation' ,icon:<IoBedOutline   fontSize={20} style={{marginRight:"8px"}} />},
    { label: 'Ver habitaciones', action: 'Room' ,icon:<IoBedOutline   fontSize={20} style={{marginRight:"8px"}} /> },
    { label: 'Ver Ocasioanales', action: 'Ocasional' ,icon:<IoBedOutline   fontSize={20} style={{marginRight:"8px"}} /> },
];