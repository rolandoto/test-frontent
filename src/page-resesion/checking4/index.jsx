import { Button, Spacer } from "@nextui-org/react"
import React from "react"
import { PiSignatureLight } from "react-icons/pi";
import { useParams,useHistory } from "react-router-dom";

const Checkingn4 =() =>{

    const {id} = useParams()
    const history =  useHistory()


    const handNext =() =>{
        history.push(`/uploadImgeChecking/${id}`)
    }

     const handNextFirmadegital =() =>{
        history.push(`/firmadigital/${id}`)
    }

    const handNextSignature =() =>{
        history.push(`/signatureByID/${id}`)
    }
    
    return  (
        <main className="container-webcking" >
            <div className="flex-button-webchekcing4" >
            <Spacer x={0.5} y={1} />
			<Button     
                        onClick={handNextSignature}     
                        style={{width:"100%"}}
                        color={"primary"}  
					icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>Firmar manual</span></Button>
            <Spacer x={0.5} y={1} />
			<Button     
                        onClick={handNext}     
                        style={{width:"100%"}}
                        color={"success"}  
					icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>Firmar tableta</span></Button>
            <Spacer x={0.5} y={1} />
			<Button     
                    onClick={handNextFirmadegital}
                    style={{width:"100%"}}  
                    color={"error"}
					icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>Firmar digital</span></Button>
            </div>
        </main>
    )
}

export default Checkingn4