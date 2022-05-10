import React from "react"
import TableBictacoras from "../../component/TableBictacoras/TableBictacoras";
import UserListBictacoras from "../../hooks/UserListBictacoras"
import UseUsers from "../../hooks/UseUser";
import { Loading, Spacer } from "@nextui-org/react";
import logo from '../../image/logo.jpeg'

const Bictacoras  =() =>{

 

  const {bicta,isLoading} =UserListBictacoras()
        
        return (
            <div className="container-bicta" >  
              {isLoading ?
              <div>
                <div className='container-image'>
                    <div className='color'></div>
                      <img className='image-logo-bicta' src={logo} alt="logo" />
                    </div>
              </div>
                :
                <TableBictacoras bicta={bicta} />
              }
            </div>  
        )
}

export default Bictacoras