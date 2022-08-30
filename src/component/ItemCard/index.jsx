import React, { useEffect, useState } from "react";
import { GrFormAdd,GrFormSubtract } from "react-icons/gr";
import DebitCard from "../DebitCard/DebitCard";
import { IoIosAddCircle } from "react-icons/io";
import { UsenearScrean } from "../../hooks/UseInsertionObserver";


const ItemCard =({index,handCart}) =>{

    const [show,element] = UsenearScrean()
    
    return ( 
        <> 
            <div className="itemCard" key={index.id} ref={element} >
                {show  ? (
                        <div className="item-content" >
                                    <div className="add-cart" >
                                        <div className="rest-to-cart" >
                                            {index.stock !=0 ? <IoIosAddCircle  fontSize={35} onClick={() =>handCart(index)}   /> : null}
                                        </div>
                                    </div>
                            <div className="icon-whatsapp" >
                                    <h3 class="itemName">{index.name}</h3>
                            </div>

                            {index.stock !=0   ? <span>disponible</span> : <span>no esta disponible</span> }
                                <div className="botton" >
                                    <div>
                                        <h3 class="price"><span>$ </span>{index.price}</h3>
                                    </div>
                                </div>
                        </div>
                        )
                    :
                    null    }
            </div>
    </>
    )
}

export default ItemCard