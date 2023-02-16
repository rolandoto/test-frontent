import moment from "moment"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import ServiceAuditoria from "../../service/ServiceInformeAuditoria"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import LoadingDetail from "../../Ui/LoadingDetail"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./style.css"

const InformeAuditoria =() =>{

    const [auditoria,setAuditoria] =useState()
    const [LookinforFecha,setLokinforFecha] =useState()
    const [loading,setLoading] =useState({loading:false,error:false})

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }

    const hanLookingFor =() =>{
        setLoading({loading:true})
        ServiceAuditoria({id:13,fecha:LookinforFecha}).then(index =>{
            setAuditoria(index.data)
            setLoading({loading:true})
        }).catch(e =>{
            setLoading({loading:false})
            setAuditoria(null)
        })
    }

    return (
        <ContainerGlobal>
             <LoadingDetail  
                        loading={true}
                        titleLoading={"Informe  auditoria"}  />

            <div>
                <input type="date" className="input-selecto-dasboard-n1-reservaction"  onChange={hadChangeFecha} value={LookinforFecha}   />
                <button className="button-informe-cosultar" onClick={hanLookingFor}>Consultar</button>
                {loading.loading &&  <button className="button-informe-descargar" >Descargar Informe</button>}
            </div>
           
            <table className="de" >
                <tbody>
                    <tr>
                        <th>Factura</th>
                        <th>Cuenta</th>
                        <th>Fecha</th>
                        <th>Pago</th>
                        <th>Identificacion</th>
                        <th>Cliente</th>
                        <th>Exento</th>
                        <th>Total</th>
                    </tr>
                        {auditoria?.map(index =>{
                            const fecha =  moment(index.Fecha).utc().format('YYYY/MM/DD')
                            const valorHabitacon = index.Exento.toLocaleString()
                            return (
                        <tr>
                            <td className="width-informe" >{index.Codigo}</td>
                            <td className="width-informe" >{index.Cuenta}</td>
                            <td className="width-informe" >{fecha}</td>
                            <td className="width-informe" >{index.Tipo_pago}</td>
                            <td className="width-informe" >{index.Identificacion}</td>
                            <td className="width-informe" >{index.Cliente}</td>
                            <td className="width-informe" >${index.Exento}</td>
                            <td className="width-informe" >${valorHabitacon}</td>
                        </tr>  
                       )
                        })}
                </tbody>
            </table>

                        
        <DescargarInforme auditoria={auditoria} />   
            
        </ContainerGlobal>
    )

}




export default InformeAuditoria



const DescargarInforme =({auditoria}) =>{
    
    let docToPrint = React.createRef();
    
    const printDocument = () => {
        const input = docToPrint.current;
        html2canvas(input,{scale:0.8}).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "landscape",
            
            format:  [500, 900 ]
        });
        pdf.addImage(imgData, "JPEG", 0, 0);
        // pdf.output("dataurlnewwindow");
        pdf.save("Up4-receipt.pdf");
        });
    };

    useEffect(() =>{
        printDocument()
    },[])
    
    return (
        <ContainerGlobal>
            <table ref={docToPrint}  >
              
                    <tr>
                        <th>Factura</th>
                        <th>Cuenta</th>
                        <th>Fecha</th>
                        <th>Pago</th>
                        <th>Identificacion</th>
                        <th>Cliente</th>
                        <th>Exento</th>
                        <th>Total</th>
                    </tr>
                        {auditoria?.map(index =>{
                            const fecha =  moment(index.Fecha).utc().format('YYYY/MM/DD')
                            const valorHabitacon = index.Exento.toLocaleString()
                            return (
                        <tr>
                            <td className="width-informe" >{index.Codigo}</td>
                            <td className="width-informe" >{index.Cuenta}</td>
                            <td className="width-informe" >{fecha}</td>
                            <td className="width-informe" >{index.Tipo_pago}</td>
                            <td className="width-informe" >{index.Identificacion}</td>
                            <td className="width-informe" >{index.Cliente}</td>
                            <td className="width-informe" >${index.Exento}</td>
                            <td className="width-informe" >${valorHabitacon}</td>
                        </tr>  
                       )
                        })}
              
            </table>
        </ContainerGlobal>
    )
}