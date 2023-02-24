import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import ServiceInformeCamareria from "../../service/ServiceInformeCamereria";
import ContainerGlobal from "../../Ui/ContainerGlobal";
import LoadingDetail from "../../Ui/LoadingDetail";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router-dom";


const InformeCamareria =() =>{
    const {jwt} =useContext(AutoProvider)
    const history =useHistory()

    const [camareria,setCamareria]=useState()
    const [LookinforFecha,setLokinforFecha] =useState()
    const [loadingInforme,setLoadingInforme] =useState(false)
    
    const handClikcDescargar =() =>{
        history.push("/reportecamarera")
    }

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }

    const hanLookingFor =() =>{
        ServiceInformeCamareria({id:jwt.result.id_hotel,fecha:LookinforFecha}).then(index =>{
            setCamareria(index.result)
        }).catch(e =>{
         
        })
    }

    let componentRef = useRef();


    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    

    function printDoc() {
        handlePrint()
      }

      
      console.log(camareria)
    return (
        <ContainerGlobal>
               <LoadingDetail  
                        loading={true}
                        titleLoading={"Informe  Camareria"}  />

            <div>
                <input type="date" className="input-selecto-dasboard-n1-reservaction"  onChange={hadChangeFecha}    />
                <button className="button-informe-cosultar" onClick={hanLookingFor} >Consultar</button>
                {camareria?.length>0 && <button className="button-informe-descargar"  onClick={handClikcDescargar} >Reporte camareras</button>}
                {camareria?.length>0 &&<button className="button-informe-imprimir"  ><a href="#" onClick={printDoc}>
                    Imprimir
                </a></button>}
            </div>
            {camareria?.length>0 &&
            <table className="de"  ref={componentRef} >
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

                          if(index.ID_Tipo_Estados_Habitaciones==0){
                            return (
                                
                                <tr >
                                    <td className="width-informe Reservada-camareria" >{index.Numero}</td  >
                                    <td className="width-informe Reservada-camareria " >{index.Adultos}</td>
                                    <td className="width-informe  Reservada-camareria" >{index.Ninos}</td>
                                    <td className="width-informe  Reservada-camareria" >Reservada</td>
                                    <td className="width-informe Reservada-camareria" >{mesOne}-{monthOne}</td>
                                    <td className="width-informe Reservada-camareria" >{index.nombre} {index.Apellido}</td>
                                    <td className="width-informe Reservada-camareria" ></td>
                                </tr>  
                               )
                            } if(index.ID_Tipo_Estados_Habitaciones==3){
                                return (
                                    <tr>
                                        <td className="width-informe Ocupada-camareria" >{index.Numero}</td  >
                                        <td className="width-informe Ocupada-camareria" >{index.Adultos}</td>
                                        <td className="width-informe Ocupada-camareria" >{index.Ninos}</td>
                                        <td className="width-informe Ocupada-camareria" >Ocupada</td>
                                        <td className="width-informe Ocupada-camareria" >{mesOne}-{monthOne}</td>
                                        <td className="width-informe Ocupada-camareria" >{index.nombre} {index.Apellido}</td>
                                        <td className="width-informe Ocupada-camareria" ></td>
                                    </tr>  
                                   )
                                }

                                if(index.ID_Tipo_Estados_Habitaciones==1){
                                    return (
                                        <tr>
                                            <td className="width-informe Aseo-camareria " >{index.Numero}</td  >
                                            <td className="width-informe Aseo-camareria  " >{index.Adultos}</td>
                                            <td className="width-informe Aseo-camareria  " >{index.Ninos}</td>
                                            <td className="width-informe Aseo-camareria  " >Aseo</td>
                                            <td className="width-informe Aseo-camareria " >{mesOne}-{monthOne}</td>
                                            <td className="width-informe Aseo-camareria " >{index.nombre} {index.Apellido}</td>
                                            <td className="width-informe Aseo-camareria " > </td>
                                        </tr>  
                                       )
                                    }
                            else{
                                return  (
                                    <tr>
                                        <td className="width-informe" >{index.Numero}</td  >
                                        <td className="width-informe" >0</td>
                                        <td className="width-informe" >0</td>
                                        <td className="width-informe" >Disponible</td>
                                        <td className="width-informe" > </td>
                                        <td className="width-informe" ></td>
                                        <td className="width-informe" ></td>
                                    </tr>  
                                   )
                            }
                          
                           
                        })}
                     
                </tbody>

                
            </table>
        }
        
        </ContainerGlobal>
    )
}

export default InformeCamareria

const DescargarInforme =({camareria,setLoadingInforme,jwt}) =>{
    
    let docToPrint = React.createRef();

    const printDocument = () => {
        const input = docToPrint.current;
        html2canvas(input,{scale:0.8}).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "landscape",
            format:  [900,800  ]
        });
        pdf.addImage(imgData, "JPEG", 0, 0);
        // pdf.output("dataurlnewwindow");
        pdf.save("ReporteCamarera.pdf");
        });
    };
    
    
    const  now = moment().format("YYYY/MM/DD");

    useEffect(() =>{
        printDocument()
    },[])

    const ra =  [
        { Room: 'Doble Superior', disponible: 0 },
        { Room: 'Familiar', disponible: 0 },
        { Room: 'Twin Doble', disponible: 1 },
        { Room: 'Triple', disponible: 1 },
        { Room: 'Urban Doble', disponible: 2 },
        { Room: 'Grupal', disponible: 1 }
      ]
  

    return (

        <>
        <div  className="container-pdf-flex top-pdf"  >    

        <div   ref={docToPrint}>

        <div className="container-title-camareras">
            <h3>Reporte camareria</h3>
            <h3>HOTEL FLORENCIA PLAZA</h3>
        </div>
        
        <div>
            <span>Fecha inpresion: <span className="negrita" >{now}</span> </span>
        </div>
        <div>
            <span>Usuario:<span className="negrita" > {jwt.result.name}</span> </span>
        </div>
        

        <div  >


        <table className="border-flex"  >
                <tbody className="border-flex" >
                <tr  className="border-flex" >    
                        <td>Habitacion</td>
                        <td>Adultos</td>
                        <td>Niños</td>
                        <td>Estado</td>
                        <td>Salida prevista</td>
                        <td>Huesped</td> 
                        <td>No. toallas</td>
                        <td>No. Nombre camarera</td>
                        <td>Retoque final</td>
                        <td>Observaciones</td>
                    </tr>
                        {camareria?.map(index =>{
                          let startDateOne = new Date(index.Fecha_final);
                          let monthOne = startDateOne.toLocaleString("default", { month: "long" });
                          let mesOne = startDateOne.getDate()
                          let yearOne = startDateOne.getFullYear()

                          if(index.ID_Tipo_Estados_Habitaciones==0){
                            return (
                                
                                <tr >
                                    <td className="width-informe " >{index.Numero}</td  >
                                    <td className="width-informe  " >{index.Adultos}</td>
                                    <td className="width-informe  " >{index.Ninos}</td>
                                    <td className="width-informe  " >Reservada</td>
                                    <td className="width-informe " >{mesOne}-{monthOne}</td>
                                    <td className="width-informe " >{index.nombre} {index.Apellido}</td>
                                    <td className="width-informe " ></td>
                                </tr>  
                               )
                            } if(index.ID_Tipo_Estados_Habitaciones==3){
                                return (
                                    <tr>
                                        <td className="width-informe " >{index.Numero}</td  >
                                        <td className="width-informe " >{index.Adultos}</td>
                                        <td className="width-informe " >{index.Ninos}</td>
                                        <td className="width-informe " >Ocupada</td>
                                        <td className="width-informe " >{mesOne}-{monthOne}</td>
                                        <td className="width-informe " >{index.nombre} {index.Apellido}</td>
                                        <td className="width-informe " > <div className="box" ></div> </td>
                                        <td className="width-informe " > <div className="box" ></div> </td>
                                        <td className="width-informe " > <div className="box" ></div> </td>
                                    </tr>  
                                   )
                                }

                                if(index.ID_Tipo_Estados_Habitaciones==1){
                                    return (
                                        <tr>
                                            <td className="width-informe  " >{index.Numero}</td  >
                                            <td className="width-informe   " >{index.Adultos}</td>
                                            <td className="width-informe   " >{index.Ninos}</td>
                                            <td className="width-informe   " >Aseo</td>
                                            <td className="width-informe  " >{mesOne}-{monthOne}</td>
                                            <td className="width-informe  " >{index.nombre} {index.Apellido}</td>
                                            <td className="width-informe  " > </td>
                                        </tr>  
                                       )
                                    }
                            else{
                                return  (
                                    <tr>
                                        <td className="width-informe" >{index.Numero}</td  >
                                        <td className="width-informe" >0</td>
                                        <td className="width-informe" >0</td>
                                        <td className="width-informe" >Disponible</td>
                                        <td className="width-informe" > </td>
                                        <td className="width-informe" ></td>
                                        <td className="width-informe" ></td>
                                    </tr>  
                                   )
                            }
                          
                           
                        })}
                     
                </tbody>

                
            </table>
           
       
            </div>
            </div>  
        </div>
        </>
    )
}


