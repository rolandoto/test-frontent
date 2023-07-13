import React, { useEffect, useState } from "react";
import { GrFormAdd,GrFormSubtract } from "react-icons/gr";
import DebitCard from "../DebitCard/DebitCard";
import { IoIosAddCircle } from "react-icons/io";
import { UsenearScrean } from "../../hooks/UseInsertionObserver";


const ItemCard =({index,handCart}) =>{

    const [show,element] = UsenearScrean()

    return ( 
        <> 
            <div className="itemCard" key={index.ID} ref={element} >
                        <div className="item-content" >
                                    <div className="add-cart" >
                                        <div className="rest-to-cart" >
                                            {index.Cantidad !== 0 ? <IoIosAddCircle  fontSize={35} onClick={() =>handCart(index)}   /> : null}
                                        </div>
                                    </div>
                            <div className="icon-whatsapp" >
                                    <h3 class="itemName">{index.Nombre}</h3>
                            </div>

                          
                            <div className="icon-cantidad" >
                            {index.Cantidad >9 ?  <h4 class="price One-Tienda-Recepcion">{index.Cantidad}</h4> :<h4 class="One-Tienda-Recepcion-Two">{index.Cantidad}</h4> }
                                    
                            </div>    
                          
                            <div>
                                        <h3 class="price"><span>$ </span>{index.Precio.toLocaleString()}</h3>
                            </div>

                            {index.Cantidad !=0   ? <span>Disponible</span> : <span>No disponible</span>}
                                <div className="icon-cantidadOne" >
                                    <div>
                                        <h6 class="itemName-One">Cantidad</h6>
                                    </div>
                                </div>  
                    </div>
            </div>
    </>
    )
}

export default ItemCard