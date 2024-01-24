import moment from "moment"
import React, { useRef } from "react"
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
import { useReactToPrint } from "react-to-print";
import UseFilterAuditoria from "../../hooks/UseFilterAuditoria"
import "moment/locale/es";

const InformeAuditoria =() =>{


    const [auditoria,setAuditoria] =useState()
    const [ocasional,setOcasional] =useState()
    const [carritoOcasinal,setcarritoOcasional] =useState()
    const [store,setStore] =useState()
    const [storeOne,setStoreOne] =useState()
    const [LookinforFecha,setLokinforFecha] =useState()
    const [loading,setLoading] =useState({loading:false,error:false})
    const [loadingInforme,setLoadingInforme] =useState(false)
    const {jwt} = useContext(AutoProvider)

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }

    const hanLookingFor =() =>{
        setLoading({loading:true})
        ServiceAuditoria({id:jwt.result.id_hotel,fecha:LookinforFecha}).then(index =>{
            setAuditoria(index.result)
            setStore(index.queryTwo)
            setOcasional(index.groupedOcasional)
            setStoreOne(index.queryOne)
            setcarritoOcasional(index.queryThree)
            setLoading({loading:true})
        }).catch(e =>{
            setLoading({loading:false})
            setAuditoria(null)
        })
    }

   
   let componentRef = useRef();

   const handlePrint = useReactToPrint({
    content: () => componentRef.current
    });

    const handClikcDescargar =() =>{
        handlePrint()
    }



    // <button className="button-informe-descargar">Descargar Informe</button>

    const {filterAuditoriaRoom,setCategory} =  UseFilterAuditoria()

    const  audiFiltrar =  filterAuditoriaRoom(auditoria)

    const  audOcasional=  filterAuditoriaRoom(ocasional)

    const storeFilter = filterAuditoriaRoom(store)

    const storeOneFiltrar =  filterAuditoriaRoom(storeOne)

    const CarritoOcasional =  filterAuditoriaRoom(carritoOcasinal)

   

    const handChangeCategory =(event) =>{
        setCategory(prevent  =>({
            ...prevent,
            Forma_pago:event.target.value,
        }))
    }

    const priceInformeStore = storeFilter?.reduce((acum,current) => {
        return acum  +   parseInt(current.total) 
    },0)

    const priceInformeStoreOne = storeOneFiltrar?.reduce((acum,current) => {
        return acum  +   parseInt(current.total) 
    },0)


    const priceInformeOcasional = audOcasional?.reduce((acum,current) => {
        return acum  +   parseInt(current.Abono) 
    },0)


    const priceInformeCarritoOcasinal = CarritoOcasional?.reduce((acum,current) => {
        return acum  +   parseInt(current.total) 
    },0)

    
    let count =0
    if(storeOneFiltrar){
        for(let i =0;i<audiFiltrar?.length;i++){
            if((audiFiltrar[i].Tipo_persona =="empresa")){
                const total =  parseInt(audiFiltrar[i].abono )
                count += total
            }else  if((audiFiltrar[i].Iva ==1)){
                const total = parseInt(audiFiltrar[i]?.abono )
                count += total
            } else{
                count += parseInt(audiFiltrar[i]?.abono)
            }
        }
    }


    const  tipo_forma_pago =  [
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
      
    
    const totalPriceInforme = count +priceInformeStore+priceInformeStoreOne+priceInformeOcasional+priceInformeCarritoOcasinal

    const totalDefinisInforme = totalPriceInforme.toLocaleString();

    return (
        <ContainerGlobal>
        <LoadingDetail  
                   loading={true}
                   titleLoading={"Informe  auditoria"}  />
       <div style={{display:"flex",alignItems:"center"}} >
           <input type="date" className="input-selecto-auditoria-fechas"  onChange={hadChangeFecha} value={LookinforFecha}   />
           <select className="input-selecto-dasboard-n1-reservaction"   onChange={handChangeCategory} >
               <option value="0">Filtrar tipo forma pago</option>
               {tipo_forma_pago.map(index =>(
                   <option value={index.id} key={index.id} >
                           {index.name}
                   </option>
               ))}
           </select>
           <button className="button-informe-cosultar-auditoria" onClick={hanLookingFor}>Consultar</button>
           <button className="button-informe-imprimir-auditoria" onClick={handClikcDescargar} >Imprimir</button>
       </div>
      
       <table className="de table"  ref={componentRef} >
           <tbody>
               <tr>    
                   <th>Codigo reserva</th>
                   <th>Factura</th>
                   <th>Habitacion</th>
                   <th>Recepcion</th>
                   <th>Concepto</th>
                   <th>Descripción</th>
                   <th>Fecha</th>
                   <th>Pago</th>
                   <th>Identificacion</th>
                   <th>Cliente</th>
                   <th>Exento</th>
                   <th>Total</th>
               </tr>
               {audiFiltrar?.map(index =>{
                       const fecha =  moment(index.Fecha_pago).utc().format('YYYY/MM/DD')
                       console.log({index})
                       const PriceWithienda =  parseInt(index.abono)

                       const total =  PriceWithienda

                       const totalDefinid = index.Iva ==1? total : parseInt(index.abono)

                       const totalDefinttion = index.Tipo_persona =="empresa" ?total:totalDefinid

                       const totalWith = totalDefinttion.toLocaleString()

                       const totalDefinit = totalWith  =="NaN" ?  parseInt(index.abono).toLocaleString()  : totalWith

                   return (
                   <tr>
                       <td className="width-informe" >X14A-{index.Num_documento}{index.ID_reserva}</td>
                       <td className="width-informe" >0</td>
                       <td className="width-informe" >{index.Numero}</td>
                       <td className="width-informe" >Recepcion</td>
                       <td className="width-informe" >Estadia</td>
                       <td className="width-informe" >{index.Habitacion} </td>
                       <td className="width-informe" >{fecha}</td>
                       <td className="width-informe" >{index.Nombre}</td>
                       <td className="width-informe" >{index.Num_documento}</td>
                       <td className="width-informe" >{index.Nombre_Person} {index.Apellido}</td>
                       <td className="width-informe" >${totalDefinit}</td>
                       <td className="width-informe" >${totalDefinit}</td>
                   </tr>  
                  )})}

                   {storeFilter?.map(index =>{
                        const fecha =  moment(index.Fecha_compra).utc().format('YYYY/MM/DD')
                        const PriceWithienda =  parseInt(index.total)
                      
                        const totalWith = PriceWithienda.toLocaleString()
                       return (
                   <tr>
                       <td className="width-informe" >X14A-{index.Num_documento}{index.ID_Reserva}</td>
                       <td className="width-informe" >0</td>
                       <td className="width-informe" >Tienda</td>
                       <td className="width-informe" >Recepcion</td>
                       <td className="width-informe" >Tienda</td>
                       <td className="width-informe" >{index.Cantidad}  {index.Nombre} </td>
                       <td className="width-informe" >{fecha}</td>
                       <td className="width-informe" >{index.Tipo_pago}</td>
                       <td className="width-informe" >{index.Num_documento}</td>
                       <td className="width-informe" >{index.Nombre_persona}</td>
                       <td className="width-informe" >${totalWith}</td>
                       <td className="width-informe" >${totalWith}</td>
                   </tr>  
                  )})}

                {audOcasional?.map(index =>{
                        const fecha =  moment(index.Fecha).utc().format('YYYY/MM/DD')

                        const PriceWithienda =  parseInt(index.Abono)
                        const totalWith = PriceWithienda.toLocaleString()
                       return (
                   <tr>
                       <td className="width-informe" >X14A-</td>
                       <td className="width-informe" >0</td>
                       <td className="width-informe" >{index.Numero}</td>
                       <td className="width-informe" >{index.username}</td>
                       <td className="width-informe" >Ocasional  fecha ingreso {index.Time_ingreso}, fecha salida {index.Time_salida} </td>
                       <td className="width-informe" >{index.Habitacion} </td>
                       <td className="width-informe" >{fecha}</td>
                       <td className="width-informe" >{index.Tipo_forma_pago}</td>
                       <td className="width-informe" >00000</td>
                       <td className="width-informe" >00000</td>
                       <td className="width-informe" >${totalWith}</td>
                       <td className="width-informe" >${totalWith}</td>
                   </tr>  
                  )})}


                    {CarritoOcasional?.map(index =>{
                        const fecha =  moment(index.Fecha_compra).utc().format('YYYY/MM/DD')
                        const PriceWithienda =  parseInt(index.total)
                        const totalWith = PriceWithienda.toLocaleString()
                       
                       return (
                   <tr>
                       <td className="width-informe" >X14A-0000</td>
                       <td className="width-informe" >0</td>
                       <td className="width-informe" >000000</td>
                       <td className="width-informe" >{index.name}</td>
                       <td className="width-informe" >Minibar Ocasional</td>
                       <td className="width-informe" >{index.Cantidad}  {index.Nombre} </td>
                       <td className="width-informe" >{fecha}</td>
                       <td className="width-informe" >{index.Tipo_pago}</td>
                       <td className="width-informe" >000000</td>
                       <td className="width-informe" >0000000 00000</td>
                       <td className="width-informe" >${totalWith}</td>
                       <td className="width-informe" >${totalWith}</td>
                   </tr>  
                  )})}

                  
               {storeOneFiltrar?.map(index =>{
                        const fecha =  moment(index.Fecha_compra).utc().format('YYYY/MM/DD')
                        const PriceWithienda =  parseInt(index.total)
                        const totalWith = PriceWithienda.toLocaleString()
                       
                       return (
                   <tr>
                       <td className="width-informe" >X14A-{index.Num_documento}{index.ID_Reserva}</td>
                       <td className="width-informe" >0</td>
                       <td className="width-informe" >{index.Numero}</td>
                       <td className="width-informe" >Recepcion</td>
                       <td className="width-informe" >Minibar</td>
                       <td className="width-informe" >{index.Cantidad}  {index.Nombre_producto} </td>
                       <td className="width-informe" >{fecha}</td>
                       <td className="width-informe" >{index.Tipo_pago}</td>
                       <td className="width-informe" >{index.Num_documento}</td>
                       <td className="width-informe" >{index.Nombre_Person} {index.Apellido}</td>
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
            <table  className="table" ref={docToPrint}  >
              
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