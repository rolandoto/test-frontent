import { Button } from "@nextui-org/react"
import moment from "moment"
import React from "react"


const CardTiketsRed =({Username,Lastname}) =>{

    return (<div className="cardWrap">
                <div className="card-one cardLeft">
                    <h1 className="title-tikects" >Tickets <span>Desayuno</span></h1>
                    <div className="title">
                    </div>
                    <div className="name">
                        <span>Nombre</span>
                        <h2 className="title-name" >{Username}</h2>
                    </div>
                    <div className="name">
                        <span>Apellido</span>
                        <h2 className="title-name" >{Lastname}</h2>
                    </div>
                    
                    </div>
                    <div className="card-one cardRight">
                        <div className="eyeone"></div>
                        <div className="numberone">
                        <h3>156</h3>
                        <span className="title-numer" >Numero</span>
                        </div>
                    </div>
            </div>)
   
}
export default CardTiketsRed