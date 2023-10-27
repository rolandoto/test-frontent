import React, { useState } from  "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import { Button, Checkbox, Spacer, Text } from "@nextui-org/react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { LiaHotelSolid } from "react-icons/lia";
import { HeartIcon } from "./IconReservation";
import { useSelector } from "react-redux";

const HomeTypehospedaje = () => {
    const history = useHistory()

  
    const handleCheckboxChange = (type) => {
      if (type === 'ocacional') {
        history.push("/Ocacionales")
      } else if (type === 'hospedaje') {
        history.push("/SearchbyID")
      } 
    };

    return (
        <main className="container-webcking" >
            <div className="flex-button-webchekcing4" >
                <Spacer x={0.5} y={1} />
                <Button    
                             onClick={() => handleCheckboxChange('ocacional')}
                            style={{width:"100%"}}
                            color={"primary"}  

                            icon={<HeartIcon fill="currentColor" filled   />}
                        > <span>Ocasionales</span></Button>
                <Spacer x={0.5} y={1} />
                <Button     
                        onClick={() => handleCheckboxChange('hospedaje')}
                            style={{width:"100%"}}
                            color={"success"}  
                            icon={<LiaHotelSolid  color="white" fontSize={35}  />} 
                         > <span>Hospedaje</span></Button>
                <Spacer x={0.5} y={1} />
            </div>
        </main>
    );
  };
  
  export default HomeTypehospedaje;