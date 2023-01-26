import React from "react"
import LoadingDetail from "../../Ui/LoadingDetail"
import AppONe from "../../AppOne"
import { useHistory, useParams } from "react-router-dom"


    
const ContractoOrganism =() =>{
    const history = useHistory()
    const {id} =useParams()
    
   
    
    if(id){
       return  null
    }

    


    return (
            <>
                 <div className="container-flex-init-global" >
                    <LoadingDetail  loading={true}
                                    titleLoading={"Bienvenido a chek IN 2"}  />

                        <div  className="container-flex-init-global init-checkingn2" >
                            <div>
                                <ul className="flex-button-contract" >
                                    <li>
                                        <AppONe  />
                                    </li>
                                    
                                    <li>
                                        <div className="Button-Contrato" >
                                            <button className="button-checking-detail-finis text-contracto"  >
                                                <span className="title-button"   ><a href="https://47medellinstreethotel.com/contratodehospedaje.pdf"  target="_blank" className="icon-taxi">Formato contrato </a></span>
                                            </button>
                                        </div>
                                    </li>
                                
                                </ul>
                            </div>

                             
                            </div>
                        </div>
            </>
    )
}
export default ContractoOrganism