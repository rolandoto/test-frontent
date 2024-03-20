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
import { Checkbox, Text } from "@nextui-org/react";
import Uselocalstorage from "../../hooks/UselocalStorage";




    export const updateLocalStorage =(state) =>{
      window.localStorage.setItem("now",JSON.stringify(state))
    }
    

const CheckBoxValue =({checval}) =>{

    const key = `like${checval}`

    const [storage,setValue]  = Uselocalstorage(key,false)

    const [checkBox, setCheckBox] = useState(storage);

    const handChangeCheckBox = () => {
        if (!checkBox) {
            // Si checkBox no está seleccionado, se selecciona y checkBoxOne se deselecciona
            setCheckBox(true);
            setValue(true); // Actualizar valor en el almacenamiento local
        }
    };

    const handChangeCheckBoxOne = () => {
        if (checkBox) {
            // Si checkBoxOne no está seleccionado, se selecciona y checkBox se deselecciona
            setCheckBox(false);
            setValue(false); // Actualizar valor en el almacenamiento local
        }
    };

    const initialState = JSON.parse(window.localStorage.getItem("now")) || null
    const now = moment().format('YYYY/MM/DD');

    useEffect(() => {
        const formattedInitialState = moment(initialState, 'YYYY/MM/DD');
        const formattedNow = moment(now, 'YYYY/MM/DD');
      
        console.log(!formattedInitialState.isSame(formattedNow, 'day'))
        if (!formattedInitialState.isSame(formattedNow, 'day')) {
            if(storage == true){
                setValue(false); // Restaurar el valor del estado a false
                setCheckBox(false)
                updateLocalStorage(now); // Actualizar el almacenamiento local con la nueva fecha
            }
        }
    }, [now]);

    return (
        <>
         <td className=" span-parrafo">
            <Checkbox color="success"    labelColor="default"  defaultSelected onChange={handChangeCheckBox} checked={checkBox}> <span className="with-camarera"  >si</span>  </Checkbox> 
          
        </td>
            <td className=" span-parrafo">
            <Checkbox color="error"  labelColor="default"  defaultSelected onChange={handChangeCheckBoxOne} checked={!checkBox}  ><span className="with-camarera" >no</span> </Checkbox>  
            </td>
        </>
       
    )
}

const ItemCardPago =({className}) => { 

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
            name:"YESENIA LOPEZ CARVAJAL",
        },
        {   
            id:7,
            name:"ORFILIA MUNERA",
        },
        {   
            id:8,
            name:"SANDRA LUPE GIRALDO",
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
                              
              <td className={className}  ><CiEdit fontSize={20} color="black" onClick={() => setIsEditing(true) }  /> 
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

  

    const [camareria,setCamareria]=useState()
    const [LookinforFecha,setLokinforFecha] =useState()
   
    

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

        const filtrarHospedadas = () => {
            let resultadosBusquedaHospedadas = camareria?.filter((elemento, index) => {
                if(elemento.ID_Tipo_Estados_Habitaciones == 3){
                    const now = moment().format('YYYY/MM/DD'); // Fecha actual en formato local
                    const fechaInicio = moment(elemento.Fecha_final).format('YYYY/MM/DD'); // Fecha del elemento en formato local
                    return !moment(now).isSame(fechaInicio, 'day'); // Invierte la condición
                }
            });
        
            return { resultadosBusquedaHospedadas };
        };
        
        // Llamar a la función filtrarSearching para obtener los elementos de camareria para hoy
        const { resultadosBusquedaHospedadas } = filtrarHospedadas();

        const cantidadElementosHospedadas = resultadosBusquedaHospedadas?.length;


        const filtrarHospedadasCheckout = () => {
            let resultadosBusquedacheckout = camareria?.filter((elemento, index) => {
                if(elemento.ID_Tipo_Estados_Habitaciones == 3){
                    const now = moment().format('YYYY/MM/DD'); // Fecha actual en formato local
                    const fechaInicio = moment(elemento.Fecha_final).format('YYYY/MM/DD'); // Fecha del elemento en formato local
                    return moment(now).isSame(fechaInicio, 'day'); // Invierte la condición
                }
            });
        
            return { resultadosBusquedacheckout };
        };
        
        // Llamar a la función filtrarSearching para obtener los elementos de camareria para hoy
        const { resultadosBusquedacheckout } = filtrarHospedadasCheckout();

        const cantidadElementoscheckout = resultadosBusquedacheckout?.length;
     
    //const fechaFin = moment(elemento.start_time).utc().format('YYYY/MM/DD');

    const filtrarSearching = () => {
        let resultadosBusqueda = []; // Inicializar array para guardar los elementos con ID_Tipo_Estados_Habitaciones igual a 0 o 1
        let resultadosBusquedacheckout = []; // Inicializar array para guardar los elementos con ID_Tipo_Estados_Habitaciones igual a 3
    
        camareria?.forEach((elemento, index) => {
            // Filtrar por ID_Tipo_Estados_Habitaciones igual a 0 o 1
            if (elemento.ID_Tipo_Estados_Habitaciones === 5 || elemento.ID_Tipo_Estados_Habitaciones === 3) {
                resultadosBusqueda.push(elemento);
            }

        });
    
        return { resultadosBusqueda };
    };



    const {resultadosBusqueda} =  filtrarSearching()
    console.log(resultadosBusqueda)

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
            {camareria?.length>0 && <>                  
            
                  <td>Total Adultos :{countAdultos}  </td>   
                    <td>Total Niño : {countNino} </td>    
                    <td>Hospedadas : {cantidadElementosHospedadas}</td>
                    <td>Check out para hoy  : {cantidadElementoscheckout}</td>
            
            <table className="de table"   ref={componentRef} >
                   
                <tbody>
                       
                    <tr>    
                        <th className="with-camarera" >Habitacion</th>
                        <th className="with-camarera" >Adultos</th>
                        <th className="with-camarera" >Niños</th>
                        <th className="with-camarera" >Salida prevista</th>
                        <th className="with-camarera" >Huesped</th>
                        <th className="with-camarera" >Estado</th> 
                        <th className="with-camarera" >Camareras</th> 
                        <th className="with-camarera" >Opcion aseo</th> 
                    </tr>
                    {resultadosBusqueda?.map((index,e) =>{
                      
                        const validOcupied =index.ID_Tipo_Estados_Habitaciones

                        const fechaEnd =moment(index.Fecha_final).utc().format('YYYY/MM/DD')

                        const now = moment().format('YYYY/MM/DD'); // Fecha actual en formato local
                        const fechaInicio = moment(index.Fecha_final).format('YYYY/MM/DD'); // Fecha del elemento en formato local
                        const today =  moment(now).isSame(fechaInicio, 'day'); // Invierte la condición
                        
                        if(validOcupied ==3){
                            if(today){
                                return (
                                    <tr  key={e} >
                                        <td className="with-camarera" ><span> {index.Numero}</span> </td>
                                        <td  className="with-camarera"  >{index.Adultos}</td>
                                        <td className="with-camarera" >{index.Ninos}</td>
                                        <td  className="with-camarera checkout-today">salida hoy {fechaEnd}</td>
                                        <td className="with-camarera" ><span>{index.nombre}</span> </td>
                                        <td className=" ocupieds  with-camarera" >{index.Estado_Habitacio}</td>
                                        <ItemCardPago  className={"span-parrafo"} />
                                       < CheckBoxValue  checval={index.ID}  />
                                    </tr>
                                )
                            }else{
                                return (
                                    <tr  key={e} >
                                        <td className="with-camarera" ><span> {index.Numero}</span> </td>
                                        <td  className="with-camarera"  >{index.Adultos}</td>
                                        <td className="with-camarera" >{index.Ninos}</td>
                                        <td  className="with-camarera">{fechaEnd}</td>
                                        <td className="with-camarera" ><span>{index.nombre}</span> </td>
                                        <td className=" ocupieds  with-camarera" >{index.Estado_Habitacio}</td>
                                        <ItemCardPago  className={"span-parrafo"} />
                                       < CheckBoxValue  checval={index.ID}  />
                                    </tr>
                                )
                            }
                           
                        }else if(validOcupied ==0){
                            return (
                                <tr   key={e} >
                                    <td className="with-camarera">{index.Numero}</td>
                                    <td className="with-camarera"> </td>
                                    <td className="with-camarera"></td>
                                    <td className="with-camarera">{index.Estado_Habitacio}</td>
                                    
                                </tr>
                            )
                        }
                        else if(validOcupied ==5){
                            return (
                                <tr  key={e}  >
                                    <td className="with-camarera">{index.Numero}</td>
                                    <td className="with-camarera"> </td>
                                    <td className="with-camarera"></td>
                                    <td className="with-camarera"></td>
                                    <td className="with-camarera"></td>
                                    <td className="aseo-camarera span-parrafo with-camarera">{index.Estado_Habitacio}</td>
                                    <ItemCardPago  className={" span-parrafo"} />
                                    < CheckBoxValue  checval={index.ID}  />
                                  
                                   
                                </tr>
                            )
                        }else if(validOcupied ==2){
                            return (
                                <tr   key={e} >
                                    <td>{index.Numero}</td>
                                    <td> </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{index.Estado_Habitacio}</td>
                                    <ItemCardPago  className={"block-room span-parrafo"} />
                                </tr>
                            )
                        }
                    })}

                  

                </tbody>
            </table>
            </>

        }
        </ContainerGlobal>
    )
}

export default InformeCamareria
