import { Button, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { PiSignatureLight } from "react-icons/pi";
import { useParams,useHistory } from "react-router-dom";
import  AutoProvider  from "../../privateRoute/AutoProvider";

export const updateLocalStorage =(state) =>{
    window.localStorage.setItem("contracto",JSON.stringify(state))
}

const Checkingn4 =() =>{

    const {id} = useParams()
    const {jwt} =useContext(AutoProvider)
    const history =  useHistory()


    const handNext =() =>{
        history.push(`/uploadImgeChecking/${id}`)
        updateLocalStorage(parseInt(id))
    }

     const handNextFirmadegital =() =>{
        history.push(`/firmadigital/${id}`)
        updateLocalStorage(parseInt(id))
    }

    const handNextSignature =() =>{
        history.push(`/signatureByID/${id}`)
        updateLocalStorage(parseInt(id))
    }



    const fillConten =() =>{
        if(jwt.result.id_hotel ==12 || jwt.result.id_hotel ==6 || jwt.result.id_hotel ==5 ){
            return <Button     
                        onClick={handNextSignature}     
                        style={{width:"100%"}}
                        color={"primary"}  
					    icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>Firmar manual</span></Button>
        }else if(jwt.result.id_hotel ==3 || jwt.result.id_hotel ==4 || jwt.result.id_hotel ==2 || jwt.result.id_hotel ==10 || jwt.result.id_hotel ==13   || jwt.result.id_hotel ==7 ){
            return <Button     
                        onClick={handNext}     
                        style={{width:"100%"}}
                        color={"success"}  
                        icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>Firmar tableta</span>
                    </Button>
        }else if(jwt.result.id_hotel ==23){
            return 	<Button     
                        onClick={handNextFirmadegital}
                        style={{width:"100%"}}  
                        color={"error"}
                        icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>Firmar digital</span></Button>
        }
        

       
    }

    
    
    
    return  (
        <main className="container-webcking" >
            <div className="flex-button-webchekcing4" >
			{fillConten()}
            </div>
        </main>
    )
}

export default Checkingn4