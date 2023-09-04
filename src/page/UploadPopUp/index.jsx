import { Button, Spacer } from "@nextui-org/react";
import React, { useState } from "react"
import { PiCameraThin,PiCameraRotateThin } from "react-icons/pi";
import { BsCheck2 ,BsChevronRight} from "react-icons/bs";
import Swal from "sweetalert2";
import HttpClient from "../../HttpClient";

const UploadPopUp = () =>{

    const [imagePath, setImagePath] = useState("");

    const handleFile = async () => {
        HttpClient.UploadImageOne({file1:imagePath}).then(index =>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '<p>Error Guardar imagenes </p>',
                showConfirmButton: false,
                timer: 1000
              })
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

    return  (
        <main className="container-webcking" >
            <div className="file-input-container">
                <input
                        type="file"
                        id="fileInputone"
                        onChange={(e) =>setImagePath(e.target.files[0])}
                        className="file-input"
                    />
                    <label htmlFor="fileInputone" className="file-input-label-two">
                        {imagePath ? "imagen selecionada": 'Imagen Notificacionß...'}
                        <PiCameraThin color="black"   fontSize={25}  />
                    </label>
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
}

export default UploadPopUp 