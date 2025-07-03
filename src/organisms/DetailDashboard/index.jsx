import React, { useContext, useEffect, useRef, useState } from "react"
import moment from "moment";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import "./style.css"
import ServiceUpdateReservation from "../../service/ServiceUpdatereservation";
import {useParams} from "react-router-dom"
import LoadingDetail from "../../Ui/LoadingDetail";
import {useHistory} from "react-router-dom"
import ServiceUpdateReservationpay from "../../service/ServiceUpdatereservationpay";
import useDate from "../../hooks/useDate";
import AutoProvider from "../../privateRoute/AutoProvider";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';  
import { CiEdit } from "react-icons/ci";
import ServiceAddHuespedes from "../../service/ServiceAddHuespedes";
import UsePrice from "../../hooks/UsePrice";
import { SocketRoute, config } from "../../config";
import ServiDelteReservation from "../../service/ServiDelecteReservation";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import ServicePayReservationSore from "../../service/ServicePayReservationSore";
import { VscSymbolEvent ,VscSignOut} from "react-icons/vsc";
import { VscVerified} from "react-icons/vsc";
import HttpClient from "../../HttpClient"
import Swal from 'sweetalert2'
import ReactTooltip from "react-tooltip";
import ServiceInfomeMovimiento from "../../service/ServiceInformeMovimiento";
import {BsCheckCircle,BsBell} from "react-icons/bs";
import UseModalText from "../../hooks/UseModalText";
import { Button,Table as table,Tooltip, User } from "@nextui-org/react";
import { CiBadgeDollar ,CiExport,CiCirclePlus} from "react-icons/ci";
import { PiUsersLight,PiShoppingBagOpenLight,PiPaypalLogoLight } from "react-icons/pi";
import { toast } from "react-hot-toast";
import HistorialDetailReservation from "../../component/HistorialDetailReservation";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import jsPDF from "jspdf"; // check the docs for this: https://parall.ax/products/jspdf
import html2canvas from "html2canvas";
import { FaFileInvoice } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import UseDianActions from "../../action/useDianActions";
import ButtonBack from "../../component/ButtonBack";
import ButtonHome from "../../component/ButtonHome";
import TableInvoinceDian from "../../component/TableInvoinceDian";
import useUpdateDetailPointerActions from "../../action/useUpdateDetailPointerActions";
import useSocket from "../../hooks/UseSocket";
import { IoTicketOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFilePdf } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import IconsUser from "../../component/IconUser";
import CardHistoryReservationDetail from "../../component/CardHistoryReservationDetail";
import CardDownloadPayment from "../../component/CardDownloadPayment";
import html2pdf from 'html2pdf.js';

// Estilo para el título
const titleStyle = {
  fontSize: 20,
  fontStyle: 'normal',
  textColor: 'Black',
  fontWeight:"lighter"
};

// Estilo para el subtítulo
const subtitleStyle = {
  fontSize: 12,
  fontStyle: 'normal',
  textColor: 'black',
  fontWeight: '500'
};

// Estilo para el cuerpo del texto
const bodyStyle = {
  fontSize: 12,
  fontStyle: 'normal',
  textColor: 'black'
};

//const socket = io.connect(`${SocketRoute.serverRoute}`);

const DetailDasboard =(props) =>{

	const socket = useSocket();

  
    const {id} = useParams()
    const [state,setState] =useState(true)
  
    const {DetailDashboard,postInsertTarifas,handClickLoading,fetchWhatsapp} = props
    const [loading,setLoading] =useState({loading:false,error:false})
    const history = useHistory()
    const {jwt,Dian} = useContext(AutoProvider)

    const resultDashboard = DetailDashboard[0]

    const documentByIdRoom =  resultDashboard?.Num_documento +""+id
    const fin = moment(resultDashboard?.Fecha_final).utc().format('DD/MM/YYYY')
   
    const initOne = moment(resultDashboard?.Fecha_inicio).utc();

  
    const finOne = moment(resultDashboard?.Fecha_final).utc();
    const init = moment(resultDashboard?.Fecha_inicio, "YYYY-MM-DD").utc(); // Ajusta el formato según el dato real
    const finFormat = moment(resultDashboard?.Fecha_inicio).utc().format('DD/MM/YYYY')
    const nowChecking = moment().utc(); // Fecha actual en UTC
  
 
    // Calcula la diferencia en días entre las fechas
    const diffInDays = finOne.diff(initOne, 'days');
    
    // Resta uno para excluir el día de llegada
    const day = diffInDays + 1;
    

    const print = () => {
      const input = document.getElementById("printThis");
      const pdf = new jsPDF({
        format: [500, 1100] // Custom size: width = 500, height = 1100 (in units, default is mm)
      });
      pdf.setFont('helvetica');
      html2canvas(input, {scale:0.1}).then((canvas) => {
        const pdf = new jsPDF({
          orientation: "landscape",
        
          format: [800, 800]
      });
      
      pdf.setFont('helvetica');
      
      //const base64ImageData ="https://grupo-hoteles.com/storage/app/1/page/393791917-1-page-logo-Grupo%20Hoteles.png"
      //pdf.addImage(base64ImageData,"jpg",10,10,10,10)
      // Título
      pdf.setTextColor(titleStyle.textColor);
      pdf.setFontSize(titleStyle.fontSize);
      pdf.setFontStyle(titleStyle.fontStyle);
      pdf.text(10, 10, "Comprobante de reserva");
      pdf.text(180, 10, jwt?.result?.hotel);
      
      // Subtítulo
      pdf.setTextColor(subtitleStyle.textColor);
      pdf.setFontSize(subtitleStyle.fontSize);
      pdf.setFontStyle(subtitleStyle.fontStyle);
      pdf.text(10, 30, "Tu codigo de Reservas:");
      
      // Cuerpo del texto
      pdf.setTextColor(bodyStyle.textColor);
      pdf.setFontSize(bodyStyle.fontSize);
      pdf.setFontStyle(bodyStyle.fontStyle);
      pdf.text(10, 37, `X14A-${documentByIdRoom}`);
      
      pdf.setTextColor(bodyStyle.textColor);
      pdf.setFontSize(bodyStyle.fontSize);
      pdf.setFontStyle(bodyStyle.fontStyle);
      pdf.text(10, 45, `Realiza:  ${resultDashboard?.Nombre} ${resultDashboard?.Apellido}`);

      pdf.setTextColor(bodyStyle.textColor);
      pdf.setFontSize(bodyStyle.fontSize);
      pdf.setFontStyle(bodyStyle.fontStyle);
      pdf.text(10, 62, `Habitacion:  ${resultDashboard?.nombre_habitacion}`);

      pdf.setTextColor(bodyStyle.textColor);
      pdf.setFontSize(bodyStyle.fontSize);
      pdf.setFontStyle(bodyStyle.fontStyle);
      pdf.text(10, 70, `Titular Reserva: ${resultDashboard?.Nombre} ${resultDashboard?.Apellido}`);


      pdf.text(10, 79, `Abono Reservas: $${parseInt(resultDashboard.valor_abono).toLocaleString()}`);
      pdf.text(10, 88, `Tarifa: $${parseInt(resultDashboard.valor_habitacion).toLocaleString()}`);

      pdf.text(10, 110, `Telefono: ${parseInt(resultDashboard.Celular)}`);
      pdf.text(10, 119, `Identificaion: ${(resultDashboard.Num_documento)}`);
      pdf.text(10, 128, `Correo: ${resultDashboard.Correo}`);
      pdf.text(10, 135, `_____________________________________________________________________________________________________`);

      //10 rigth side  150 is the top 
      pdf.text(10, 145, `Entrada:`);
      pdf.text(10, 153, `${init}`);
      pdf.text(150, 148, `Salida:`);
      pdf.text(150, 154, `${fin}:`);

      pdf.text(10, 170, `Check in:`);
      pdf.text(10, 176, `3:00 PM`);
      pdf.text(150, 171, `Check out:`);
      pdf.text(150, 177, `1:00 PM:`);

      pdf.text(10, 180, `_____________________________________________________________________________________________________`);
        // Add text or other content to the PDF
      pdf.text(10, 190, `Habitacion:`);
      pdf.text(10, 198, `${resultDashboard.Numero} ${resultDashboard?.nombre_habitacion}`);
      pdf.text(80, 190, `adultos:`);
      pdf.text(80, 198, `${resultDashboard.Adultos}`);
      pdf.text(150, 190, `Niños:`);
      pdf.text(150, 198, `${resultDashboard.Ninos}`);
     // pdf.text(10, 210, `Direccion: Cl. 47 #41-55, La Candelaria, Medellín`);
      pdf.save("download.pdf"); // Guarda el PDF
      });
    };


    const terms =`TÉRMINOS Y CONDICIONES - CONTRATO DE HOSPEDAJE
    1. Conforme a los artículos 79 y 81 de la Ley 300 de 1996, la Tarjeta de Registro Hotelero es prueba de la celebración del contrato de hospedaje entre el HOTEL y el HUÉSPED. El contrato es aceptado por la firma del HUÉSPED. El presente contrato es de adhesión, por tal
    motivo el HUÉSPED se adhiere a las estipulaciones aquí contenidas. 2. El HUÉSPED conoce y acepta la conformidad del tipo de habitación, la tarifa cobrada por el servicio de hospedaje, así como las fechas de llegada y de salida consignadas en la Tarjeta de Registro
    Hotelero. La hora para efectuar el check in es a partir de las 15:00 horas y para efectuar el checkout es hasta las 13:00 horas y que el ingreso temprano (early check in) o salida tarde (late check out) podrá generar costos adicionales. El ingreso anticipado o la salida con
    posterioridad a la hora indicada estará sujeta a disponibilidad y el HUÉSPED deberá pagar el valor correspondiente que tenga establecido el hotel. 3. PRECIO. La habitación y el precio o tarifa por noche será la que se indique en la Tarjeta de Registro Hotelero y que
    corresponde a la reserva. 3.1.- El precio del hospedaje corresponde al canon por noche que el HUÉSPED se obliga a pagar y que asciende a la suma que se indica en la Tarjeta de Registro Hotelero y corresponde a la reserva efectuada. 3.2.- El HUÉSPED deberá pagar
    también todos los cargos por concepto de alimentos, bebidas, lavandería y en general por todos aquellos que se generen durante su estadía y que decida cargar a su cuenta. 3.3.- El HUÉSPED declara que ha sido informado de las tarifas, cánones y en general precios de
    las habitaciones por noche. 3.4.- El incumplimiento del pago acordado generará a cargo del HUÉSPED intereses de mora a la tasa máxima permitida, conforme al artículo 884 del código de comercio. 3.5.- El HUÉSPED, sus acompañantes y la agencia de viajes son
    solidariamente responsables conforme al artículo 81 de la Ley 300 de1996. 3.6. El pago podrá ser exigido por adelantado y/o de manera parcial, a juicio del HOTEL. El HUÉSPED podrá garantizar el pago al hotel mediante la firma de un pagare o voucher de alguna tarjeta
    de crédito aceptada por el HOTEL. 3.7. El HUÉSPED autoriza el envió de la factura al correo electrónico informado. 3.8. El HUÉSPED conoce y acepta la tarifa del hospedaje deberá ser prepagada y los consumos adicionales garantizados (tarjeta de crédito o depósito). En
    caso que la garantía sea tarjeta de crédito, autorizo el diligenciamiento del voucher y su presentación ante la respectiva entidad bancaria.4. OBLIGACIONES DEL HUÉSPED. 4.1.- Identificarse para registrarse en el HOTEL con documento de identidad idóneo, presentando su
    cédula de ciudadanía en caso de ser colombiano o su pasaporte o documento aplicable tratándose de extranjeros. Para menores de edad, deberá presentarse documento de identificación válido. 4.2.-Pagar el valor del hospedaje más los impuestos correspondientes. 4.3.-
    Pagar el valor de todos los consumos y cargos que haya hecho a su cuenta. 4.4.- Observar una conducta decorosa y vestir de manera apropiada. 4.5.-Responder hasta la culpa leve de sus obligaciones y las de sus acompañantes o invitados. 4.6.- Registrar en la recepción
    del hotel a todos los acompañantes o invitados del HUÉSPED que se dirijan a su habitación y pagar el canon o valor correspondiente por cada uno de ellos. 4.7.- Respetar el número de personas por habitación. 4.8.- Utilizar los muebles, enseres, equipos, tarjetas o llaves
    asignadas para abrir la habitación y en general las facilidades tanto de la habitación como del HOTEL, de manera adecuada conservándolas en el estado en que se encuentren y por tanto responderá por cualquier daño o pérdida de los elementos y bienes del HOTEL,
    hasta por la culpa leve. En caso de pérdida o daño total o parcial de los bienes del HOTEL por causa atribuible al HUÉSPED o a sus acompañantes, el HUÉSPED deberá pagar el precio correspondiente a su reparación o reposición, según el caso. 4.10.- Permitir el derecho
    de inspección y/o vigilancia a la habitación por parte de funcionarios del HOTEL. Este derecho se ejercerá de manera razonable e incluye la facultad de penetrar o registrar la habitación cuando a juicio del Gerente del HOTEL sea preciso. 4.12.- Permitir a los empleados y
    funcionarios del HOTEL el acceso para labores de rutina y limpieza de la habitación.5. TERMINACIÓN DEL CONTRATO. El contrato de hospedaje terminará por: 5.1- Por vencimiento del plazo pactado. 5.2.- Por incumplimiento de cualquiera de las obligaciones a cargo de
    las partes y puntualmente por el incumplimiento del pago del precio o canon a cargo del HUÉSPED o por incumplimiento del pago de los alimentos y bebidas o demás servicios complementarios que el HUÉSPED hubiera cargado a la habitación o a su cuenta personal.
    5.3.- En los eventos en que, a juicio exclusivo del HOTEL, el comportamiento o la indumentaria del HUÉSPED atente contra la tranquilidad y/o salubridad de los demás huéspedes o de los visitantes del HOTEL. 5.4.- Por fumar en la habitación o en cualquier otro espacio
    libre de humo del hotel, cuando se afecten otros huéspedes, visitantes o usuarios y sin perjuicio del pago que deberá hacer en los términos que se establecen más adelante. Parágrafo: La terminación del contrato no exonera ni libera al HUÉSPED del pago de los saldos
    pendientes.6. EFECTOS DE LA TERMINACIÓN. 6.1.- A la terminación del contrato el HOTEL podrá disponer libremente de la habitación. 6.2.- A la terminación del contrato y con independencia de la causa de terminación, el HOTEL queda facultado para ingresar a la
    habitación, elaborar y suscribir un inventario de los efectos y equipaje del huésped y retirarlos de la habitación para dejarlos en depósito seguro y adecuado, sin responsabilidad del HOTEL y por cuenta y riesgo del HUÉSPED. 6.3.- Si el HUÉSPED no pagaré la cuenta o
    parte de ella, el HOTEL podrá disponer y vender el equipaje y objetos del HUÉSPED y sus acompañantes en los términos del artículo 1199 del Código de Comercio, para cubrir con su producto las obligaciones pendientes. El excedente si lo hubiere, será puesto a
    disposición del HUÉSPED. En caso de déficit, el HOTEL podrá iniciar las acciones correspondientes para conseguir el pago total de la suma adeudada.7. CUSTODIA DE DINERO Y OBJETOS DE VALOR. El HUÉSPED conoce y acepta la exclusión de responsabilidad del
    establecimiento hotelero por la pérdida o sustracción de los bienes que no sea entregados al hotel a título de depósito o guardados con las debidas medidas de seguridad. Conforme al artículo 1195 del Código de Comercio, los HUÉSPEDES podrán entregar bajo recibo al
    HOTEL dinero y objetos de valor para su custodia. La entrega deberá hacerse ante el funcionario designado por el HOTEL y deberá levantarse un acta donde se relacione el dinero o los objetos entregados. La responsabilidad del HOTEL será la del depositario, en los
    términos del artículo 1196 del Código de Comercio. Los objetos de valor como joyas, cámaras, dinero, computadores, celulares, equipos o utensilios que permanezcan en la habitación o áreas de servicios diferentes las que el HOTEL dispone para depósito, estarán bajo el
    único riesgo del HUÉSPED ya que en este caso el HOTEL no asume responsabilidad alguna, en caso de pérdida o deterioro.8. El HUÉSPED conoce y acepta las medidas políticas comerciales y de seguridad establecidas por el HOTEL para el ingreso de visitantes y huéspedes
    adicionales. EL HUÉSPED conoce y acepta que el ingreso de personas o huéspedes adicionales genera y causa el cobro de tarifas de hospedaje por dichos huéspedes que no fueron incluidos en la reserva. El HOTEL se reserva el derecho de admitir el ingreso de huéspedes
    adicionales o acompañantes a su simple discrecionalidad. Se debe demostrar por cualquier medio probatorio idóneo el parentesco con el menor (es) cuando el (los) hagan uso de la misma habitación asignada. Todo menor de edad debe hospedarse en compañía de los
    padres y portar sus respectivos documentos de identificación. En caso de no estar en compañía de sus padres, podrá ser realizado por el familiar mayor de edad responsable del menor, debidamente autorizado por al menos uno de los padres. La autorización deberá
    constar por escrito firmado y notariado por uno de los padres e indicar que el menor se encuentra bajo su cuidado. El HOTEL rechaza y no permite la explotación sexual ni cualquier forma de abuso sexual. El HOTEL rechaza y no permite el turismo sexual ni permite la
    explotación ni el abuso sexual de niñas, niños ni adolescentes. El HUÉSPED no podrá ingresar a su habitación menores de dieciocho (18) años de edad para el turismo sexual y quien lo haga incurrirá en las sanciones penales que consagre la ley colombiana.9. El
    establecimiento hotelero se reserva el derecho de prorrogar el presente contrato de hospedaje a sufinalización.10. El HUÉSPED acepta que la suma liquida de dinero que conste en la factura prestara merito ejecutivo.11.El HUÉSPED conoce que la tarifa del hospedaje
    deberá ser prepagada y los consumos adicionales garantizados mediante tarjeta de crédito o depósito. En caso que la garantía sea tarjeta de crédito, el HUÉSPED autoriza el diligenciamiento del voucher y su presentación ante la respectiva entidad bancaria.12. Salvo los
    casos expresamente regulados por la Ley, el HOTEL se reserva el derecho de ingreso de mascotas a sus instalaciones. No se admiten mascotas y su incumplimiento podrá dar lugar a la terminación del contrato ya la imposición de multas establecidas en el contrato.13. El
    HOTEL es 100% libre de humo. La falta a esta regla esta sancionada por la ley colombiana y su incumplimiento podrá dar lugar a la terminación del contrato y a la imposición de multas establecidas en el en el hotel.14.El HUÉSPED conoce y acepta ser trasladado a utilizar
    otro hotel de características similares cuando en el hotel no haya disponibilidad inmediata.15.Cualquier afectación que haga el HUÉSPED y sus acompañantes al mobiliario del hotel e infraestructura, deberá ser asumida y pagada a los costos valorizados de estas
    afectaciones.16.Conforme a la Ley 1336 de 2009 y su reglamento que regula la materia, se combate y rechaza cualquier forma, método o procedimiento que implique o conlleve a la explotación sexual y/o pornográfica de niños, niñas y adolescentes, y en tal virtud de
    tener conocimiento de la mera intención de llevar a cabo tales actividades dentro de las instalaciones del hotel, procederá a informarlo a las autoridades competentes.17.Conforme a los establecido en la Ley 17 de 1981 y sus reglamentarios combate toda forma de
    comercialización y tráfico de fauna y flora así como el tráfico ilícito de bienes. El HOTEL promueve el cumplimiento de la resolución 572 de 2005 y demás normas de conservación de Flora y Fauna, así como la conservación delpatrimonio cultural y de los bienes de interés
    cultural y contribuye y promueve el cumplimiento de la ley 397de 1997 y demás normas aplicables. El HOTEL rechaza cualquier forma de discriminación, distinción, exclusión, restricción o preferencia por motivos de género, raza, color, origen nacional o étnico, religión,
    opinión política o por cualquier otro motivo o condición que tenga como propósito o que produzca como efecto deteriorar, restringir o limitar el goce completo de los derechos y libertades fundamentales.18. TÉRMINOS Y CONDICIONES DE CANCELACIÓN Y POLÍTICAS DE
    DEVOLUCIONES. El HUÉSPED puede ejercer derecho al retracto únicamente en compras no presenciales realizadas a través de portales web o en la central de reservas telefónica. La solicitud debe realizarla en máximo cinco (5) días hábiles posteriores a la confirmación de
    la compra. Si la fecha de ingreso es antes de los cinco días, no procederá el derecho al retracto y en caso de cancelación se aplicarán las condiciones de cancelación y devolución y que son: - Si la cancelación de la reserva se realiza de 8 o más días antes de la fecha de
    check in, se realizará una devolución del 80% correspondiente al valor depositado. – Si la cancelación de la reserva se realiza dentro de 8 a 3 días antes del check in se cobrará el 50% del valor depositado. – Si la cancelación de la reserva se realiza dentro de las 48 horas
    antes del check in se cobrará la totalidad del valor depositado. - En caso que estando alojado tenga una salida anticipada y se haya realizado el pago total del alojamiento, tendrá un saldo a favor que podrá utilizar en cualquier establecimiento en convenios con el hotel,
    que deberá redimirse en 1 año. Una vez recibida la solicitud si se aplica devolución con base a las políticas establecidas por el hotel, te reintegraremos el valor de devolución en un término máximo de 30 días calendarios contados a partir de tu solicitud. Lo realizaremos
    mediante consignación bancaria al titular de la reserva 19. MULTAS. Fumar en la habitación o en cualquier otro espacio del hotel constituye un incumplimiento grave del contrato de hospedaje que da lugar a su terminación y podrá ser retirado del HOTEL si ha afectado a
    otros huéspedes, visitantes o usuarios. Si el HUÉSPED fuma en la habitación, por cada día que lo haga deberá pagar(i) el costo en el que debe incurrir el HOTEL para desodorizar y limpiar la habitación, que se estima en una suma equivalente a CINCO SALARIOS MÍNIMOS
    DIARIOS LEGALES VIGENTES, y (ii) el valor de (2) noches a la tarifa correspondiente a su alojamiento, como quiera que el proceso de limpieza y desodorización implica que el HOTEL no pueda utilizar la habitación durante las siguientes dos (2) noches. Si fuma en cualquier
    área del hotel distinta de la habitación, deberá pagar el costo en que debe incurrir el HOTEL para desodorizar y limpiar el área en la que haya fumado, que equivale a CINCO SALARIOS MÍNIMOS DIARIOS LEGALES VIGENTES. El ingreso de mascotas sin la debida
    autorización se sancionará con multa de CINCO SALARIOS MÍNIMOS DIARIOS LEGALES VIGNETES por cada noche o ingreso de mascota no autorizada.20. El HUÉSPED conforme con lo establecido en la Ley 1581 de 2012 y sus reglamentarias, AUTORIZA irrevocablemente al
    HOTEL, sus titulares y operadores para recolectar, usar y tratar los datos personales suministrados por el HUÉSPED en la Tarjeta de Registro Hotelero con fines comerciales y de conformidad con las políticas de tratamiento de datos personales. El HUÉSPED autoriza la
    consulta y reporte ante centrales de riesgo de información sobre el cumplimiento de las obligaciones y/o pago de los servicios de hospedajes u hoteleros. El HUÉSPED, en su condición de titular de los datos personales, gozará de todos los derechos de ley y en particular
    tendrá derecho a conocer, acceder, actualizar y rectificar sus datos personales, revocar la autorización concedida o solicitar la supresión de información cuando ello sea procedente. El HUÉSPED autoriza expresamente al HOTEL y sus operadores, para recolectar y utilizar
    la información y los datos personales suministrados por el HUÉSPED en la Tarjeta de Registro Hotelero tales como nombre, dirección, identificación, nacionalidad, fechade nacimiento, dirección de correo electrónico, número de teléfono fijo y móvil o celular, preferencias
    e intereses personales, trabajo o actividad, de conformidad con las políticas de tratamiento seguro de la información establecidas por el propio Hotel y por las leyes vigentes con el propósito de consultar y reportar ante centrales de riesgo como PROCREDITO y
    DATACREDITO sobre el incumplimiento de obligaciones y/o pago de los servicios de hospedajes u hoteleros, realizar actividades de fidelización y contactar al titular de la información para enviarle encuestas de servicios luego de cada estadía que permitan la calificación
    del servicio prestado, y comunicarle las invitaciones, ofertas, promociones, portafolio de servicios o información general que este dirigida a que siga haciendo uso del Hotel o de otros hoteles afiliados y a ofrecerle los servicios correspondientes. El HUÉSPED autoriza que
    la información sea transferida, transmitida, compartida y suministrada al HOTEL, exclusivamente para los propósitos descritos previamente. El HUÉSPED, en su condición de titular de los datos personales, gozará de todos los derechos de ley, de los expresamente
    descritos en el artículo 8 de la Ley 1581 de 2012 y en particular tendrá derecho en todo momento a conocer, acceder, actualizar y rectificar sus datos personales, revocar la autorización concedida o solicitar la supresión de información cuando ello sea procedente.
    Autorizo también para que “la notificación” a que hace referencia el decreto 2952 del 06 de agosto de 2010 en su artículo 2°, se pueda surtir a través de mensaje de datos al correo electrónico informado en Tarjeta de Registro Hotelero.21. El HOTEL, su titular y/o su
    operador. 22. El HUESPED será responsable por cualquier daño, pérdida o deterioro ocasionado de manera intencional, por negligencia o por conducta imprudente, ya sea directamente o por parte de sus acompañantes, se encuentren o no registrados como huéspedes,
    en la habitación, en las instalaciones del hotel o en los bienes muebles e inmuebles del ESTABLECIMIENTO. El HUESPED autoriza de forma expresa e irrevocable al ESTABLECIMIENTO para realizar el correspondiente cargo a la tarjeta de crédito cuyo número haya sido
    proporcionado en el formulario de registro al momento del check-in, en caso de verificarse daños, pérdidas o deterioros atribuibles al HUESPED o a sus acompañantes. Dichos cargos solo se efectuarán una vez se haya elaborado un informe técnico de evaluación y se
    haya emitido el respectivo presupuesto o factura que respalde el valor de la reparación o reposición de los bienes afectados` 
    

    const printRegister = () => {
      html2canvas(document.getElementById("printThis"), { scale: 0.1 }).then(() => {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
    
        const config = {
          margins: { left: 10, right: 10, top: 5, bottom: 15 },
          columns: { col1X: 10, col2X: 110, valueOffset: 55 },
          spacing: { lineHeight: 5, sectionGap: 10, signatureGap: 8 },
          fonts: { bold: "bold", regular: "normal" }
        };
    
        const contentWidth = 190;
        const pageHeight = pdf.internal.pageSize.height;
        let currentY = config.margins.top;
    
        pdf.setFont("helvetica");
        pdf.setFontSize(8); // 👈 Aquí defines el tamaño global de letra
        // === FUNCIONES AUXILIARES ===
        const cleanValue = (value) => (value ?? "").toString().trim();
    
      
        const checkPageBreak = (requiredSpace = 20) => {
          if (currentY > pageHeight - requiredSpace) {
            pdf.addPage();
            currentY = config.margins.top;
            pdf.setFont("helvetica");
          }
        };
    
        const addField = (label, value, x, y) => {
          const fontSize = 8;
          const lineHeight = config.spacing.lineHeight;
        
          // Etiqueta (negrita)
          pdf.setFont(undefined, config.fonts.bold);
          pdf.setFontSize(fontSize);
          pdf.text(label, x, y);
        
          // Valor (normal, en múltiples líneas si es necesario)
          pdf.setFont(undefined, config.fonts.regular);
          pdf.setFontSize(fontSize);
        
          const clean = cleanValue(value);
          const valueX = x + config.columns.valueOffset;
          const maxWidth = 40; // espacio máximo para el texto, ajusta si es necesario
        
          const lines = pdf.splitTextToSize(clean, maxWidth);
        
          lines.forEach((line, idx) => {
            pdf.text(line, valueX, y + idx * lineHeight);
          });
        
          return y + lines.length * lineHeight;
        };
    
        const addJustifiedText = (text, width, x, startY) => {
          pdf.setFont(undefined, config.fonts.regular);
          pdf.setFontSize(5); // Tamaño reducido para términos
        
          const words = text.split(/\s+/);
          let line = '';
          let y = startY;
          const spaceWidth = pdf.getTextWidth(' ');
          const lineHeight = 2.2; // 👈 Esta es tu altura de línea real
        
          while (words.length) {
            const word = words.shift();
            const testLine = line + word + ' ';
            const testWidth = pdf.getTextWidth(testLine);
        
            if (testWidth > width && line !== '') {
              const lineWords = line.trim().split(/\s+/);
              const gaps = lineWords.length - 1;
              let extraSpace = width - pdf.getTextWidth(line.trim());
        
              if (gaps > 0) {
                const spaceBetweenWords = spaceWidth + extraSpace / gaps;
                let xPos = x;
        
                lineWords.forEach((w, idx) => {
                  pdf.text(w, xPos, y);
                  if (idx < gaps) {
                    xPos += pdf.getTextWidth(w) + spaceBetweenWords;
                  }
                });
              } else {
                pdf.text(line.trim(), x, y);
              }
        
              line = word + ' ';
              y += lineHeight;
              checkPageBreak();
            } else {
              line = testLine;
            }
          }
        
          if (line) {
            pdf.text(line.trim(), x, y);
            y += lineHeight;
          }
        
          return y;
        };
        

        const leftFields = [
          ["Nombre", `${cleanValue(resultDashboard?.Nombre)} ${cleanValue(resultDashboard?.Apellido)}`],
          ["Tipo de documento", "NIT"],
          ["Correo electrónico", resultDashboard?.Correo],
          ["Aduntos", resultDashboard?.Adultos],
          ["Precio total", valor_habitacion], // 👈 Aquí lo agregas
        ];
        leftFields.forEach(([label, value]) => {
          currentY = addField(label, value, config.columns.col1X, currentY);
        });
        
        // === DATOS DERECHA ===
        let rightY = config.margins.top;
        const rightFields = [
          ["No. Documento de identidad", resultDashboard?.Num_documento],

          ["Teléfono", resultDashboard?.Celular],
          ["Número de habitación", resultDashboard?.Numero],
        ];
        
        rightFields.forEach(([label, value]) => {
          rightY = addField(label, value, config.columns.col2X, rightY);
        });
        
        // === FECHAS DE HOSPEDAJE ===
        currentY = Math.max(currentY, rightY) + config.spacing.sectionGap;
        
        currentY = addField("Fecha de llegada", finFormat, config.columns.col1X, currentY);
        
        const dateY = currentY - config.spacing.lineHeight;
        addField("Fecha de salida", fin, config.columns.col2X, dateY);

        // === TÍTULO TÉRMINOS ===
        currentY += config.spacing.sectionGap;
        checkPageBreak(30);
        pdf.setFont(undefined, config.fonts.bold);
        pdf.setFontSize(10);
        pdf.text("TÉRMINOS Y CONDICIONES - CONTRATO DE HOSPEDAJE", config.margins.left, currentY);
    
        // === TEXTO JUSTIFICADO ===
        currentY += config.spacing.lineHeight;
        currentY = addJustifiedText(terms, contentWidth, config.margins.left, currentY);
    
        // === FIRMA ===
        currentY += config.spacing.signatureGap;
        checkPageBreak(30);
        pdf.setFontSize(8);
        pdf.setFont(undefined, config.fonts.regular);
    
        const signatureConfig = {
          line1: { start: config.margins.left, end: 90 },
          line2: { start: 120, end: 190 },
          labelOffset: 5
        };
    
        pdf.line(signatureConfig.line1.start, currentY, signatureConfig.line1.end, currentY);
        pdf.text("FIRMA", signatureConfig.line1.start, currentY + signatureConfig.labelOffset);
    
        pdf.line(signatureConfig.line2.start, currentY, signatureConfig.line2.end, currentY);
        pdf.text("No. DOCUMENTO", signatureConfig.line2.start, currentY + signatureConfig.labelOffset);
    
        // === GUARDAR ===
        pdf.save("comprobante_reserva.pdf");
      });
    };

    
	const {Room,filterRoom
	} = useSelector((state) => state.ReservationSlice)

    const message  =jwt?.result?.photo

    const totalId =  jwt.result.id_hotel == 23 ||  jwt.result.id_hotel == 5 || jwt.result.id_hotel == 6 || jwt.result.id_hotel == 12  || jwt.result.id_hotel == 10 || jwt.result.id_hotel == 2  ?  true : false

    const numbersRecepcion = jwt.result.id_hotel == 13 &&  "573022395096"|| jwt.result.id_hotel == 7 &&  "573022395096"|| jwt.result.id_hotel == 23 &&  "573022395096" || jwt.result.id_hotel == 3 &&  "573007785193"|| jwt.result.id_hotel == 4 &&  "573007785193"|| jwt.result.id_hotel == 8 &&  "573007785193" || jwt.result.id_hotel == 5 &&  "573195550001" || jwt.result.id_hotel == 6 &&  "573195550001" || jwt.result.id_hotel == 12 &&  "573195550001"

    const findPersona =  resultDashboard?.tipo_persona == "persona"
    const findEmpresa = resultDashboard?.tipo_persona =="empresa"
    const findFirma = resultDashboard?.Estado =="3" ||  resultDashboard?.Estado =="1"||resultDashboard?.Estado =="5" || resultDashboard?.Estado =="6"

    const avaiableRoom =     resultDashboard?.ID_estado_habitacion =="3"  ||resultDashboard?.ID_estado_habitacion =="2" 
    
    const avainleOcacisonal = resultDashboard?.ID_estado_habitacion =="7"

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',  
      currency: 'COP',
      minimumFractionDigits: 0
    })

    const [values, setValues] = React.useState({
        Nombre: null,
        Apellido: null,
        Celular: null,
        Num_documento: null,
        Adultos:null,
        Ninos:null,
        infantes:null,
        Mascotas:null,
        Fecha:null,
        Documento:null,
        Fecha_nacimiento:null,
        Nacionalidad:null,
        Correo:null,
        Celular:null,
        Ciudad:null
      });



      const pdfRef = useRef();

     

      const [Nombre,setNombre] =useState()
      const [Apellido,setApellido] =useState()
      const [Documento,setDocumento] =useState()
      const [Nacimiento,setNacimiento] =useState()
      const [Correo,setCorreo] =useState()
      const [Abono,setAbono]  =useState()
      const [tipoPersonas,setTipoPersona] =useState()
      const [isChecked, setIsChecked] = useState(findPersona);
      const [isChecke, setIsChecke] = useState(findEmpresa);
      const [espan,setspand] =useState()
      const [espanOne,setspandOne] =useState()
      const [huesped,setHuesped] =useState(false)
      const [detalle,setDetalle] =useState(false)
      const [consumo,setConsumo] =useState(false)
      const [pago,setPago] =useState(true)
      const [Invoince,setInvoinces] =useState(false)
      const [historialReservation,setHistorialReservation] =useState(false)
      const [quyery,setQuery] =useState()
      const [documnet,setDocument] = useState()
      const [country,setCountry] =useState()
      const [stateButton,setStateButton] =useState(false)
      const [adultos,setAdultos] =useState()
      const [ninos,setNinos] = useState()
      const [infantes,setInfantes] =useState()
      const [estadia,setStadia] =useState("")
      const [error,setError] =useState(false)
      const [errorAbono,setErrorAbono] =useState(false)
      const [product,setProduct] =useState()
      const [observacion,setObservacion] =useState()
      const [loadinConsumo,setLoadingConsumo] =useState(false)
      const [idRoom,setIdRoom] =useState()
      const [descripcion,setDescription] =useState(null)
      const [valorSolicitado, setValorSolicitado] = useState('');
      const [DateEmpresa, setDateEmpresa] = useState();
 
      const isValidNumber = (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue >= 0;
      };

      const handChangeValorsolicitado = (event) => {
        const inputValue = event.target.value;
          setError('');
          setValorSolicitado(inputValue);
      };

      const  handChangeDescription =(e) =>{
        setDescription(e.target.value)
      }

      const [isModalOpen, setIsModalOpen] = useState(false);

      const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };

      const [isModalOpenOne, setIsModalOpenOne] = useState(false);

      const toggleModalOne = () => {
        setIsModalOpenOne(!isModalOpenOne);
      };

      const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);

      const toggleModalTwo = () => {
        setIsModalOpenTwo(!isModalOpenTwo);
      };
      
      const now = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY/MM/DD HH:mm:ss');
   
      const handChangeObservation =(e) =>{
        setObservacion(e.target.value)
      }

      const handChanEstadia =(e) =>{
        setStadia(e.target.value)
      }

      const handChangeSubmit =() =>{
        setStateButton(true)
      }


      const handDetalle =() =>{
        setDetalle(true)
        setHuesped(false)
        setConsumo(false)
        setPago(false)
        setInvoinces(false)
        setHistorialReservation(false)
      }

      const handHuesped =() =>{
        setHuesped(true)
        setDetalle(false)
        setConsumo(false)
        setPago(false)
        setInvoinces(false)
        setHistorialReservation(false)
      }

      const handConsumo=() =>{
        setHuesped(false)
        setDetalle(false)
        setConsumo(true)
        setPago(false)
        setInvoinces(false)
        setHistorialReservation(false)
      }

      const handPago =() =>{
        setHuesped(false)
        setConsumo(false)
        setDetalle(false)
        setPago(true)
        setInvoinces(false)
        setHistorialReservation(false)
      }

      const handhistorial=() =>{
        setHuesped(false)
        setConsumo(false)
        setDetalle(false)
        setPago(false)
        setInvoinces(false)
        setHistorialReservation(true)
      }

      const handInvoinceDian=() =>{
        setHuesped(false)
        setDetalle(false)
        setConsumo(false)
        setPago(false)
        setHistorialReservation(false)
        setInvoinces(true)
      }

      function handleOnChange(event) {
        setTipoPersona("persona")
        setIsChecked(!isChecked);
        setIsChecke(false);
      }

      function handleOnChanger(event) {
        setTipoPersona("empresa")
        setIsChecke(!isChecke);
        setIsChecked(false);
      }
        
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

   

    const i = moment(resultDashboard?.Fecha_inicio).utc().format('YYYY/MM/DD')
    const f = moment(resultDashboard?.Fecha_final).utc().format('YYYY/MM/DD')
    const n = moment(resultDashboard?.Fecha_nacimiento).utc().format('YYYY/MM/DD')

    const  fecha = useDate({fecha:i})
    const  fechaOne = useDate({fecha:f})


    const pruebaOne  =   moment(fecha.defaultValueone).utc().format('MM/DD/YYYY')
    const pruebaTwo = moment(espan).utc().format('MM/DD/YYYY')

    var fechaInicioOne =  new Date(pruebaOne).getTime() 
    var fechaFinOne    = new Date(pruebaTwo).getTime() 

    var diffOne = fechaFinOne - fechaInicioOne  
    const dayOne =diffOne/(1000*60*60*24)

    const handChangeEdit =() =>{
      setState(!state)
      setLoading({loading:false})      
    }

    const handChangeSave =() =>{
      ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Se actualizo datos personales tipo habitacion ${resultDashboard?.nombre_habitacion} ${resultDashboard.Numero} nombre ${resultDashboard.Nombre} codigo reserva ${resultDashboard.id_persona}`,id:jwt.result.id_hotel,Valor_habitacion:"0",Codigo_reserva:id}).then(index =>{
        toast.success("Se actualizo los datos")
        handClickLoading()
      }).catch(e =>{
          toast.error("Error al actualizar datos")
      })

      setState(!state)
      setLoading({loading:false})
      handSubmit()
    }

    const valor = resultDashboard?.valor_abono 
    const quitarr = valor?.slice(4)
    const numEntero = parseInt(quitarr)
    const add = "000"
    const num  = numEntero + add
    const convertirFinish = parseInt(num) + parseInt(Abono)

    const valort = resultDashboard?.valor_abono 
    const quitart = valort?.slice(4)
    const numEnterot = parseInt(quitart)
    const addt = "000"
    const numt  = numEnterot + addt
    const convertirFinisht = parseInt(numt)
   
    const total = resultDashboard?.valor_habitacion
    const quitarone = total?.slice(4)
    const numEnteroOne = parseInt(quitarone)
    const addone = "000"
    const numOne  = numEnteroOne + addone
    const convertirFinishOne = parseInt(numOne) - convertirFinisht

    let data ={
      Nombre,
      Apellido,
      Num_documento:Documento,
      Fecha_nacimiento:Nacimiento,
      Correo,
      Tipo_persona:tipoPersonas
    } 

    const tipos_adicional = [
      {
        id: 1,
        name: "Corta",
      },
      {
        id: 2,
        name: "Larga",  
      },
    ];

    const hanClickDetailCheckout =() =>{
       history.push(`/Checkout/${id}`)
    }

    const hanClickTikets =() =>{
      history.push(`/breakfast/${id}`)
   }

    const hanClickCoctel =() =>{
      history.push(`/coctel/${id}`)
  }

    const hanClickFacturasElectronica =() =>{
      history.push(`/Dian/${id}`)
   }

   
    const handChecking =() =>{
      if(!nowChecking.isBefore(init)){
        if(!findFirma){
          if(!avaiableRoom){
            if(avainleOcacisonal){
              history.push(`/Ocacionales`)
            }else{
              HttpClient.validCheckingAll({ID:resultDashboard.ID_Habitaciones}).then(itemValid =>{
                history.push(`/detailchecking/${id}`)
              }).catch(e =>{
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: '<p>todavia hay una habitacion con check in</p>',
                  showConfirmButton: false,
                  timer: 1000
                })
              })
            }
          }else{
            toast.error("habitacion esta ocupada")
          }
        }
      }else{
        toast.error("No se puede hacer Check in antes")
      }
     
    }
   
    const item = state  ? <span>Editar</span> : <span>Guardar</span>
    
    const handEditar =(e) =>{
      history.push(`/editarpersonas/${e}`)
    }

    const handEditarReservas=(e) =>{
      history.push(`/editarpersonasreservas/${id}`)
    }

    const [huespe,setHuespe] =useState({
          Tipo_documento:"",
          Num_documento:"",
          Nombre:"",
          Apellido:"",
          Celular:"",
          Correo:"",
          Fecha_nacimiento:"",
          Ciudad:"",
          Nacionalidad:""
    })

    const handleInpuHuespe =(event, index) =>{
        setHuespe({
          ...huespe,
          [event.target.name] : event.target.value
      })
    }

    const [price, setPrice] = useState("");

    const cleanedPrice = price.replace(/\./g, '');

    const [inputPayValue, setInputPayValue] = useState({
      ID_pago:resultDashboard?.ID_pago,
      ID_Reserva: id,
      PayAbono:cleanedPrice,
      Fecha_pago: now,
      Tipo_forma_pago: null,
      Nombre_recepcion:jwt.result.name
    });

    const dataPayAbono ={
      ID_pago:resultDashboard?.ID_pago,
      ID_Reserva: id,
      PayAbono:cleanedPrice,
      Fecha_pago: now,
      Tipo_forma_pago: inputPayValue.Tipo_forma_pago,
      Nombre_recepcion:jwt.result.name
    }
 
    const handleInputPay = (event) => {
      const value = (event.target.value);

        setInputPayValue({
          ...inputPayValue,
          [event.target.name]: value
        }); 
    }


    const requiredValidator = (value) => {
      // Verificar si el valor está vacío o es null/undefined
      return !(value === '' || value === null || value === undefined);
    };

    
    const handClickInsertAbono =()  => {
      if(requiredValidator(dataPayAbono.PayAbono)){
        HttpClient.insertPayABono({data:dataPayAbono}).then(index=> {
          ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Abono agregado tipo habitacion ${resultDashboard?.nombre_habitacion} ${resultDashboard.Numero} nombre ${resultDashboard.Nombre} codigo reserva ${resultDashboard.id_persona}`,id:jwt.result.id_hotel,Valor_habitacion:"0",Codigo_reserva:id}).then(index =>{
            toast.success('Abono exitoso!')
            handClickLoading()
          }).catch(e =>{
              console.error(e)
          })
       
        }).catch(e =>{
          setErrorAbono(true)
          alert(e)
          toast.error('Error al guardar abono!')
        })
      }else {
        toast.error('Error no debe ser negativos!')
        setErrorAbono(true)
      }   
    }

    const {handModalText} =UseModalText({handlModal:handClickInsertAbono,Text:"Agregar abono ?"})
    
    useEffect(() =>{
      fetch(`${config.serverRoute}/api/resecion/getTipeDocument`)
      .then(res => res.json())
      .then(data => setDocument(data.query))

      fetch(`${config.serverRoute}/api/resecion/getcartreservaction/${id}`)
      .then(resp => resp.json())
      .then(data =>setProduct(data.query))

      fetch(`${config.serverRoute}/api/resecion/getcountry`)
      .then(resp => resp.json())
      .then(data=> setCountry(data))

      fetch(`${config.serverRoute}/api/resecion/getdetailchecking/${id}`)
      .then(resp => resp.json())
      .then(data=> setQuery(data?.query))

      
      fetch(`${config.serverRoute}/api/resecion/PostFacturacion/${resultDashboard.ID_facturacion}`)
      .then(index=> index.json())
      .then(data =>setDateEmpresa(data.query))
  },[loadinConsumo,idRoom])

  var numDefinish =  parseInt(resultDashboard?.valor_habitacion);

  const formattedNum = numDefinish.toLocaleString();  
  const valor_habitacion = formatter.format(resultDashboard?.valor_habitacion)
  const valor_abono =  formatter.format(resultDashboard?.valor_abono)
  const total_Cobrar = resultDashboard?.valor_habitacion - resultDashboard?.valor_abono
  const cobrar =  parseInt( resultDashboard?.valor_habitacion) - parseInt(resultDashboard?.valor_abono)

  const totalPrice = DetailDashboard.reduce((acum, item) => {
    const valorHabitacion = parseInt(item.valor_habitacion) || 0;
    const valorAbono = parseInt(item.valor_abono) || 0;
    const payAbono = parseInt(inputPayValue.PayAbono) || 0;
  
    return acum + valorHabitacion - valorAbono - payAbono;
  }, 0);

  const totaCobrar  =  totalPrice  ? totalPrice : 0

  let count

    let dataOne ={
      Abono: parseInt(Abono) + parseInt(resultDashboard.valor_abono),
      AbonoOne: parseInt(Abono),
      Valor:count  == undefined ?resultDashboard?.valor_habitacion :count ,
      Valor_habitacion:count  == undefined ?resultDashboard?.valor_habitacion :count ,
      Fecha_pago:now
    } 

    let dataCountPeople ={
      Adultos:adultos,
      Ninos:ninos,
      infantes:infantes,
      Observacion:observacion
    }


  const [loadingHuesped,setLoadingHuesped]=useState(false)

  const hanAdd=() =>{
    setLoadingHuesped(true)
    if (huespe.Tipo_documento =="" || huespe.Num_documento =="" || huespe.Nombre ==""|| huespe.Apellido ==""|| huespe.Celular ==""|| huespe.Correo ==""|| huespe.Fecha_nacimiento =="" || huespe.Ciudad ==""|| huespe.Nacionalidad ==""){
      setError(true)
    }else {
      ServiceAddHuespedes({id,huespe,data:dataCountPeople,dataPay:dataOne}).then(index =>{
        setLoadingHuesped(false)
        ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Se añadio huesped tipo habitacion ${resultDashboard?.nombre_habitacion} ${resultDashboard.Numero} nombre ${resultDashboard.Nombre} codigo reserva ${resultDashboard.id_persona}`,id:jwt.result.id_hotel,Valor_habitacion:"0",Codigo_reserva:id}).then(index =>{
          window.location.reload()
        }).catch(e =>{
            console.error(e)
            setLoadingHuesped(false)
        })
     
    }).catch(e =>{
        console.error("error al aregar uan")
    })
    }
  }

  const handSubmit =() =>{
        ServiceAddHuespedes({id,huespe,data:dataCountPeople,dataPay:dataOne}).then(index =>{

          window.location.reload()
      }).catch(e =>{
          console.error("error")  
      })
        ServiceUpdateReservation({id:resultDashboard.id_persona,data}).then(index =>{
          setLoading({loading:true})
      }).catch(e =>{
        setLoading({error:false})
      })
      if(dataOne.Abono !=="COPNaN"){
        ServiceUpdateReservationpay({id,dataOne}).then(index =>{
      }).catch(e =>{
        console.error(e)
      })
      }
}   

  const totalAlojamiento = resultDashboard?.valor_dia_habitacion * day
  const bebidas  = product?.filter(index => index.ID_Categoria ==1)    
  const Snacks  = product?.filter(index => index.ID_Categoria ==2)    
  const Souvenir  = product?.filter(index => index.ID_Categoria ==3)    
  const Drogueria  = product?.filter(index => index.ID_Categoria ==4)    
  const Adultos  = product?.filter(index => index.ID_Categoria ==5)    
  const Lenceria  = product?.filter(index => index.ID_Categoria ==6)  

  const totalBebidas = bebidas?.reduce((acum,current) => {
  return acum  + current.Cantidad
},0)

const priceBebidas = bebidas?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const totalSnacks = Snacks?.reduce((acum,current) => {
    return acum  + current.Cantidad
},0)

const priceSnacks = Snacks?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const totalSouvenir = Souvenir?.reduce((acum,current) => {
    return acum  + current.Cantidad
},0)

const priceSouvenir = Souvenir?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const totalDrogueria = Drogueria?.reduce((acum,current) => {
    return acum  + current.Cantidad
},0)

const priceDrogueria = Drogueria?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const totalAdultos = Adultos?.reduce((acum,current) => {
    return acum  + current.Cantidad
},0)

const priceAdultos = Adultos?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const totalLenceria = Lenceria?.reduce((acum,current) => {
    return acum  + current.Cantidad
},0)

const priceLenceria = Lenceria?.reduce((acum,current) => {
    return acum  + current.Cantidad * current.Precio
},0)

const hanDelete =() =>{
      ServiDelteReservation({id}).then(index =>{  
        ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Reserva eliminada tipo habitacion ${resultDashboard?.nombre_habitacion} ${resultDashboard.Numero} nombre ${resultDashboard.Nombre} codigo reserva ${id} `,id:jwt.result.id_hotel,Valor_habitacion:"0",Codigo_reserva:id}).then(index =>{
          socket.emit("sendNotification",message);
          toast.success("Eliminado")
          history.push("/home")
        }).catch(e =>{
            console.error(e)
        })
    }).catch(e =>{
        console.error("error")
    })
} 

const isValidNumberOne = (value) => {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) && parsedValue >= 1;
};

const handClickPostTarifasReservation =async() =>{
  const cleanedValorsolicitado = valorSolicitado.replace(/\./g, '');

  if(isValidNumberOne(cleanedValorsolicitado) && isNaN(descripcion) ){
    await postInsertTarifas({id_user:jwt.result.id_user,id_hotel:jwt.result.id_hotel,valor:cleanedValorsolicitado,Description:descripcion,Fecha:now,ID_reservation:id,name_reservation:resultDashboard.Nombre,codigo_reserva:`${resultDashboard?.Num_documento}${id}`,noches:day,Abono:parseInt(valor)})
    await fetchWhatsapp({to:numbersRecepcion})
    setDescription("")
    setValorSolicitado("")
  }else{
    toast.error("Completa todos formulario")
    setError(true)
  }
}

const  typy_buy =  [
  {   
    id:null,
    name:"",
},
  {   
      id:1,
      name:"Efectivo",
  },
  {
      id:2,
      name:"Consignaciones",
  },
  {   
      id:3,
      name:"Destino",
  },
  {   
      id:4,
      name:"Sitio Web",
  },
  {   
      id:5,
      name:"Payoneer",
  },
  {   
      id:6,
      name:"T.Debito",
  },
  {   
      id:7,
      name:"T.Credito",
  },
  {   
      id:8,
      name:"Hotel Beds",
  },
  {   
      id:9,
      name:"Despegar",
  },
  {   
      id:10,
      name:"Price Travel",
  },
  {   
      id:11,
      name:"Link de pago",
  },
  {   
      id:12,
      name:"Expedia",
  },
]

var curr = new Date(resultDashboard?.Fecha_inicio);
curr.setDate(curr.getDate());
var fecha_inicio = curr.toISOString().substring(0,10);



var currOne = new Date(resultDashboard?.Fecha_final);
currOne.setDate(currOne.getDate());
var fecha_final = currOne.toISOString().substring(0,10);

const numberWithCommas = (event) => {
  // Verificar si el evento no es un número o es negativo
  if (isNaN(event) || event < 0) {
    // Si es así, devolver una cadena vacía o un mensaje de error, según tu preferencia
    return '';
  }

  // Convertir el valor a una cadena de texto
  const stringValue = event.toString();
  // Eliminar todos los caracteres que no sean dígitos
  const intValue = parseInt(stringValue.replace(/[^\d]/g, ''), 10);
  // Formatear el número con separadores de miles
  const formattedValue = intValue.toLocaleString('es-CO');
  return formattedValue;
};

/**
 *  <Button
              icon={<FaFilePdf className="flex-contan" color="white" fontSize={20} />}
              onClick={GnerarPdf}
              disabled={!findFirma}
              className="button-checking-detail-one-das"
              color="error"
            >
              <span className="text-words">Descargar factura Sigo</span>
            </Button>  
 */
const ButtonValidSigo =  <Button
              onClick={hanClickFacturasElectronica}
              disabled={!findFirma}
              size={"xs"}
              className="button-checking-detail-one-das"
              color="success"
            >
              <span className="text-words">Factura electrónicas</span>
            </Button>


const  handComprobante =UseModalText({handlModal:print,Text:"Descargar comprobante reserva?"})
const  handComprobanteRegister =UseModalText({handlModal:printRegister,Text:"Descargar comprobante reserva?"})
const  hanclickEditar =UseModalText({handlModal:state ?handChangeSave :handChangeEdit,Text:"Editar la informacion de la reserva?"})
const  handleClickEliminar =UseModalText({handlModal:hanDelete,Text:"Estas seguro de eliminar la reserva ?"})



 const toPriceNigth = UsePrice({number:resultDashboard?.valor_dia_habitacion})
    
    return (
      <>

      
      <div className="container-flex-init-global" >
        <ButtonBack />
        <ButtonHome/>

        <CardDownloadPayment 
        Nombre={resultDashboard?.Nombre}
        Apellido={resultDashboard?.Apellido}
        Correo={resultDashboard.Correo}
        id_prod_card={resultDashboard.id_prod_card} />


        <div className="container-detail-dasboard-in-one" >
            <div    className="border-detail " > 
                 <span className="negrita-detail-reserva" >{day} noches</span>

                 <span>Valor noche:</span>
                 <span className="negrita-detail-reserva"> {toPriceNigth.price}</span>
            </div>
            <div  className="border-detail"   >
                 <span>Total hospedaje:</span>
                 <span className="negrita-detail-reserva" >{valor_habitacion}</span>
            </div>

            <div  className="border-detail"   >
                 <span>Canal de reserva:</span>
                 <span className="negrita-detail-reserva" >{resultDashboard.Canales_Nombre}</span>
            </div>
         
            <div  style={{background:`${totalPrice ==0 ? "#17c964" : "#f21361" }`,color:"white"}} className="border-detail" >
                 {totalPrice == 0 ?  <span className="negrita-detail-reserva" >   <BsCheckCircle  className="text-center-icon"   fontSize={25} color="white"  />Pagado</span> : <span className="negrita-detail-reserva" >   <CiBadgeDollar  className="text-center-icon"   fontSize={45} color="white"  />  ${cobrar.toLocaleString()}</span>   }   
            </div>
            

             <div className="border-detail" >
                <span>Habitacion:</span>
                 <span className="negrita-detail-reserva"  >{resultDashboard.Numero} {resultDashboard?.nombre_habitacion}</span>
            </div>

            {resultDashboard.Foto_documento_adelante ?  (
               <div  style={{background:"background: rgb(34,193,195)",background: "linear-gradient(32deg, rgba(34,193,195,1) 0%, rgba(143,102,189,1) 62%, rgba(253,187,45,1) 100%)",color:"white"}} className="border-detail" >
                <span className="negrita-detail-reserva" >   <VscVerified     className="text-center-icon"   fontSize={30} color="white"  />web check in realizado</span>
            </div>) :  null  } 

            <div   className="border-detail" >
                <span>Abono:</span>
                 <span className="negrita-detail-reserva" >{valor_abono}</span>
            </div>
           
        </div>
    </div>
    <div  className="container-flex-init-global" >
          <div className="container-detail-dasboard-in" >
            <input type="date" className="desde-detail"   onChange={(e) => setspandOne(e.target.value)}  defaultValue={fecha_inicio}    />
            <input type="date" className="desde-detail"   onChange={(e) =>setspand(e.target.value)}  defaultValue={fecha_final}  />
            <h2 className="cod-reserva" ><span className="title-code" >COD:</span> X14A-{resultDashboard?.Num_documento}{id}</h2>
           
        </div>
    </div>
    <div className="init" >
      <form  className="container-flex-init" >
      <div className="container-detail-dasboard-in" > 

      <span className="desde-detail-two-title" > Adultos:</span>
      <span className="desde-detail-two-title" >Niños:</span>
      <span className="desde-detail-three-title-das" >Infantes:</span>    
      <span  className="desde-detail-three-title-das">Mascotas:</span>
      <span className="desde-detail-two-title" > Ciudad:</span>
          </div>
            <div className="container-detail-dasboard-in" > 
              <input type="text" 
                    className="desde-detail-two"  
                    placeholder="Adultos" 
                    name="Adultos"
                    defaultValue={resultDashboard.Adultos}  
                    onChange={(e) =>setAdultos(e.target.value)}  />
              <input type="text" 
                    className="desde-detail-two" 
                    name="Fecha" 
                 placeholder="Niños"  
                    defaultValue={resultDashboard.Ninos}  
                    onChange={(e) =>setNinos(e.target.value)}   />

              <input  type="text" 
                      className="desde-detail-three" 
                      name="Infantes"
                      placeholder="Infantes"  
                      defaultValue={resultDashboard.Infantes}
                      onChange={(e) =>setInfantes(e.target.value)}   />

              <input  type="text" 
                      className="desde-detail-three" 
                      name="Mascotas" 
                      placeholder="Mascotas"   
                      readOnly={state}
                      defaultValue={resultDashboard.Talla}
                      onChange={handleChange("Mascotas")}   />

              <input  type="text" 
                      className="desde-detail-two" 
                      name="Ciudad"  
                      placeholder="Mascotas"    
                      defaultValue={resultDashboard.Ciudad}
                      onChange={handleChange("Ciudad")}   />
          </div>
      </form>
    </div>
    
  


    {findEmpresa &&  DateEmpresa?.map((index) =>  (
      <div className="init-detail" >
      <form  className="container-flex-init" >
      <span className="negrita-detail-reserva-reservation">Datos de la empresa donde se estaran enviando la factura electronica</span>
      <div  className="container-detail-dasboard-in" > 
            
      <span className="desde-detail-two-title" > Nombre empresa:</span>
      <span className="desde-detail-two-title" >Nit:</span>
      <span className="desde-detail-three-title-das" >Correo:</span>    
      <span  className="desde-detail-three-title-das">Direccion:</span>
      <span className="desde-detail-two-title" > Telefono:</span>

          </div>
            <div className="container-detail-dasboard-in" > 
              <input type="text" 
                    className="desde-detail-two"  
                    placeholder="Adultos" 
                    name="Adultos"
                  
                    defaultValue={`${index?.name_people} ${index?.apellido_people} `}  
                    onChange={(e) =>setAdultos(e.target.value)}  />
              <input type="text" 
                    className="desde-detail-two" 
                    name="Fecha" 
                  placeholder="Niños"  
                  defaultValue={index?.num_id}   
                    onChange={(e) =>setNinos(e.target.value)}   />

              <input  type="text" 
                      className="desde-detail-three" 
                      name="Infantes"
                      placeholder="Infantes"  
                      defaultValue={index?.email_people}  
                      onChange={(e) =>setInfantes(e.target.value)}   />

              <input  type="text" 
                      className="desde-detail-three" 
                      name="Mascotas" 
                      placeholder="Mascotas"   
                      readOnly={state}
                      defaultValue={index?.direccion_people}  
                      onChange={handleChange("Mascotas")}   />

              <input  type="text" 
                      className="desde-detail-two" 
                      name="Fecha"  
                      placeholder="Mascotas"    
                      readOnly={state}
                      defaultValue={index?.number_people}  
                      onChange={handleChange("Fecha")}   />
          </div>
      </form>
      </div>
    ))}
   
    <div className="init-photo top-one-detail-room" >
          <form  className="container-flex-init"  onSubmit={e =>{
            e.preventDefault()
      }} >
      <div className="container-detail-dasboard-in" > 
        <span className="desde-detail-two-title-photo" >Forma pago:</span>
        <span className="desde-detail-two-title-photo-three" >Abono:</span>
        <span className="desde-detail-two-title-photo-four" >Doc frontal:</span>
        <span className="desde-detail-two-title-photo-four" >Doc posterior:</span>
        <span className="desde-detail-two-title-photo" >Firma:</span>
      </div>
            <div className="container-detail-dasboard-in-photo" >       
              <select   name="Tipo_forma_pago"
                          value={inputPayValue.Tipo_forma_pago}
                          onChange={handleInputPay}
                          className={`desde-detail-twophoto ${errorAbono ? "error-solicitud" : ""}  ` }   >
                      {typy_buy?.map(category =>(
                          <option 
                          value={category.id}   
                          key={category.id}>
                          {category.name}
                      </option>
                      )
                      )}
              </select>
            <input 
                      onChange={(e) =>setPrice(e.target.value)}
                      type="text"
                      value={price !== '' ? numberWithCommas(price) : ''}
                        placeholder="abono"
                    className={`desde-detail-twophoto  ${errorAbono ? "error-solicitud" : "" } `} />        
              <div>
                <Tooltip content={"Agregar pago sin coma, ni punto "} style={{color:"white"}} >
                <button style={{background:"black"}} 
                className="button-change-type-room" 
                  onClick={handModalText} >
                    <span className="negrita-detail-reserva  row-text-box" style={{marginLeft:"10px"}}   ><CiCirclePlus  fontSize={35}  /> <span> Abono</span></span>
                  </button>
                </Tooltip> 

             
              </div>  
              <div className="row-flex-one"   >
                  <img
                      src={`${resultDashboard.Foto_documento_adelante ? resultDashboard.Foto_documento_adelante : "https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true"  }`}
                      objectFit="initial"
                      alt="Default Image"
                      className={`img-photo`} onClick={toggleModal}
  
                    />

                    {isModalOpen && (
                            <div className="modal" onClick={toggleModal}>
                              <img src={`${resultDashboard.Foto_documento_adelante ? resultDashboard.Foto_documento_adelante : "https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true"  }`} alt="Imagen" className="modal-image" />
                            </div>
                      )}
                <img
                    src={`${resultDashboard.Foto_documento_atras ? resultDashboard.Foto_documento_atras : "https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true"  }`}
                    objectFit="initial"
                    alt="Default Image"
                    className="img-photo"
                    onClick={toggleModalOne}
                  />

                {isModalOpenOne && (
                    <div className="modal" onClick={toggleModalOne}>
                      <img src={`${resultDashboard.Foto_documento_atras ? resultDashboard.Foto_documento_atras : "https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true" }`} alt="Imagen" className="modal-image" />
                    </div>
                        )}
                <img
                    src={`${resultDashboard.Pasaporte ? resultDashboard.Pasaporte : "https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true"  }`}
                    objectFit="initial"
                    alt="Default Image"
                    className="img-photo"
                    onClick={toggleModalTwo}
                  />

                {isModalOpenTwo && (
                    <div className="modal" onClick={toggleModalTwo}>
                      <img src={`${resultDashboard.Pasaporte ? resultDashboard.Pasaporte : "https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true"  }`} alt="Imagen" className="modal-image" />
                    </div>
                )}
              </div>
          </div>

          <div className="form-margintop-solicitud" >

            <input  
              onChange={handChangeDescription}
              value={descripcion}
              name="PayAbono"
              placeholder="Descripcion del envio"
              type="text"
              className={`desde-detail-twophoto-two ${error ? "error-solicitud" : "" } `}  />  
            <input
              name="PayAbono"
              type="text"
              id="valorSolicitadoInput"
              placeholder="Valor solicitado"
              className={`desde-detail-twophoto-two ${error ? "error-solicitud" : "" } `} 
              onChange={handChangeValorsolicitado}
             
              value={valorSolicitado !== '' ? numberWithCommas(valorSolicitado) : ''}
            />
              <button style={{background:"black"}} 
               className="button-change-type-room " 
                onClick={handClickPostTarifasReservation} >
                   <span className="negrita-detail-reserva  row-text-box" style={{marginLeft:"10px"}}   ><CiCirclePlus  fontSize={35}  /> <span> Enviar</span></span>
                </button>

          </div>
        
      </form>
    
    </div>

      <div className="container-flex-init-one-center " >
            <div> 
                <Button
                 onClick={handChecking}
                   disabled={findFirma}
                  className="button-checking-detail-one-das"
                  color="success" 
                  size={"xs"}
                   > <span  className="text-words" >Check in</span> </Button>
            </div>

            <div>
                <Button
                
                  onClick={hanClickDetailCheckout} 
                        disabled={!findFirma}
                        className="button-checking-detail-one-das"
                        color="success" 
                        size={"xs"}
                        >
                        <span  className="text-words" >Check out</span> 
                </Button>
              </div>
              <div>
                <Button
                  
                  onClick={hanClickTikets} 
                        disabled={!findFirma}
                        className="button-checking-detail-one-das"
                        color="success" 
                        size={"xs"}
                        >
                        <span  className="text-words" >tickets Desayuno</span> 
                </Button>
              </div>

              <div>
                <Button
                  onClick={hanClickCoctel} 
                        disabled={!findFirma}
                        className="button-checking-detail-one-das"
                        color="success" 
                        size={"xs"}
                        >
                        <span  className="text-words" >Coctel</span> 
                </Button>
              </div>
            
                  <div>
                        {ButtonValidSigo}
                  </div>

            <ReactTooltip id="registerTip" place="top" effect="solid">
                  Eliminar reserva
            </ReactTooltip>
         
            <div className="name-pinter"  onClick={handleClickEliminar.handModalText} data-tip data-for="registerTip" >
                <div>
                  <AiOutlineDelete fontSize={40} />
                </div>
            </div>
            <ReactTooltip id="registerTip-1" place="top" effect="solid">
                  Actualizar reserva
            </ReactTooltip>
            <div className="name-pinter"  onClick={ hanclickEditar.handModalText }   data-tip data-for="registerTip-1">
                <div>
                    <CiHeart fontSize={40} />
                </div>

            </div>
            <ReactTooltip id="registerTip-2" place="top" effect="solid">
                  Descargar comprobante
            </ReactTooltip>

            <div style={{ position: 'absolute', left: 50, top: -500 }}>
              <div id="printThis">
              
              </div>
            </div>

            <div  className="name-pinter"  data-tip data-for="registerTip-2" >
                <div onClick={ handComprobante.handModalText } >
                   <BsFilePdf fontSize={40} />
                </div>
            </div>

            <ReactTooltip id="registerTip-3" place="top" effect="solid">
                  Descargar comprobante Registrador
            </ReactTooltip>

            <div  className="name-pinter"  data-tip data-for="registerTip-3" >
                <div onClick={ handComprobanteRegister.handModalText } >
                   <BsFilePdf fontSize={40} />
                </div>
            </div>
              <div className="container-checkbox" >
                  <input   type="checkbox" 
                          className={`checkbox-round  ${isChecked && "checkbox-round-click"} `}
                          onChange={handleOnChange}
                          defaultValue={(e) =>findPersona && setIsChecked(true)}       
                          checked={isChecked} /> Persona
                  
              </div> 


              { totalId  ? null :
            <div className="container-checkbox" >
                    <input   type="checkbox" 
                            className={`checkbox-round  ${isChecke && "checkbox-round-click"} `}
                            onChange={handleOnChanger}
                            readOnly={true}
                            checked={isChecked}/> Empresa
            </div> 
          }

          <div>
            <Button
            className="button-checking-detail-one-das" 
            color={`${totalPrice <=0 ? "success" : "error" }`} 
            > <span  className="text-words" >Total a cobro ${totaCobrar.toLocaleString()} </span> </Button>
          </div>
    </div>
    <div >
  </div>

      <div className="in-cehcki-out" >
      
      </div>
    <div className="container-flex-init-one-container-delete" >
    <textarea                                           rows="10" 
                                                      
                                                       cols="217" 
                                                      placeholder="Observacion" 
                                                      name="observacion"
                                                      defaultValue={resultDashboard.Observacion}
                                                      onChange={handChangeObservation}
                                                      className="obs" ></textarea>  
    
    </div>  
    {!stateButton && 
    <div className="init-one-three top-detail  " >
    <form  className="container-flex-init" >
      <div className="container-detail-dasboard-in in-type-button" > 
              <ul className="flex-contain"  >
                  <li className={`${huesped ? "desde-detail-three-estados-black-one-finish" :"desde-detail-three-estados" } `} onClick={handHuesped} >Huespedes:  <PiUsersLight fontSize={25}  /> {quyery?.length}  </li>
                  <li className={`${detalle ? "desde-detail-three-estados-black-one-finish" :"desde-detail-three-estados" } `} onClick={handDetalle} >Historial reserva:</li>
                  <li className={`${consumo ? "desde-detail-three-estados-black" :"desde-detail-three-estados" } `} onClick={handConsumo} >Consumos: <PiShoppingBagOpenLight fontSize={25} /> {product?.length >0 ?product?.length : 0  }  </li>
                  <li className={`${pago ? "desde-detail-three-estados-black" :"desde-detail-three-estados" } `}  onClick={handPago} >Pagos: <PiPaypalLogoLight  fontSize={25}   /> {product?.length >0 ?product?.length : 0 }   </li>
                  <li className={`${Invoince ? "desde-detail-three-estados-black" :"desde-detail-three-estados" } `}  onClick={handInvoinceDian}  >Facturas Dian:</li>
                  <li className={`${historialReservation ? "desde-detail-three-estados-black" :"desde-detail-three-estados" } `}  onClick={handhistorial}  >Historial:</li>
                 
              </ul>
         { huesped && <Huesped  quyery={quyery}
                                DetailDashboard={DetailDashboard}
                                handEditar={handEditar} 
                                handChangeSubmit={handChangeSubmit} 
                                stateButton={stateButton} 
                                handEditarReservas={handEditarReservas}/>} 
        {consumo && <Consumo  day={day} 
                              jwt={jwt}
                              habitacion={resultDashboard?.nombre_habitacion}
                              totalAlojamiento={totalAlojamiento}
                              product={product}
                              totalBebidas={totalBebidas}
                              priceBebidas={priceBebidas}
                              bebidas={bebidas}
                              setLoadingConsumo={setLoadingConsumo}
                              loadinConsumo={loadinConsumo}
                              totalSnacks={totalSnacks}
                              priceSnacks={priceSnacks}
                              Snacks={Snacks}

                              totalSouvenir={totalSouvenir}
                              priceSouvenir={priceSouvenir}
                              Souvenir={Souvenir}

                              totalDrogueria={totalDrogueria}
                              priceDrogueria={priceDrogueria}
                              Drogueria={Drogueria}

                              totalAdultos={totalAdultos}
                              priceAdultos={priceAdultos}
                              Adultos={Adultos}

                              totalLenceria={totalLenceria}
                              priceLenceria={priceLenceria}
                              Lenceria={Lenceria}
                            
                               />}
        {pago && <Pagos   pagos={resultDashboard}  
                          idReserva={id}
                          typy_buy={typy_buy}   />}
         {Invoince && <TableInvoinceDian    />}
        {historialReservation && <HistorialDetailReservation />}
        {detalle && <CardHistoryReservationDetail />}
      </div>       
    </form>
    </div>
  }
    {stateButton && 
      <form className="container-flex-init init ono"   >
                        <div className="container-detail-dasboard-in" > 
                            <span className="desde-detail-three-das" > Nombre</span>
                            <span className="desde-detail-three-das" >Apellido </span>
                            <span className="desde-detail-two-das" >Tipo de Documento</span>    
                            <span  className="desde-detail-three-das">No documento</span>
                        </div>
                            <div className="container-detail-dasboard-in" >
                              
                                <input  className="desde-detail-three"     
                                        name="Nombre"  
                                        type={"text"} 
                                        placeholder="Nombre" 
                                        value={item.Nombre} 
                                        onChange={handleInpuHuespe}
                                        required  />

                                <input  type="text" 
                                        className="desde-detail-three" 
                                        name="Apellido"  
                                        placeholder="Apellido" 
                                        value={item.Apellido} 
                                        onChange={handleInpuHuespe}
                                        required  />
                                    

                                    <select  onChange={handleInpuHuespe}
                                                name={"Tipo_documento"}
                                                value={item.Tipo_documento}
                                                required
                                                className="desde-detail-two" >
                                              <option >{null}</option>
                                              {documnet?.map(category =>(
                                                  <option 
                                                  value={category.ID}   
                                                  key={category.ID}
                                              >
                                                  {category.nombre}
                                              </option>
                                              )
                                              )}
                                    </select>

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        name="Num_documento" 
                                        placeholder="Numero de documento"
                                        value={item.Num_documento} 
                                        onChange={handleInpuHuespe}
                                        required />
                            </div>

                            <div className="container-detail-dasboard-in" > 
                            <span className="desde-detail-three-das" > Fecha Nacimiento </span>
                            <span className="desde-detail-three-das" >Nacionalidad </span>
                            <span className="desde-detail-two-das" >Correo electronico</span>    
                            <span  className="desde-detail-three-das">Celular</span>
                        </div>

                            <div className="container-detail-dasboard-in" >
                                <input  type="date" 
                                        className="desde-detail-three" 
                                        placeholder="Fecha Nacimiento"
                                        name="Fecha_nacimiento"
                                        value={item.Fecha_nacimiento} 
                                        onChange={handleInpuHuespe}
                                        required />

                                        <select   onChange={handleInpuHuespe}
                                                                    name={"Nacionalidad"}
                                                                    value={item.Nacionalidad}
                                                                    
                                                                    required
                                                                    className='desde-detail-three'>
                                                                <option >{null}</option>
                                                                {country?.query?.map(category =>(
                                                                    <option 
                                                                    value={category.ID}   
                                                                    key={category.ID}
                                                                >
                                                                    {category.nombre}
                                                                </option>
                                                                )
                                        )}
                                        </select>

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        name="Correo" 
                                        placeholder="Correo  electronico"  
                                        value={item.Correo} 
                                        onChange={handleInpuHuespe}
                                        required/>

                                <input  type="number" 
                                        className="desde-detail-two" 
                                        name="Celular"  
                                        placeholder="Celular"  
                                        value={item.Celular} 
                                        onChange={handleInpuHuespe}
                                        required  />
                            </div>

                            <div className="container-detail-dasboard-in" > 
                            <span className="desde-detail-two-das" >Ciudad </span>
                            <span className="desde-detail-three-das-state" >Estadia </span>
                        </div>

                            <div className="container-detail-dasboard-in" >
                                <input  type="text" 
                                        className="desde-detail-two" 
                                        name="Ciudad"  
                                        placeholder="Ciudad"   
                                        value={item.Ciudad} 
                                        onChange={handleInpuHuespe}
                                        required  />

                                  <select  onChange={handChanEstadia} 
                                                                    name={"Nacionalidad"}
                                                                    value={estadia}
                                                                    required
                                                                    className='desde-detail-three'>
                                                                <option  value={2} >estadia</option>
                                          {tipos_adicional.map(category =>(
                                              <option 
                                              value={category.id}   
                                              key={category.id}
                                          >
                                              {category.name}
                                          </option>
                                          )
                                        )}
                                  </select>
                            </div>  
                            {stateButton &&<div className="container-flex-init-one" >
                      <button className="button-dasboard-six-one-one-one" onClick={hanAdd}  disabled={loadingHuesped}  >
                          <span>Añadir huesped </span> 
                      </button>
                  </div>}                            
                    </form>
      }   
    </>
    )
}
export default DetailDasboard

const Huesped =({quyery,handEditar,handChangeSubmit ,stateButton,DetailDashboard,handEditarReservas}) =>{

  const query =[]

  for(let i =0;i<quyery?.length;i++){
    if(quyery[i+1]){
      query.push(quyery[i])
    }
}

  return (
    <Paper sx={{ width: '100%',margin:"10px" }}>
            <TableContainer   onSubmit={(e) =>{
              e.preventDefault()
            }} >
            <LoadingDetail  
                            loading={true}
                            titleLoading={"Huespedes"}  />
                <Table  size="small" aria-label="a dense table"> 
                 
                <TableHead>
                    <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Apellido</TableCell>
                    <TableCell align="right">Numero de identificacion</TableCell>
                    <TableCell align="right">Nacionalidad</TableCell>
                    <TableCell align="right">Celular</TableCell>
                    <TableCell align="right">Editar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {DetailDashboard?.map((row,e) =>(
                      <TableRow key={e} >
                          <TableCell >
                          {row.Nombre}
                          </TableCell>
                          <TableCell>{row.Apellido} </TableCell>
                          <TableCell>{row.Num_documento} </TableCell>
                          <TableCell>{row.nacionalidad} </TableCell>
                          <TableCell>{row.Celular} </TableCell>
                          <TableCell className="editar-checking" onClick={handEditarReservas} ><CiEdit fontSize={30} color="black" /></TableCell>
                      </TableRow>
                    ))}
                    {query?.map((row,e) =>(
                      <TableRow key={e} >
                          <TableCell >
                          {row.Nombre}
                          </TableCell>
                          <TableCell>{row.Apellido} </TableCell>
                          <TableCell>{row.Num_documento} </TableCell>
                          <TableCell>{row.nombre} </TableCell>
                          <TableCell>{row.Celular} </TableCell>
                          <TableCell className="editar-checking" onClick={() => handEditar(row.huespedes)} ><CiEdit fontSize={30} color="black" /></TableCell>
                      </TableRow>
                    ))}
                </TableBody>
               
                </Table>
               
            </TableContainer>
                  <div className="container-estado" >
                      <button className="button-checking-detail-checkout-estado" onClick={handChangeSubmit}  >
                              <span className="title-button" >Añadir nuevo huesped</span>
                      </button>
                  </div>
                  
              </Paper>      
   )
}

const Consumo =(props) =>{

  const  {
          habitacion,
          setLoadingConsumo,
          loadinConsumo,
          product} = props

          console.log(product)

          const  typy_buy =  [
            {   
                id:1,
                name:"Efectivo",
            },
           
            {   
                id:6,
                name:"T.Debito",
            },
            {   
                id:7,
                name:"T.Credito",
            },
            {   
              id:2,
              name:"Consignaciones",
          },
              {   
                id:11,
                name:"Link de pago"
            }
          ]

  const cart =[]

  const [state,setState] =useState({
    forma_pago:null,
})

  const handleState =(event, index) =>{
    setState({
      ...state,
      [event.target.name] : event.target.value
  })
  }

  for(let i = 0;i<product?.length;i++){
    cart.push({ 
      ID:product[i].ID,
      Nombre_categoria:product[i].Nombre,
      Nombre_Producto:product[i].Nombre_producto,
      Price:product[i].Precio.toLocaleString(),
      img:product[i].img_product,
      Fecha:moment(product[i].Fecha_compra).utc().format('YYYY/MM/DD'),
      Cantidad:product[i].Cantidad,
      Pago_deuda:product[i].pago_deuda,
      Forma_pago:product[i].Forma_pago,
      Tipo_pago:product[i].forma_pago,
      Nombre_Recepcion:product[i].Nombre_recepcion,
      img:product[i].img_product 
    })
  }
  
  const  now = moment().format("YYYY/MM/DD");

    let data ={
      Forma_pago:state.forma_pago,
      Fecha_compra:now,
      pago_deuda:"1"
    }

  const handPayProduct =(id) =>{
    if(state.forma_pago== null){

    }else{
      ServicePayReservationSore({id, data}).then(index=> {
        setLoadingConsumo(!loadinConsumo)
      }).catch(e =>{
        console.error(e)
      })
    }
  }

 const sumWithInitial = (Array.isArray(product) ? product : []).reduce(
  (accumulator, currentValue) => {
    return accumulator + (parseInt(currentValue?.Precio) || 0);
  }, 
  0
);
  if(!habitacion) return null

  return (
       <Paper sx={{ width: '90%',margin:"10px" }}> 
            <TableContainer  onSubmit={(e) =>{
              e.preventDefault()
            }} >
              <LoadingDetail  
                              loading={true}
                              titleLoading={"Consumos"}  />
                  <Table   > 
                  <TableHead>
                      <TableRow>
                      <TableCell align="right">Producto</TableCell> 
                      <TableCell align="right">Nombre producto</TableCell> 
                      <TableCell align="right">Cantidad</TableCell>  
                      <TableCell align="right">Fecha</TableCell> 
                      <TableCell align="right">Valor</TableCell>
                      <TableCell align="right">Estado pago</TableCell>
                      <TableCell align="right">Registro pago</TableCell>
                      <TableCell align="right">Registro pago</TableCell>
                      <TableCell align="right">Recepcion</TableCell>
                      
                      </TableRow>
                  </TableHead>
                  <TableBody>
                        
                        {  cart?.map((row,e) =>{
                          
                          if(row.Pago_deuda ==0){
                          return(
                           <TableRow>
                              <TableCell>  

                              <User
                                bordered
                                squared
                                color="error"
                                
                               
                                style={{color:"black"}}
                                  src={row.img}
                                  name={row.Nombre_categoria}
                                  zoomed
                                /> 
                                   </TableCell>
                                   <TableCell>{row.Nombre_Producto} </TableCell>
                                   <TableCell>{row.Cantidad} </TableCell>
                              <TableCell>{row.Fecha} </TableCell>
                              <TableCell>Cop {row.Price} </TableCell>
                              <TableCell className="pay_deudado" ><span>Adeudado</span></TableCell>
                             
                              <TableCell>  <select  onChange={handleState}
                                    name={"forma_pago"}
                                    value={state.forma_pago}
                                    required
                                    className="desde-detail-two-pagos-store" >
                                  <option >Selecionar tipo pago</option>
                                
                                  {typy_buy?.map(category =>(
                                      <option 
                                      value={category.id}   
                                      key={category.id}
                                  >
                                      {category.name}
                                  </option>
                                  )
                                  )}
                        </select>
                </TableCell>
                <TableCell>  <Button onClick={() => handPayProduct(row.ID)} color="success">Pagar Producto</Button>
                </TableCell>
                <TableCell>{row.Nombre_Recepcion}</TableCell>
                  </TableRow>
                          )
                        } else if(row.Pago_deuda ==1){
                          return (
                          <TableRow>
                             <TableCell  style={{width:10}}  >   
                              <User
                           
                                bordered
                                color="success"
                                squared
                                  src={row.img}
                                  name={row.Nombre_categoria}
                                 zoomed
                                />
                                  </TableCell>
                                  <TableCell>{row.Nombre_Producto} </TableCell>
                                  <TableCell>{row.Cantidad} </TableCell>
                              <TableCell>{row.Fecha} </TableCell>
                              <TableCell>Cop {row.Price} </TableCell>
                              <TableCell className="pay_Pagado-deuda" ><span >Pagado</span></TableCell>
                              <TableCell  ><span >Pagado</span></TableCell>
                              <TableCell>{row.Tipo_pago}</TableCell>
                              <TableCell>{row.Nombre_Recepcion}</TableCell>
                           </TableRow>
                        )}
                        })}
                 <TableRow>
                 <TableCell>Total:{sumWithInitial.toLocaleString()} </TableCell>
                 </TableRow>
                  </TableBody>
                  </Table>
            </TableContainer> 
        </Paper>  
  )
}

const Pagos =(props) =>{

  const  {pagos,idReserva,typy_buy} = props

  const [payState,setPatSate]=useState()

  const [loading, setloading] = useState(false);
 
  useEffect(() =>{
    fetch(`${config.serverRoute}/api/resecion/getPayabono/${idReserva}`)
    .then(resp => resp.json())
    .then(data=> setPatSate(data.query))
  },[loading])

let count =0
for(let i =0;i<payState?.length;i++){
    if((payState[i].Tipo_persona =="empresa")){
        const total =  parseInt(payState[i].Abono)
        count += total
    }else  if((payState[i].Iva ==1)){
        const total =  parseInt(payState[i].Abono)
        count += total
    } else{
        count += parseInt(payState[i].Abono)
    }
}

const total = count?.toLocaleString()

return (

  
  <Paper sx={{ width: '100%',margin:"10px" }}>
         <TableContainer  component={Paper}   onSubmit={(e) =>{
           e.preventDefault()
         }} >
           <LoadingDetail  
                           loading={true}
                           titleLoading={"Pagos"}  />
               <Table  > 
               <TableHead>
                   <TableRow>
                   <TableCell align="right">Fecha</TableCell>
                   <TableCell align="right">Abono</TableCell>
                   <TableCell align="right">Recepcion</TableCell>
                   <TableCell align="right">Tipo pago</TableCell>
                   <TableCell align="right">Editar forma de pago</TableCell>
                   </TableRow>
               </TableHead>
               <TableBody>
                     {payState?.map(index =>{
                           return  <ItemCardPago index={index}typy_buy={typy_buy}  setloading={setloading} />
                       })}
               </TableBody>
               <TableHead>
                   <TableRow>
                    <TableCell align="right">Total ${total}</TableCell>
                   </TableRow>
               </TableHead>
               </Table>
         </TableContainer> 
     </Paper>  
)
}

const ItemCardPago =({index,typy_buy,setloading}) => { 

  const fecha =moment(index.Fecha_pago).utc().format('YYYY/MM/DD')
  const abonoWithIva  = index.Abono * 19/100 
  const totalIva  = index.Abono 
  const totalDefinid = parseInt(index.Abono)
  const totalDefinttion = index.Tipo_persona =="empresa" ?totalIva:totalDefinid
  const total = totalDefinttion.toLocaleString()

  const [isEditing, setIsEditing] = useState(false)
  const [pay,setPay]=useState(null)

  let taskContent

  const handClickSave =() =>{
      HttpClient.handchangeformapay({ID:index.ID,Tipo_forma_pago:pay}).then(itemForma =>{
      setIsEditing(false)
      setloading(evenItem =>({
        ...evenItem,
        Isval: !evenItem
      }))
    }).catch(e =>{
      console.error("error")
    })
  }

  if(isEditing){
      taskContent  =(
        <> 
          <TableCell>                      
            <select   className="desde-detail-two-pagos-store"
                onChange={(e) =>setPay(e.target.value)} 
                >
              {typy_buy.map(itemTybuy => (
                
                <option value={itemTybuy.id} >{itemTybuy.name}</option>
              ))}
          </select>
        </TableCell>
          <TableCell ><CiExport fontSize={30} color="black"  className="editar-checking" onClick={handClickSave}   /></TableCell>
        </>
      )
    }else{
      taskContent =(
        <>                         
          <TableCell align="right">{index.Nombre}</TableCell>
            <TableCell className="editar-checking"  ><CiEdit fontSize={30} color="black" onClick={() => setIsEditing(true) }  /> 
          </TableCell>
        </>

      )
    }

  return (
      <TableRow>
        <TableCell align="right">{fecha}</TableCell>
        <TableCell align="right">${total} </TableCell>
        <TableCell align="right" >{index.Nombre_recepcion}</TableCell>
        {taskContent}
      </TableRow>
    )
}

