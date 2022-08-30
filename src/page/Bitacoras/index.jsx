import React from "react"
import TableBictacoras from "../../component/TableBictacoras";
import UserListBictacoras from "../../hooks/UserListBictacoras"
import UseTitle from "../../hooks/UseTitle";
import logo from '../../image/logo.jpeg'

const Bictacoras  =() =>{


  UseTitle({title:"Bictacoras"})

  const {bicta,isLoading} =UserListBictacoras()

  console.log(bicta)

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