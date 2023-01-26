import React, { useEffect, useState } from "react";
import { GrFormAdd,GrFormSubtract } from "react-icons/gr";
import DebitCard from "../DebitCard/DebitCard";
import { IoIosAddCircle } from "react-icons/io";
import { UsenearScrean } from "../../hooks/UseInsertionObserver";


const ItemCard =({index,handCart}) =>{

    const [show,element] = UsenearScrean()

    console.log(index)
    
    return ( 
        <> 
            <div className="itemCard" key={index.ID} ref={element} >
                {index. Cantidad !=0 ? (
                        <div className="item-content" >
                                    <div className="add-cart" >
                                        <div className="rest-to-cart" >
                                            {index.stock !=0 ? <IoIosAddCircle  fontSize={35} onClick={() =>handCart(index)}   /> : null}
                                        </div>
                                    </div>
                            <div className="icon-whatsapp" >
                                    <h3 class="itemName">{index.Nombre}</h3>
                            </div>

                            <div className="icon-cantidad" >
                                    <h4 class="price">{index.Cantidad}</h4>
                            </div>

                            {index.stock !=0   ? <span>disponible</span> : <span>no esta disponible</span>}
                                <div className="botton" >
                                    <div>
                                        <h3 class="price"><span>$ </span>{index.Precio}</h3>
                                    </div>
                                </div>
                                
                        </div>
                        )
                    :
                    null}
            </div>
    </>
    )
}

export default ItemCard