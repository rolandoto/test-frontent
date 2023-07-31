import React, { useContext, useEffect, useRef, useState } from  "react"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import UseListMotels from "../../hooks/UseListMotels";
import html2pdf from 'html2pdf.js';
import { useReactToPrint } from "react-to-print";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import { PiSignatureLight } from "react-icons/pi";
import { Button } from "@nextui-org/react";

const SingnatureMaual =() =>{

    const {id} =useParams()
    const history =  useHistory()
    const {iduser} = UseListMotels()
    const {jwt} = useContext(AutoProvider)
    const [document,setDocument] =useState()

    const {getDetailReservationById} = useDetailDashboardAction()

    const {loading,error,DetailDashboard
    } = useSelector((state) => state.DetailDashboard)

    const fetchData =async() =>{
        await getDetailReservationById({id})
    }

    useEffect(() =>{
        fetch("https://grupohoteles.co/api/getTipeDocument")
        .then(res => res.json())
        .then(data => setDocument(data))
        fetchData()
    },[id])


    const findIndexItem = DetailDashboard?.find((ItemDetail) => ItemDetail.ID_RESERVA ==  id)

    const doc = document?.find((item) => item.ID ==findIndexItem?.ID_Tipo_documento )

    console.log({document})

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const handClikcDescargar =() =>{
        handlePrint()
    }

    const FindIdHotel=(hotel) =>{
        return hotel.id_hotel == jwt.result.id_hotel
      }

    const hotel = iduser.find(FindIdHotel)

    
    if(loading){
        return <p>...Cargando</p>
    }
    if(error){
        return <p>error</p>
    }

    const handNextDetailReservation=() =>{
        history.push(`/DetailDashboard/${id}`)
    }

    if(!findIndexItem) return null
    if(!doc) return null

    return (<>
   
        <main className="container-webcking"  ref={componentRef}>
            <div className="container-contracto" >
                <h1>{hotel?.nombre}</h1>
                <span>NIT. 900768373-3</span>
                <span>Teléfono: 4482374</span>
                <span>MEDELLIN</span>
            </div>           
        
            <table className="customers-table">
                <tr>
                    <td>Nombre: {findIndexItem.Nombre} {findIndexItem.Apellido} </td>
                    <td>Nacionalidad: {findIndexItem.nacionalidad}</td>
                    <td>Tipo Documento {doc.nombre}:</td>
                    <td>No Documento: {findIndexItem.Num_documento} </td>
                </tr>
                <tr>
                    <td>Direcion:  {findIndexItem.Celular} </td>
                    <td>Ciudad:  {findIndexItem.Ciudad}</td>
                    <td>Celular:  {findIndexItem.Celular}</td>
                    <td>Correo: {findIndexItem.Correo} </td>
                </tr>
                <tr>
                    <td>Fecha entrada: {moment(findIndexItem.Fecha_inicio).utc().format('YYYY/MM/DD')} </td>
                    <td>Fecha salida:  {moment(findIndexItem.Fecha_final).utc().format('YYYY/MM/DD')}</td>
                </tr>
                </table>
                <p className="p-contracto"  >CONTRATO DE HOSPEDAJE. 1. Conforme a los artículos 79 y 81 de la Ley 300 de 1996, la Tarjeta de Registro Hotelero conforma el contrato de hospedaje celebrado entre el HOTEL y el HUÉSPED. El contrato es aceptado por la firma del HUÉSPED. El presente contrato es de adhesión, por tal motivo el HUÉSPED se adhiere a las estipulaciones aquí contenidas. 2. El HUÉSPED conoce y acepta el tipo de habitación, la tarifa cobrada por el servicio de hospedaje así como las fechas de ingreso y de salida consignadas en esta Tarjeta de Registro Hotelero. 3. La hora para efectuar el check in es a partir de las 15:00 horas y para efectuar el check out es hasta las 13:00 horas y que el ingreso temprano (early check in) o salida tarde (late check out) podrá generar costos adicionales. La mora en el pago causara intereses de mora a la tasa máxima permitida, conforme al articulo 884 del código de comercio. 4. El HUÉSPED acepta que la suma liquida de dinero que conste en la factura presta merito ejecutivo. 5. El HUÉSPED conoce que la tarifa del hospedaje deberá ser prepagada y los consumos adicionales garantizados mediante tarjeta de crédito o depósito. En caso que la garantía sea tarjeta de crédito, el HUÉSPED autoriza el diligenciamiento del voucher y su presentación ante la respectiva entidad bancaria. 6. El HOTEL a su discrecionalidad se reserva el derecho de admitir el ingreso de huéspedes adicionales o acompañantes. Todo menor de edad debe hospedarse en compañía de los padres y portar sus respectivos documentos de identificación. 7. El HOTEL se reserva el derecho de ingreso de mascotas a sus instalaciones. El HOTEL es 100% libre de humo Su incumplimiento da lugar a la terminación del contrato y a la imposición de multas establecidas en el contrato. 8. El HUÉSPED puede ejercer derecho al retracto únicamente en compras no presenciales realizadas a través de portales web o en la central de reservas telefónica. La solicitud debe realizarla en máximo cinco (5) días hábiles posteriores a la confirmación de la compra. Si la fecha de ingreso es antes de los cinco días, no procederá el derecho al retracto y en caso de cancelación se aplicaran las condiciones de cancelación y devolución y que son: Si la cancelación de la reserva se realiza de 8 o mas días antes de la fecha de check in, se realizará una devolución del 80% correspondiente al valor depositado. - Si la cancelación de la reserva se realiza dentro de 8 a 3 días antes del check in se cobrara el 50% del valor depositado. - Si la cancelación de la reserva se realiza dentro de las 48 horas antes del check in se cobrara la totalidad del valor depositado. - En caso que estando alojado tenga una salida anticipada y se haya realizado el pago total del alojamiento, tendrá un saldo a favor que podrá utilizar en cualquier establecimiento operado por Grupo Hoteles en las ciudades de Medellín y Cartagena, que deberá redimirse en 1 año. Una vez recibida la solicitud, te reintegraremos el valor de devolución en un término máximo de 30 días calendarios contados a partir de tu solicitud. Lo realizaremos mediante consignación bancaria al titular de la reserva o mediante reversión de tarjeta de crédito. 9. El HUÉSPED autoriza irrevocablemente al HOTEL, sus titulares y operadores para recolectar, usar y tratar los datos personales suministrados por el HUÉSPED en la Tarjeta de Registro Hotelero con fines comerciales y de conformidad con las políticas de tratamiento de datos personales. El HUÉSPED autoriza la consulta y reporte ante centrales de riesgo de información sobre el cumplimiento de las obligaciones y/o pago de los servicios de hospedajes u hoteleros. El HUÉSPED, en su condición de titular de los datos personales, gozará de todos los derechos de ley y en particular tendrá derecho a conocer, acceder, actualizar y rectificar sus datos personales, revocar la autorización concedida o solicitar la supresión de información cuando ello sea procedente. El HUÉSPED declara que conoce las políticas de tratamiento de datos personales y que pueden ser consultadas en la página https://www.grupohoteles.co 10. El HUÉSPED se adhiere a la totalidad de las estipulaciones contractuales del contrato de hospedaje y que obran en el sitio web wwww.galleryhotel.co/contratodehospedaje.pdf. El HUÉSPED declara que conoce la totalidad de las estipulaciones contractuales detalladas en la pagina web. El HOTEL, su titular y/o su operador pueden variar o modificar la versión de las condiciones del contrato de hospedaje en cualquier momento. Es obligación del HUÉSPED asegurarse de verificar las condiciones integras y actuales en el sitio web.</p>
                <button onClick={handClikcDescargar}>Descargar Contrato</button>
                <div class="signature-box">
                    <div class="signature-line"></div>
                    <div class="signature-text">Firma del Cliente</div>
                </div>

              
            
                </main>
                <div className="container-button-level" >
                <Button   
                        onClick={handNextDetailReservation}     
                        color={"success"}  
                        style={{width:"100%"}}
					icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>Finalizar</span></Button>  
                </div>

               
        </>
    )

}
export default  SingnatureMaual