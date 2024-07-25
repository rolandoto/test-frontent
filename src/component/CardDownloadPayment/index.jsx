import React, { useContext, useEffect } from "react"
import { GoDownload } from "react-icons/go";
import useApiWompiActions from "../../action/useApiWompiActions";
import { useSelector } from "react-redux";
import AutoProvider  from "../../privateRoute/AutoProvider";
import jsPDF from "jspdf"; // check the docs for this: https://parall.ax/products/jspdf
import html2canvas from "html2canvas";
import moment from "moment";
// Estilo para el título
const titleStyle = {
    fontSize: 20,
    fontStyle: 'normal',
    textColor: 'black'
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


  const bodyStyleBg = {
    fontSize: 12,
    fontStyle: 'normal',
    color: 'black', // Corrige 'textColor' a 'color'
    backgroundColor: 'black'
  };
  

const CardDownloadPayment =({id_prod_card ,Nombre,Correo,Apellido}) =>{
    const {jwt} =useContext(AutoProvider)
    const {getDetailPayment} = useApiWompiActions()
    const {wompi,loading,error} = useSelector((state) => state.ApiwompiReducersSlice)

    const FetchDate =async() =>{
        await getDetailPayment({id:id_prod_card})
    }

    useEffect(() =>{
        FetchDate()
    },[])



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
        
        pdf.setTextColor(titleStyle.textColor);
        pdf.setFontSize(titleStyle.fontSize);
        pdf.setFontStyle(titleStyle.fontStyle);
        pdf.setFontStyle(bodyStyleBg.backgroundColor);
        pdf.text(10, 10, "Comprobante de reserva de wompi");
        pdf.text(180, 10, jwt?.result?.hotel);

        pdf.setTextColor(subtitleStyle.textColor);
        pdf.setFontSize(subtitleStyle.fontSize);
        pdf.setFontStyle(subtitleStyle.fontStyle);
        pdf.setFontStyle(bodyStyleBg.backgroundColor);
        pdf.text(10, 36, "Tu codigo de Reservas:");


         pdf.setTextColor(bodyStyle.textColor);
        pdf.setFontSize(bodyStyle.fontSize);
        pdf.setFontStyle(bodyStyle.fontStyle);
        pdf.setFontStyle(bodyStyleBg.backgroundColor);
        pdf.text(10, 43, `X14A-${wompi.data.id}`);
        
        const status = wompi.data.status == "APPROVED" ? "Aprobado" : "No aprobado";

        // Aplica el color condicionalmente solo para el estado
        if (status === "Aprobado") {
          pdf.setTextColor(34, 197, 94); // Color negro
        } else {
          pdf.setTextColor(255, 0, 0); // Color rojo
        }
        
        pdf.setFontSize(bodyStyleBg.fontSize);
        pdf.setFont(bodyStyleBg.fontStyle);
        
        // Añade el texto del estado
        pdf.text(10, 49, `Estado: ${status}`);
        
        // Restaura el color original para otros textos
        pdf.setTextColor(0, 0, 0); // Asume que el color original es negro
        

        let modifiedNumber =  wompi.data.amount_in_cents.toString().split('').reverse().join('').replace('00', '').split('').reverse().join('');

        pdf.setFontStyle(bodyStyleBg.backgroundColor);
        pdf.text(10, 55, `COP: $${parseInt(modifiedNumber).toLocaleString()}`);

        
        pdf.setFontStyle(bodyStyleBg.backgroundColor);
        pdf.text(10, 61, `Fecha Relizacion:  ${moment(wompi.data.created_at).utc().format('YYYY/MM/DD HH:mm')}`);

        pdf.setFontStyle(bodyStyleBg.backgroundColor);
        pdf.text(10, 68, `Fecha Finalización: ${moment(wompi.data.finalized_at).utc().format('YYYY/MM/DD HH:mm')}`);

        pdf.setFontStyle(bodyStyleBg.backgroundColor);
        pdf.text(10, 75, `Nombre: ${Nombre}`);

        pdf.setFontStyle(bodyStyleBg.backgroundColor);
        pdf.text(10, 82, `Apellido: ${Apellido}`);


        pdf.setFontStyle(bodyStyleBg.backgroundColor);
        pdf.text(10, 89, `Correo: ${Correo}`);
      

        pdf.save("download.pdf"); // Guarda el PDF
        });
      };
      

    const fillConten =() =>{

        if(loading){
            return <p>...cargando</p>
        }if(error){
            return <p></p>
        }
        return   <div className="fixed z-0  left-0 right-0 top-80  flex items-center  justify-end ">
                    <div onClick={print}  className="bg-[#22c55e] cursor-pointer rounded-full p-2">
                            <GoDownload fontSize={30} color="white" />
                    </div>
                </div>
    }

   
    return (<>  

                {fillConten()}
              
            </>)

}

export default CardDownloadPayment