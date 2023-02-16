import moment from "moment";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import ServiceInformeCamareria from "../../service/ServiceInformeCamereria";
import ContainerGlobal from "../../Ui/ContainerGlobal";
import LoadingDetail from "../../Ui/LoadingDetail";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";

const InformeCamareria =() =>{
    const {jwt} =useContext(AutoProvider)

    const [camareria,setCamareria]=useState()
    const [LookinforFecha,setLokinforFecha] =useState()
    const [loadingInforme,setLoadingInforme] =useState(false)

    const handClikcDescargar =() =>{
        setLoadingInforme(true)
    }

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }

    const hanLookingFor =() =>{
        ServiceInformeCamareria({id:jwt.result.id_hotel,fecha:LookinforFecha}).then(index =>{
            setCamareria(index.uniqueArray)
        }).catch(e =>{
         
        })
    }

    function printDoc() {
        const printWin = window.open("", "print", "height=400,width=600");
    
        const content = ReactDOMServer.renderToStaticMarkup(<DescargarInforme />);
        printWin.document.write(content);
        printWin.print();
      }
    

    return (
        <ContainerGlobal>
               <LoadingDetail  
                        loading={true}
                        titleLoading={"Informe  Camareria"}  />

            <div>
                <input type="date" className="input-selecto-dasboard-n1-reservaction"  onChange={hadChangeFecha}    />
                <button className="button-informe-cosultar" onClick={hanLookingFor} >Consultar</button>
                {camareria?.length>0 && <button className="button-informe-descargar"  onClick={handClikcDescargar} >Descargar Informe</button>}
                {camareria?.length>0 &&<button className="button-informe-imprimir"  ><a href="#" onClick={printDoc}>
                    Imprimir
                </a></button>}

                
            </div>
           
            {camareria?.length>0 &&
            <table className="de" >
                <tbody>
                    <tr>    
                        <th>Habitacion</th>
                        <th>Adultos</th>
                        <th>Niños</th>
                        <th>Estado</th>
                        <th>Salida prevista</th>
                        <th>Huesped</th> 
                        <th>Observaciones</th>
                    </tr>
                        {camareria?.map(index =>{
                          let startDateOne = new Date(index.Fecha_final);
                          let monthOne = startDateOne.toLocaleString("default", { month: "long" });
                          let mesOne = startDateOne.getDate()
                          let yearOne = startDateOne.getFullYear()

                          if(index.Id_estado==1){
                            return (
                                <tr>
                                    <td className="width-informe" >{index.Habitacion}</td  >
                                    <td className="width-informe" >{index.Adultos}</td>
                                    <td className="width-informe" >{index.Ninos}</td>
                                    <td className="width-informe" >{index.Estado}</td>
                                    <td className="width-informe" >{mesOne}-{monthOne}</td>
                                    <td className="width-informe" >{index.Nombre}</td>
                                    <td className="width-informe" >{index.Nombre}</td>
                                </tr>  
                               )
                            }
                            if(index.Id_estado==2){
                                return (
                                    <tr>
                                        <td>{index.Habitacion}</td>
                                        <td> </td>
                                        <td></td>
                                        <td>{index.Estado}</td>
                                        <td></td>
                                    </tr>  
                                   )
                            }
                            if(index.Id_estado==3){
                                return (
                                    <tr>
                                        <td>{index.Habitacion}</td>
                                        <td> </td>
                                        <td></td>
                                        <td>{index.Estado}</td>
                                        <td></td>
                                    </tr>  
                                   )
                            }
                        })}
                     
                </tbody>

                
            </table>
        }
            {loadingInforme &&  <DescargarInforme  camareria={camareria} setLoadingInforme={setLoadingInforme} />}
        </ContainerGlobal>
    )
}

export default InformeCamareria

const DescargarInforme =({camareria,setLoadingInforme}) =>{
    
    let docToPrint = React.createRef();

    const printDocument = () => {
        const input = docToPrint.current;
        html2canvas(input,{scale:0.8}).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "landscape",
            
            format:  [800, 800 ]
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
            <table ref={docToPrint} className="de"  >
              
            <tbody >
                    <tr>    
                        <th>Habitacion</th>
                        <th>Adultos</th>
                        <th>Niños</th>
                        <th>Estado</th>
                        <th>Salida prevista</th>
                        <th>Huesped</th> 
                        <th>Observaciones</th>
                    </tr>
                        {camareria?.map(index =>{
                          let startDateOne = new Date(index.Fecha_final);
                          let monthOne = startDateOne.toLocaleString("default", { month: "long" });
                          let mesOne = startDateOne.getDate()
                          let yearOne = startDateOne.getFullYear()

                          if(index.Id_estado==1){
                            return (
                                <tr>
                                    <td className="width-informe" >{index.Habitacion}</td  >
                                    <td className="width-informe" >{index.Adultos}</td>
                                    <td className="width-informe" >{index.Ninos}</td>
                                    <td className="width-informe" >{index.Estado}</td>
                                    <td className="width-informe" >{mesOne}-{monthOne}</td>
                                    <td className="width-informe" >{index.Nombre}</td>
                                    <td className="width-informe" >{index.Nombre}</td>
                                </tr>  
                               )
                            }
                            if(index.Id_estado==2){
                                return (
                                    <tr>
                                        <td>{index.Habitacion}</td>
                                        <td> </td>
                                        <td></td>
                                        <td>{index.Estado}</td>
                                        <td></td>
                                    </tr>  
                                   )
                            }
                            if(index.Id_estado==3){
                                return (
                                    <tr>
                                        <td>{index.Habitacion}</td>
                                        <td> </td>
                                        <td></td>
                                        <td>{index.Estado}</td>
                                        <td></td>
                                    </tr>  
                                   )
                            }
                        })}
                </tbody> 
            </table>
        </ContainerGlobal>
    )
}


const Content = () => {
    return (
      <table border="1">
        <tr>
          <td style={{ padding: "5px" }}>ID</td>
          <td>Name</td>
          <td />
        </tr>
      </table>
    );
  };
  