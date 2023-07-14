import React, { useEffect, useState } from "react"
import "./webchecking.css"
import { Button, Spacer } from "@nextui-org/react";
import { BsCheck2 ,BsChevronRight} from "react-icons/bs";
import UseReservation from "../../hooks/useReservation";
import UseDocument from "../../hooks/useDococument";
import UseHabitacion from "../../hooks/useHabitacion";
import HttpClient from "../../HttpClient";
import Swal from "sweetalert2";
import { PiCameraThin,PiCameraRotateThin } from "react-icons/pi";

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


  const TitleWebCheckingInformacion =({username ="grupo hoteles"}) =>{
    return (<>
            <div className="title-web-end" >
                <div className="conatiner-code-reservation" >
                    <ul>
                        <li style={{height:"8px"}} >  <span>Reserva:</span></li>
                    <li> <span>{username}</span></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

const TitleWebCheckingtitle =({username ="Grupo hotele"}) =>{
    return (<>
            <div className="title-web-checking top-webschecking  "  >
                    <span className="font-size-webchecking"  > Hola! {username}, buenos dias!</span>
                    <p className="heigh-webchecking" >Te esperamos desde 06 julio 2022 al 28 julio 2022, se proyecta  el clima </p>
                    <p className="heigh-webchecking" >de la ciudad esta en 30 Grados  te esperamos</p>
            </div>
        </>

    )
}

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

const FormInpuWebchecking =({onReservation}) =>{

    const [text, setText] = useState('') 

    return (  <>
                <div className="form-login title-web-checking container-form-web-checking" >
                    <label htmlFor="" className="title-label" >Ingresar tu codigo de reserva:</label>
                    <input  type="text"
                            value={text}
                            onChange={(e)  => setText(e.target.value)} 
                            className="username"  
                            placeholder="XDE-4567890-0987" />
                </div>
                <Spacer x={0.1} y={0.5} />
               <Button  
               onClick={() =>{
                    setText("")
                    onReservation(text)
                    }}  
                style={{width:"100%",height:"50px"}} 
                auto color={"success"}>
                    <BsChevronRight  className="text-center-icon"   fontSize={25} color="white"  />
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
    const [reservation] = UseReservation()
    const [information,setInformation] =useState()
    const [documento] =UseDocument({itemId:information?.ID_document})  
    const [findHotel] = UseHabitacion({itemId:information?.ID_hotel,group:information?.ID_tipo_habitaciones})
    const [imagePath, setImagePath] = useState();
    const [imageOne,setImageOne] =useState()

    console.log(documento)

    const handNex =() =>{
        setCheckBox(checkbox + 1)
        changeSteep(checkbox)
        if(checkbox != 3){
            setProgressWidth((checkbox + checkbox) * 25)
        }
    }

    const handleFile = async () => {
        HttpClient.UploadImage({file1:imagePath,file2:imageOne,ID:information?.id}).then(index =>{
            handNex()
        }).catch(e =>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '<p>Error Guardar imagenes </p>',
                showConfirmButton: false,
                timer: 1000
              })
        })
    };
   
    const handleSearchReservation =(itemReservation) =>{
        const ReservationIndex = reservation.findIndex(itemReserva => itemReserva.Codigo_Reserva ==itemReservation)
        if(ReservationIndex >= 0){
            const  newReser = structuredClone(reservation)
            const someVariable = newReser[ReservationIndex]
            setInformation(someVariable)
            handNex()
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '<p>Error</p>',
                showConfirmButton: false,
                timer: 1000
              })
        }
    }
 
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

    const calculateProgressWidth = () => {
        const completedSteps = progressWidth;
        const progressWidthBar = completedSteps ; // Multiplicamos por 10 para obtener un ancho del 10% por paso completado
        return progressWidthBar + "%";
    };

    const handBack =() => {
        setCheckBox(checkbox - 1)
        changeBack(1)
        if(checkbox != 3){
            setProgressWidth((checkbox - checkbox))
        }
    }

    const progressBarWidth = calculateProgressWidth();

    if(checkbox ==1) {
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
                        onReservation={handleSearchReservation}
                    />
                   </div>
                </div>
            </>
        )
    }
    if(checkbox ==2){
        return (<>
        <div className="container-webcheckin">
             <Steep 
                state={state}
                changeSteep={changeSteep}
                progressBarWidth={progressBarWidth}/>

                <TitleWebCheckingInformacion
                username={information.Codigo_Reserva}  />

                <TitleWebCheckingtitle  username={information.name} />
                <div className="title-web-checking  " >
                    <div>
                        <ul className="row-flex-webchecking" >
                            <li className="li-webchecking negrita-webchecking " > <span  className="font-size-span" >Nombre:</span></li>
                            <li className="li-webchecking negrita-webchecking " > <span className="font-size-span" >Apellido:</span></li>
                            <li className="li-webchecking negrita-webchecking " > <span className="font-size-span" >Nacionalidad:</span></li>
                        </ul>     
                    </div>
                    <div className=""   >
                        <ul className="row-flex-webchecking" >
                            <li className="li-webchecking  " > <span className="font-size-span" > {information.name}</span></li>
                            <li className="li-webchecking" >  <span className="font-size-span" >{information.last_name}</span></li>
                            <li className="li-webchecking" >  <span className="font-size-span" > {information.nacionalidad} </span> </li>
                        </ul>   
                    </div>
                    <div>
                        <ul className="row-flex-webchecking" >
                            <li className="li-webchecking negrita-webchecking " > <span className="font-size-span" >telefono:</span></li>
                            <li className="li-webchecking negrita-webchecking " > <span className="font-size-span" >Tipo documento:</span></li>
                            <li className="li-webchecking negrita-webchecking " > <span className="font-size-span" >Tipo habitacion:</span></li>
                        </ul>     
                    </div>
                    <div className="row-flex-webchecking"   >
                        <li className="li-webchecking" > <span className="font-size-span" >  {information.Celular}</span></li>
                        <li className="li-webchecking" > <span className="font-size-span" > {documento.nombre}</span></li>
                        <li className="li-webchecking" > <span className="font-size-span" > {findHotel?.nombre}</span></li>
                       
                    </div>

                    
                </div>
                <div className="container-form-web-checking-one" >
                    <div className="form-login title-web-checking container-form-web-checkingOne"  >
                        <label htmlFor="" className="title-label" >Sube tu documento: {documento.nombre} </label>
                        <PiCameraThin color="black"  />
                        <PiCameraRotateThin color="black"  />
                        <input type="file"
                                onChange={(e) =>setImagePath(e.target.files[0])}
                                className="username" 
                                accept="image"
                                placeholder="XDE-4567890-0987" />
                        <input  type="file"
                                onChange={(e) => setImageOne(e.target.files[0])}
                                className="username"  
                                accept="image"
                                placeholder="XDE-4567890-0987" />
                    </div>
                </div>

            <Spacer x={0.1} y={0.5} />
                <Button  
                    onClick={handleFile}
                    style={{width:"100%",height:"50px"}} 
                    auto color={"success"}
                        >
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
        </div>
            </>
        )
    }


    if(checkbox ==3) {

        return (
            <>
                <div className="container-webcheckin">
                <Steep 
                state={state}
                changeSteep={changeSteep}
                progressBarWidth={progressBarWidth}/>
                <Button  
                    onClick={handNex}
                    style={{width:"100%",height:"50px"}} 
                    auto color={"success"}
                        >
                              <BsChevronRight  className="text-center-icon"   fontSize={25} color="white"  />
                        </Button>

                </div>

            </>
        )
    }else{
        return(
            <>
             <div className="container-webcheckin">
             <Steep 
                state={state}
                changeSteep={changeSteep}
                progressBarWidth={progressBarWidth}/>
                <div className="title-web-checking" >
                    <span>web check in realizado! <span style={{fontWeight:"400",fontSize:"25px"}} ></span> </span>
            </div>
             </div>
            </>
        )
    }
}

export default WebChecking