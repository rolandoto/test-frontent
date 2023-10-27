import React, { useContext, useState } from "react";
import  AutoProvider  from "../privateRoute/AutoProvider";

const UseFilterAuditoria  =() =>{

   const {category,setCategory}  = useContext(AutoProvider)

    const filterAuditoriaRoom =(audit) =>{
      
        if(audit){
            return audit.filter(item  => {
              return (
                    category.Forma_pago ==0 || 
                    category.Forma_pago ==item.Forma_pago
                )
                 
            })
        }
    }

    return {filterAuditoriaRoom,setCategory}

}

export default UseFilterAuditoria