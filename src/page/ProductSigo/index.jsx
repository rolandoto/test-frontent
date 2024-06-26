import React, { useContext, useEffect } from "react"
import UseDianActions from "../../action/useDianActions"
import { useSelector } from "react-redux"
import DiscordLoader from "../../component/LoadingDian"
import CardProductSigo from "../../component/CardProductSigo"
import  AutoProvider  from "../../privateRoute/AutoProvider"

const ProductSigo =() =>{

  const {Dian} = useContext(AutoProvider)
  const {GetProductDashboard,GetTProductsDian} =UseDianActions()

  const {LoadingdashboardSigo,ErrordashboardSigo,dashboardSigo} = useSelector((state) => state.Dian)

  const fetchDate =async() =>{
   
    //await  GetPayment({token:Dian.access_token})
    //await GetTaxesDian({token:Dian.access_token})
    await GetProductDashboard()
  }


  const FillContent =()=>{
    if(LoadingdashboardSigo){
     return  (
              <div  className=" lg:flex    mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
              <DiscordLoader />
              </div> 
     ) 
    }if(ErrordashboardSigo){
      return <h1>error</h1>
    }

    return <CardProductSigo  dashboardSigo={dashboardSigo} />
  }

  useEffect(() =>{
    fetchDate()
  },[])

    return (<> 
       <div class="max-w-7xl mx-auto p-4 space-y-4">
       {FillContent()}
      </div>
      </>)
}

export default ProductSigo