import { Button, Spacer } from "@nextui-org/react";
import React, { useEffect, useState } from "react"
import { PiCameraThin,PiCameraRotateThin } from "react-icons/pi";
import { BsCheck2 ,BsChevronRight} from "react-icons/bs";
import HttpClient from "../../HttpClient";
import Swal from "sweetalert2";
import { useParams,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";

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

const UploadImageCheckingTable =() =>{
    const {id} =useParams()
    const history = useHistory()
    const [state,setSatate] = useState(stepperDetails)
    const [checkbox,setCheckBox] =useState(1)
    const [imagePath, setImagePath] = useState("");
    const [imageOne,setImageOne] =useState("")
    const [progressWidth, setProgressWidth] = useState(0);
    const {getDetailReservationById} = useDetailDashboardAction()

    const {loading,error,DetailDashboard
    } = useSelector((state) => state.DetailDashboard)

    const fetchData =async() =>{
        await getDetailReservationById({id})
    }

    useEffect(() =>{
        fetchData()
    },[id])

    if(loading){
        return <p>...Cargando</p>
    }
    if(error){
        return <p>error</p>
    }
    
    const findIndexItem = DetailDashboard?.find((ItemDetail) => ItemDetail.ID_RESERVA ==  id)


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

    const handNex =() =>{
        setCheckBox(checkbox + 1)
        changeSteep(checkbox)
        if(checkbox != 3){
            setProgressWidth((checkbox + checkbox) * 50)
        }
    }

    const handleFile = async () => {
            HttpClient.UploadImage({file1:imagePath,file2:imageOne,ID:findIndexItem.ID_RESERVA}).then(index =>{
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
            handNex()
    };

    const progressBarWidth = calculateProgressWidth();

    const handClikcContracto =() =>{
        window.location.href =("/contracto")
    }

    if(!findIndexItem ) return null
   
    if(checkbox == 1){
        return  (
            <main className="container-webcking" >
                 <Steep
                    state={state}
                    changeSteep={changeSteep}
                    progressBarWidth={progressBarWidth}/>

                <div>
                    <div>

                        <div className="file-input-container">
                                <input
                                        type="file"
                                        id="fileInputone"
                                        onChange={(e) =>setImagePath(e.target.files[0])}
                                        className="file-input"
                                    />
                                    <label htmlFor="fileInputone" className="file-input-label-One">
                                        {imagePath ? "imagen selecionada": 'Foto frontal documento...'}
                                        <PiCameraThin color="black"   fontSize={25}  />
                                    </label>
                            </div> 

                            <div className="file-input-container">
                                    <input
                                        type="file"
                                        id="fileInput"
                                        onChange={(e) =>setImageOne(e.target.files[0])}
                                        className="file-input"
                                    />
                                    <label htmlFor="fileInput" className="file-input-label-One">
                                        {imageOne ? "imagen selecionada" : 'Foto posterior documento...'}
                                        <PiCameraRotateThin color="black"   fontSize={25}  />
                                    </label>   
                            </div>

                    </div>
                        <div className="row-web-checking" >
                            <img
                                src={`${findIndexItem?.Foto_documento_adelante ? findIndexItem?.Foto_documento_adelante : "https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true"  }`}
                                objectFit="initial"
                                alt="Default Image"
                                className="img-photo-one"

                            />
                                <img
                                 src={`${findIndexItem?.Foto_documento_atras ? findIndexItem?.Foto_documento_atras : "https://github.com/rolandoto/image-pms/blob/main/pdf_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201%20(1).png?raw=true"  }`}
                                objectFit="initial"
                                alt="Default Image"
                                className="img-photo-one"
                            />
                                </div>
                            <div>
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
            </main>
        )

    }else  if(checkbox ==2){
            return (
                    <main className="container-webcking" >
                    <Steep
                        state={state}
                        changeSteep={changeSteep}
                        progressBarWidth={progressBarWidth}/>
                          <div className="title-web-checking" >
                                <span>Firmar contracto! <span style={{fontWeight:"400",fontSize:"25px"}} ></span> </span>
                            </div>
                        <Spacer x={0.1} y={0.5} />
                        <Button
                                        onClick={handClikcContracto}
                                        style={{width:"100%",height:"50px"}} 
                                        auto color={"success"}
                                            >
                                <BsChevronRight  className="text-center-icon"   fontSize={25} color="white"  />
                                </Button>    
                    </main>
          
            )
    }
    
   
}
export default UploadImageCheckingTable