import React, { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import AutoProvider  from "../../privateRoute/AutoProvider"
import UseDianActions from "../../action/useDianActions"
import DiscordLoader from "../LoadingDian"

const CardSigo =({name,ID_DIAN})  =>{

    const {Dian} = useContext(AutoProvider)
    const {GetTProductsDian} =UseDianActions()
  
    const {ErrorProducts,LoadingProducts,products} = useSelector((state) => state.Dian)

    const fetchDate =async() =>{
        await  GetTProductsDian({token:Dian.access_token})
    }

    useEffect(() =>{
        fetchDate()
      },[])


    const ProductName =  products.find((item) => item.id == ID_DIAN )

  

    const FillContent =()=>{
        if(LoadingProducts){
         return  (
            <div  className=" lg:flex    mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
            <DiscordLoader />
            </div> 
         ) 
        }if(ErrorProducts){
          return <h1>error</h1>
        }




        return (
            <div class="bg-white p-4  mt-2 rounded-lg shadow-md">
                <div class="flex items-center">
                 
                    <img src="https://cms.siigo.com/wp-content/uploads/2023/08/logo_slogan.png" alt="John Doe" class="w-12 h-12 rounded-full"/>
                    <div class="ml-4">
                        <h4 class="text-lg font-semibold">{name}</h4>
                    </div>
                   
                </div>
                {ProductName?.taxes?.length > 0 ? (
                        ProductName.taxes.map((item) => (
                            <p key={item.id || 'no-tax'}>{item.id ? item.name : 'No Aplica IVA'}</p>
                        ))
                    ) : (
                        <p>No hay impuestos aplicables</p>
                    )}
                            </div>
                    )
      }
    
      



    return (<>
    
            {FillContent()}
            </>)

}

export default CardSigo