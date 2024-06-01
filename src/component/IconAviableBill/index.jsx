import React, { useContext, useEffect } from "react";
import { CiWallet } from "react-icons/ci";
import { StyleTitleGroup } from "../../stylecomponent/StyleMenu";
import UseDianActions from "../../action/useDianActions";
import { LoaderIcon } from "react-hot-toast";
import AutoProvider from "../../privateRoute/AutoProvider";
import { useSelector } from "react-redux";

const IconAviableBill =() =>{

    const {jwt,Dian} =useContext(AutoProvider)
    const {GetTProductsDian} =  UseDianActions()
    const {products,loading,error} = useSelector((state) => state.Dian)

    const fetchData =async() =>{
        await  GetTProductsDian({token:Dian.access_token}) 
    } 

    useEffect(()=>{
        fetchData()
    },[jwt])

    const filteredItems = products?.some(item =>{
        return  item.id ==jwt?.result?.dian
    });

      const FillContentBill = filteredItems ? (
        <div className="flex items-center p-2 bg-gradient-to-r to-sky-500 from-blue-700 border text-white rounded-md">
          <div className="flex items-center justify-center h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <StyleTitleGroup className="font-semibold">Facturación electrónica</StyleTitleGroup>
        </div>
      ) : (
        <div className="flex items-center p-2 bg-gradient-to-r to-sky-500 from-blue-700 border text-white rounded-md">
          <div className="flex items-center justify-center h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
          <StyleTitleGroup className="font-semibold">Facturación electrónica</StyleTitleGroup>
        </div>
      );

    const FillContent =() =>{
        if(loading){
            return <LoaderIcon />
        }if(error){
            return <p>Ocurrio un error</p>
        }   
        return FillContentBill
    }
    
    return (
        <> {FillContent()}</>
    )
}

export default IconAviableBill