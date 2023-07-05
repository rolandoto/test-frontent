import React, { useState } from "react"
import "./webchecking.css"
import { Button, Spacer } from "@nextui-org/react";
import { BsCheck2 } from "react-icons/bs";

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


const TitleWebChecking =() =>{
    return (<>
            <div className="title-web-checking" >
                    <span>Ingresa mas rapido! <span style={{fontWeight:"400",fontSize:"25px"}} >al hotel!</span> </span>
            </div>
            <div className="title-web-checking" >
                    <span><span style={{fontWeight:"400",fontSize:"25px"}} > simplificamos</span> tu check in!</span>
            </div>
        </>

    )
}

const FormInpuWebchecking =({changeCheckbox}) =>{
    return (  <>
                <div className="form-login title-web-checking container-form-web-checking" >
                    <label htmlFor="" className="title-label" >Ingresar tu codigo de reserva:</label>
                    <input type="text" className="username"  placeholder="XDE-4567890-0987" />
                </div>
                <Spacer x={0.1} y={0.5} />
               <Button  onClick={changeCheckbox}  
                        style={{width:"100%",height:"50px"}} 
                        auto color={"success"}
                          >
                    Siguiente
               </Button>
               <Spacer x={0.1} y={0.5} />
               <Button  
                        style={{width:"100%",height:"50px"}} 
                        auto color={"error"}
                          >
                    Atras
               </Button>
            </>
    )
}

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

const WebChecking =() =>{

    const [state,setSatate] = useState(stepperDetails)
    const [checkbox,setCheckBox] =useState(1)
    const [progressWidth, setProgressWidth] = useState(0);

    const changeSteep =(itemId) =>{
        const Steeper = state.findIndex((itemStepes) => itemStepes.count ==itemId)
        const newSteep = structuredClone(state)
        newSteep[Steeper].stocked =true
        setSatate(newSteep)
    }

    const calculateProgressWidth = () => {
        const completedSteps = progressWidth;
        const progressWidthBar = completedSteps ; // Multiplicamos por 10 para obtener un ancho del 10% por paso completado
        return progressWidthBar + "%";
    };

    const changeCheckbox =() =>{
         setCheckBox(checkbox + 1)
         changeSteep(checkbox)
         if(checkbox != 3){
            setProgressWidth((checkbox + checkbox) * 25)
         }
    }

    const progressBarWidth = calculateProgressWidth();

    return (
        <>
            <div className="container-webcheckin">
                <Steep 
                    state={state}
                    changeSteep={changeSteep}
                    progressBarWidth={progressBarWidth}/>

                <div className="container-webcheking" >
                <TitleWebChecking />

                <FormInpuWebchecking 
                    changeCheckbox={changeCheckbox}/>
               </div>
            </div>
        </>
    )
}

export default WebChecking