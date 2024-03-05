import React from "react"
import LoadingDetail from "../../Ui/LoadingDetail"
import AppONe from "../../AppOne"
import { useHistory, useParams } from "react-router-dom"
import { CiFileOn } from "react-icons/ci";

    
const ContractoOrganism =() =>{
    const history = useHistory()
    const {id} =useParams()
        
    if(id){
       return  null
    }

    return (
            <>
                 <div>
                        <div  className="container-flex-init-global init-checkingn2" >
                            <div>
                                <ul className="flex-button-contract" >
                                    <li>
                                        <AppONe  />
                                    </li>
                                </ul>
                            </div>
                            </div>
                        </div>
            </>
    )
}
export default ContractoOrganism