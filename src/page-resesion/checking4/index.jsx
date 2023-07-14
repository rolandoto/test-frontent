import { Button, Spacer } from "@nextui-org/react"
import React from "react"
import { PiSignatureLight } from "react-icons/pi";

const Checkingn4 =() =>{

    const handNext =() =>{
        window.location.href =(`/contracto`)
     }

    return  (
        <main className="container-webcking 4" >
            <div className="flex-button-webchekcing4" >
            <Spacer x={0.5} y={1} />
			<Button     
                        onClick={handNext}     
                        style={{width:"100%"}}
                        color={"success"}  
					icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>firmar tableta</span></Button>
            <Spacer x={0.5} y={1} />
			<Button  
                    style={{width:"100%"}}  
                    color={"error"}
					icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>firmar digital</span></Button>
            </div>
        </main>
    )
}

export default Checkingn4