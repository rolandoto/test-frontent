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
import { useContext } from "react"
import AutoProvider  from "../../privateRoute/AutoProvider"

const InformeAuditoria =() =>{

    const [auditoria,setAuditoria] =useState()
    const [store,setStore] =useState()
    const [LookinforFecha,setLokinforFecha] =useState()
    const [loading,setLoading] =useState({loading:false,error:false})
    const [loadingInforme,setLoadingInforme] =useState(false)
    const {jwt} = useContext(AutoProvider)

    const handClikcDescargar =() =>{
        setLoadingInforme(true)
    }

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }

    const hanLookingFor =() =>{
        setLoading({loading:true})
        ServiceAuditoria({id:jwt.result.id_hotel,fecha:LookinforFecha}).then(index =>{
            setAuditoria(index.result)
            setStore(index.queryTwo)
            setLoading({loading:true})
        }).catch(e =>{
            setLoading({loading:false})
            setAuditoria(null)
        })
    }

    const priceInformeStore = store?.reduce((acum,current) => {
        return acum  +   parseInt(current.total) 
    },0)


    console.log(store)

    let count =0
    for(let i =0;i<auditoria?.length;i++){
        if((auditoria[i].total)){
            count += parseInt(auditoria[i].total)
            count += parseInt(auditoria[i].Valor_habitacion)
        }else{
            count += parseInt(auditoria[i].Valor_habitacion)
        }
    }

   const totalPriceInforme =count +priceInformeStore

   const totalDefinisInforme = totalPriceInforme.toLocaleString();


   const totalLoading = auditoria ?auditoria  : store

    return (
        <ContainerGlobal>
             <LoadingDetail  
                        loading={true}
                        titleLoading={"Informe  auditoria"}  />
            <div>
                <input type="date" className="input-selecto-dasboard-n1-reservaction"  onChange={hadChangeFecha} value={LookinforFecha}   />
                <button className="button-informe-cosultar" onClick={hanLookingFor}>Consultar</button>
                <button className="button-informe-descargar" onClick={handClikcDescargar} >Descargar Informe</button>
               <button className="button-informe-imprimir">Imprimir</button>
            </div>
           
            <table className="de" >
                <tbody>
                    <tr>    
                        <th>Codigo reserva</th>
                        <th>Factura</th>
                        <th>Habitacion</th>
                        <th>Fecha</th>
                        <th>Pago</th>
                        <th>Identificacion</th>
                        <th>Cliente</th>
                        <th>Exento</th>
                        <th>Total</th>
                    </tr>
                    {auditoria?.map(index =>{
                          const fecha =  moment(index.Fecha_inicio).utc().format('YYYY/MM/DD')

                            const PriceWithienda =  parseInt(index.total) + parseInt(index.Valor_habitacion)

                            const totalWith = PriceWithienda.toLocaleString()

                            const totalDefinit = totalWith  =="NaN" ?  parseInt(index.Valor_habitacion).toLocaleString()  : totalWith
                            console.log(totalWith)
                            return (
                        <tr>
                            <td className="width-informe" >X14A-{index.Num_documento}{index.ID_reserva}</td>
                            <td className="width-informe" >0</td>
                            <td className="width-informe" >{index.Numero}</td>
                            <td className="width-informe" >{fecha}</td>
                            <td className="width-informe" >{index.Tipo_pago}</td>
                            <td className="width-informe" >{index.Num_documento}</td>
                            <td className="width-informe" >{index.Nombre_Person} {index.Apellido}</td>
                            <td className="width-informe" >${totalDefinit}</td>
                            <td className="width-informe" >${totalDefinit}</td>
                        </tr>  
                       )})}

                        {store?.map(index =>{
                             const fecha =  moment(index.Fecha_compra).utc().format('YYYY/MM/DD')
                             const PriceWithienda =  parseInt(index.total)
                             const totalWith = PriceWithienda.toLocaleString()
                            return (
                        <tr>
                            <td className="width-informe" >X14A-{index.Num_documento}{index.ID_Reserva}</td>
                            <td className="width-informe" >0</td>
                            <td className="width-informe" >Tienda</td>
                            <td className="width-informe" >{fecha}</td>
                            <td className="width-informe" >{index.Tipo_pago}</td>
                            <td className="width-informe" >{index.Num_documento}</td>
                            <td className="width-informe" >{index.Nombre_persona}</td>
                            <td className="width-informe" >${totalWith}</td>
                            <td className="width-informe" >${totalWith}</td>
                        </tr>  
                       )})}
                        <div>
                            <th className="width-informe" >Total ${totalDefinisInforme}</th>
                           
                        </div>       
                </tbody>   
            </table>
                    
               
        {loadingInforme &&  <DescargarInforme auditoria={auditoria} setLoadingInforme={setLoadingInforme}  totalPriceInforme={totalPriceInforme} />   }
            
        </ContainerGlobal>
    )

}




export default InformeAuditoria



const DescargarInforme =({auditoria,setLoadingInforme,totalPriceInforme}) =>{
    
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
    
    setTimeout(() =>{
        setLoadingInforme(false)
    },1000)

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
                <div>
                            <th className="width-informe" >Total ${totalPriceInforme}</th>
                           
                        </div>  
            </table>
        </ContainerGlobal>
    )
}