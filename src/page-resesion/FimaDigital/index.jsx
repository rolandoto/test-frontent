import React, { useEffect, useRef, useState } from "react"
import SignaturePad from "react-signature-canvas";
import "./index.css"
import { BsCheck2 ,BsChevronRight} from "react-icons/bs";
import { Button, Spacer } from "@nextui-org/react";
import HttpClient from "../../HttpClient";
import {useParams}  from "react-router-dom"

const stepperDetails = [
    {
      count: 1,
      title: "Take Truck to Loading",
      stocked:false
    },
    {
      count: 2,
      title: "Truck at Loading",
      stocked:false
    },
    {
      count: 3,
      title: "Take truck to unloading",
      stocked:false
    }
  ];

  const ItemSteep =({stocked,count,FilterStrepp}) =>{

    const valid =  FilterStrepp(stocked)
    if(valid) {
        return (
                <div  className={`circle  ${valid && "active"}`}><BsCheck2  className="text-center-icon"   fontSize={25} color="white"  /></div>
        )
    } return   <div    className={`circle`}>{count}</div>
}

  const Steep =({state,progressBarWidth}) =>{

    const FilterStrepp =(itemId) =>{
         return   state.some((itemSteep ) => itemSteep.count == itemId)
    }

    return (
        <header className="Header">
            <div>
                <div className="progress-container ">
                    <div className="progress" style={{width:progressBarWidth}} ></div>
                    {state.map((ItemStepp) => {
                    return  <ItemSteep key={ItemStepp.count} 
                            FilterStrepp={FilterStrepp}       
                            {...ItemStepp}  />
                    })}    
                </div>
            </div>
        </header>
    )
}


const FirmaDigital =()=> {
    
    const {id} = useParams()
    const sigCanvas = useRef({})
    const [state,setSatate] = useState(stepperDetails)
    const [progressWidth, setProgressWidth] = useState(0);
    const [checkbox,setCheckBox] =useState(1)
    const [isChecked, setIsChecked] = useState(false);
    const [isChecke, setIsChecke] = useState(false);
    const [imageURL, setImageURL] = useState(null);

    console.log(imageURL)

    const changeSteep =(itemId) =>{
        const Steeper = state.findIndex((itemStepes) => itemStepes.count ==itemId)
        const newSteep = structuredClone(state)
        newSteep[Steeper].stocked =true
        setSatate(newSteep)
    }

    const changeBack =(itemId) =>{
        const Steeper = state.findIndex((itemStepes) => itemStepes.count ==itemId)
        const newSteep = structuredClone(state)
        newSteep[Steeper].stocked =false
        setSatate(newSteep)
    }

    const handBack =() => {
        setCheckBox(checkbox - 1)
        changeBack(1)
        if(checkbox != 3){
            setProgressWidth((checkbox - checkbox))
        }
    }

    const handNext =() =>{
        setCheckBox(checkbox + 1)
        changeSteep(checkbox)
        if(checkbox != 3){
            setProgressWidth((checkbox + checkbox) * 25)
        }
    }

    const calculateProgressWidth = () => {
        const completedSteps = progressWidth;
        const progressWidthBar = completedSteps ; // Multiplicamos por 10 para obtener un ancho del 10% por paso completado
        return progressWidthBar + "%";
    };

    const progressBarWidth = calculateProgressWidth();

    function handleOnChange(event) {
        setIsChecked(!isChecked);
        setIsChecke(false);
      }

      function handleOnChanger(event) {
        setIsChecke(!isChecke);
        setIsChecked(false);
      }

    const handNextFirma =() =>{
        if(isChecked){
            handNext()
        }else{
            alert("Debe aceptar los terminos y condiciones")
        }
    }

    const handBacktwo =() => {
        setCheckBox(checkbox - 1)
        changeBack(2)
        setProgressWidth((checkbox-1) *25)
    }

    const clear = () => sigCanvas.current.clear();



    const handNextFirmaExit  =() =>{
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
    }

    const handClickImgageFirma =() =>{
            handNextFirmaExit()
    }

    const handleImageUpload = () => {
        if (imageURL != null) {
          HttpClient.UploadImageFirma({ ID: id, file1: imageURL })
            .then((index) => {
              handNext();
              setTimeout(() => {
                window.location.href = `/DetailDashboard/${id}`;
              }, 1000);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }

    
useEffect(() => {
  handleImageUpload();
}, [imageURL]);


    console.log((imageURL))

    if(checkbox ==1) 
    return  (
        <main className="container-webcking" >  
            <Steep 
                state={state}
                changeSteep={changeSteep}
                progressBarWidth={progressBarWidth}/>

            <p className="parrafo-firmadigital" >CONTRATO DE HOSPEDAJE. 1. Conforme a los artículos 79 y 81 de la Ley 300 de 1996, la Tarjeta de Registro Hotelero conforma el contrato de hospedaje celebrado entre el HOTEL y el HUÉSPED. El contrato es aceptado por la firma del HUÉSPED. El presente contrato es de adhesión, por tal motivo el HUÉSPED se adhiere a las estipulaciones aquí contenidas. 2. El HUÉSPED conoce y acepta el tipo de habitación, la tarifa cobrada por el servicio de hospedaje así como las fechas de ingreso y de salida consignadas en esta Tarjeta de Registro Hotelero. 3. La hora para efectuar el check in es a partir de las 15:00 horas y para efectuar el check out es hasta las 13:00 horas y que el ingreso temprano (early check in) o salida  tarde (late check out) podrá generar costos adicionales. La mora en el pago causara intereses de mora a la tasa máxima permitida, conforme al articulo 884 del código de comercio. 4. El HUÉSPED acepta que la suma liquida de dinero que conste en la factura presta merito ejecutivo. 5. El HUÉSPED conoce que la tarifa del hospedaje deberá ser prepagada y los consumos adicionales garantizados mediante tarjeta de crédito o depósito. En caso que la garantía sea tarjeta de crédito, el HUÉSPED autoriza el diligenciamiento del voucher y su presentación ante la respectiva entidad bancaria. 6. El HOTEL a su discrecionalidad se reserva el derecho de admitir el ingreso de huéspedes adicionales o acompañantes. Todo menor de edad debe hospedarse en compañía de los padres y portar sus respectivos documentos de identificación. 7. El HOTEL se reserva el derecho de ingreso de mascotas a sus instalaciones. El HOTEL es 100% libre de humo Su incumplimiento da lugar a la terminación del contrato y a la imposición de multas establecidas en el contrato. 8. El HUÉSPED puede ejercer derecho al retracto únicamente en compras no presenciales realizadas a través de portales web o en la central de reservas telefónica. La solicitud debe realizarla en máximo cinco (5) días hábiles posteriores a la confirmación de la compra. Si la fecha de ingreso es antes de los cinco días, no procederá el derecho al retracto y en caso de cancelación se aplicaran las condiciones de cancelación y devolución y que son: Si la cancelación de la reserva se realiza de 8 o mas días antes de la fecha de check in, se realizará una devolución del 80% correspondiente al valor depositado. - Si la cancelación de la reserva se realiza dentro de 8 a 3 días antes del check in se cobrara el 50% del valor depositado. - Si la cancelación de la reserva se realiza dentro de las 48 horas antes del check in se cobrara la totalidad del valor depositado. - En caso que estando alojado tenga una salida anticipada y se haya realizado el pago total del alojamiento, tendrá un saldo a favor que podrá utilizar en cualquier establecimiento operado por Grupo Hoteles en las ciudades de Medellín y Cartagena, que deberá redimirse en 1 año. Una vez recibida la solicitud, te reintegraremos el valor de devolución en un término máximo de 30 días calendarios contados a partir de tu solicitud. Lo realizaremos mediante consignación bancaria al titular de la reserva o mediante reversión de tarjeta de crédito. 9. El HUÉSPED autoriza irrevocablemente al HOTEL, sus titulares y operadores para recolectar, usar y tratar los datos personales suministrados por el HUÉSPED en la Tarjeta de Registro Hotelero con fines comerciales y de conformidad con las políticas de tratamiento de datos personales. El HUÉSPED autoriza la consulta y reporte ante centrales de riesgo de información sobre el cumplimiento de las obligaciones y/o pago de los servicios de hospedajes u hoteleros. El HUÉSPED, en su condición de titular de los datos personales, gozará de todos los derechos de ley y en particular tendrá derecho a conocer, acceder, actualizar y rectificar sus datos personales, revocar la autorización concedida o solicitar la supresión de información cuando ello sea procedente. El HUÉSPED declara que conoce las políticas de tratamiento de datos personales y que pueden ser consultadas en la página wwww.galleryhotel.co/politicasdatospersonales.pdf. 10. El HUÉSPED se adhiere a la totalidad de las estipulaciones contractuales del contrato de hospedaje y que obran en el sitio web wwww.galleryhotel.co/contratodehospedaje.pdf. El HUÉSPED declara que conoce la totalidad de las estipulaciones contractuales detalladas en la pagina web. El HOTEL, su titular y/o su operador pueden variar o modificar la versión de las condiciones del contrato de hospedaje en cualquier momento. Es obligación del HUÉSPED asegurarse de verificar las condiciones integras y actuales en el sitio web. </p>
            <Button 
                onClick={handNext}
                style={{width:"100%",height:"50px"}} 
                auto color={"success"}>
                    <BsChevronRight  className="text-center-icon"   fontSize={25} color="white"  />
               </Button>
        </main>
    )
    if(checkbox ==2){
        return (
            <main className="container-webcking" >  
            <Steep 
                state={state}
                changeSteep={changeSteep}
                progressBarWidth={progressBarWidth}/>
            
        <span className="text-words">Esta totalmente PROHIBIDO FUMAR en las instalaciones del hotel,multa $200.000 / 42 usd, Recuerda que la clave wifi es: familiagh;</span>
        
        <div className="container-flex-firma" >
            <div className="container-checkbox" >
                <input   type="checkbox" 
                            className={`checkbox-round  ${isChecked && "checkbox-round-click"} `}
                            onChange={handleOnChange}        
                            checked={isChecked}/> Estoy de acuerdo
            </div> 

            <div className="container-checkbox" >
                <input   type="checkbox" 
                            className={`checkbox-round  ${isChecke && "checkbox-round-click"} `}
                            onChange={handleOnChanger}        
                            checked={isChecke}/> No estoy de acuerdo
            </div> 
        </div>
        <Spacer x={0.1} y={0.5} />
            <Button 
                onClick={handNextFirma}
                style={{width:"100%",height:"50px"}} 
                auto color={"success"}>
                    <BsChevronRight  className="text-center-icon"   fontSize={25} color="white"  />
               </Button>

               <Spacer x={0.1} y={0.5} />
                <Button  
                onClick={handBack}   
                            style={{width:"100%",height:"50px"}} 
                            auto color={"error"}
                            >
                        Atras
                </Button>
            </main>
        )
    }

    if(checkbox ==3){
        return (
            <main className="container-webcking" >  
            <Steep 
                state={state}
                changeSteep={changeSteep}
                progressBarWidth={progressBarWidth}/>

            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas"
              }}
            />

        <Spacer x={0.5} y={0.5} />

        <div className="container-flex-firma" >
              
                <Button         
                        onClick={handBacktwo}   
                                    style={{width:"20%",height:"50px"}} 
                                    auto color={"error"}
                                    >
                                Atras
                        </Button>
                        <Spacer x={0.5} y={0.5} /> 
                        <Button 
                        onClick={clear}
                        style={{width:"20%",height:"50px"}} 
                        auto color={"primary"}>
                            Borrar
                    </Button>
                    <Spacer x={0.5} y={0.5} />
                    <Button 
                        onClick={handClickImgageFirma}
                        style={{width:"20%",height:"50px"}} 
                        auto color={"success"}>
                            Guardar firma y continuar
                    </Button>
        </div>       
        </main>
        )
    }else{
        return (   <main className="container-webcking" >

            <Steep 
                state={state}
                changeSteep={changeSteep}
                progressBarWidth={progressBarWidth}/>

            <div className="title-web-checking" >
                    <span>Realizo firma con exito <span style={{fontWeight:"400",fontSize:"25px"}} ></span> </span>
            </div>
        </main>
        )
    }
}

export default FirmaDigital