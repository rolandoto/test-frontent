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
import ButtonBack from "../../component/ButtonBack";
import ButtonHome from "../../component/ButtonHome";
import { CiEdit } from "react-icons/ci";

const ItemCardPago =({index,setloading,className}) => { 

    const  typy_buy =  [
        {   
          id:null,
          name:"",
      },
        {   
            id:1,
            name:"GLADYS ELENA JARRAMILLO",
        },
        {
            id:2,
            name:"JOHANA USUGA CASTAÑEDA",
        },
        {   
            id:3,
            name:"DIANA MARCELA CASTRO GARCIA",
        },
        {   
            id:4,
            name:"MONICA MARIA RESTREPO PATIÑO",
        },
        {   
            id:5,
            name:"DANIELA GARCIA SIERRA",
        },
        {   
            id:6,
            name:"YESENAI LOPEZ CARVAJAL",
        }
      ]

    const [isEditing, setIsEditing] = useState(false)
  
    let taskContent
  
   
  
    if(isEditing){
        taskContent  =(
          <td className={className}> 
              <select  className={className} >
                {typy_buy.map(itemTybuy => (
                  
                  <option value={itemTybuy.id} >{itemTybuy.name}</option>
                ))}
            </select>
          </td>
        )
      }else{
        taskContent =(
                              
              <td className={className}  ><CiEdit fontSize={30} color="white" onClick={() => setIsEditing(true) }  /> 
            </td>
       
        )
      }
  
    return (
        <>
          {taskContent}
        </>
      )
    
  }

const InformeCamareria =() =>{
    const {jwt} =useContext(AutoProvider)
    const history =useHistory()

    const [selectedValue, setSelectedValue] = useState('dsadsa');

  // Función para manejar cambios en el select
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

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

      const initialValue = 0;
       
        const countNino = camareria?.reduce((accumulator, currentValue) => {
            if (currentValue.ID_Tipo_Estados_Habitaciones === 3) {
                return accumulator + currentValue.Ninos;
            }
            return accumulator;  // Asegúrate de devolver el acumulador en todos los casos
        }, initialValue);

        const countAdultos = camareria?.reduce((accumulator, currentValue) => {
            if (currentValue.ID_Tipo_Estados_Habitaciones === 3) {
                return accumulator + currentValue.Adultos;
            }
            return accumulator;  // Asegúrate de devolver el acumulador en todos los casos
        }, initialValue);
     
    return (
        <ContainerGlobal>
               <LoadingDetail  
                        loading={true}
                        titleLoading={"Informe  Camareria"}  />

            <ButtonBack/>
            <ButtonHome/>

            <div>
                
                <button className="button-informe-camareria-cosultar" onClick={hanLookingFor} >Consultar</button>
                <br />
                <br />
                {camareria?.length>0 &&<button className="button-informe-camareria-cosultarBlck" onClick={printDoc}>
                    Imprimir
                </button>}
            </div>
            {camareria?.length>0 &&
            <table  ref={componentRef} >
                <tbody>
                    <tr>    
                        <th>Habitacion</th>
                        <th>Adultos</th>
                        <th>Niños</th>
                        <th>Estado</th>
                        <th>Salida prevista</th>
                        <th>Huesped</th> 
                        <th>camareras</th> 
                    </tr>
                    {camareria?.map((index) =>{

                        const validOcupied =index.ID_Tipo_Estados_Habitaciones

                        const fechaEnd =moment(index.Fecha_final).utc().format('YYYY/MM/DD')
                        console.log(index)
                   
                        if(validOcupied ==3){
                            return (
                                <tr  >
                                    <td className="ocupieds span-parrafo" >{index.Numero}</td>
                                    <td  className="ocupieds span-parrafo"  >{index.Adultos}</td>
                                    <td  className="ocupieds span-parrafo" >{index.Ninos}</td>
                                    <td  className="ocupieds span-parrafo" >{index.Estado_Habitacio}</td>
                                    <td  className="ocupieds span-parrafo" >{fechaEnd}</td>
                                    <td  className="ocupieds span-parrafo" >{index.nombre}</td>
                                    <ItemCardPago  className={"ocupieds span-parrafo"} />
                                </tr>
                            )
                        }else if(validOcupied ==0){
                            return (
                                <tr  >
                                    <td className="span-parrafo" >{index.Numero}</td>
                                    <td  className=" span-parrafo"  > </td>
                                    <td  className=" span-parrafo" ></td>
                                    <td  className=" span-parrafo" >{index.Estado_Habitacio}</td>
                                </tr>
                            )
                        }
                        else if(validOcupied ==5){
                            return (
                                <tr  >
                                    <td className="aseo-camarera span-parrafo" >{index.Numero}</td>
                                    <td  className="aseo-camarera span-parrafo"  > </td>
                                    <td  className="aseo-camarera span-parrafo" ></td>
                                    <td  className="aseo-camarera span-parrafo" >{index.Estado_Habitacio}</td>
                                    <td  className="aseo-camarera span-parrafo" ></td>
                                    <td  className="aseo-camarera span-parrafo" ></td>
                                    <ItemCardPago  className={"aseo-camarera span-parrafo"} />
                                   
                                </tr>
                            )
                        }else if(validOcupied ==2){
                            return (
                                <tr  >
                                    <td className="block-room span-parrafo" >{index.Numero}</td>
                                    <td  className="block-room span-parrafo"  > </td>
                                    <td  className="block-room span-parrafo" ></td>
                                    <td  className="block-room span-parrafo" >{index.Estado_Habitacio}</td>
                                    <td  className="block-room span-parrafo" ></td>
                                    <td  className="block-room span-parrafo" ></td>
                                    <ItemCardPago  className={"block-room span-parrafo"} />
                                </tr>
                            )
                        }
                       
                    })}
                <td>Total Adultos :{countAdultos}  </td>   
                <td>Total Niño : {countNino} </td>    
                <td>Total total : {countAdultos +countNino} </td>    
                     
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


