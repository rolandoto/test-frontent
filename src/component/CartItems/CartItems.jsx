import React, { useContext, useEffect, useState } from "react";
import { GrFormAdd,GrFormSubtract } from "react-icons/gr";
import  AutoProvider  from "../../privateRoute/AutoProvider";

function CartItem({index,Items,handTotal}) {

  const [qty, setQty] = useState(1);

  const {carts,setCarts} = useContext(AutoProvider)

  const handCartSum =({ID}) =>{
      const to =  carts.cart.find(index => index.ID === ID)
      const ca =  Items?.query?.find(index => index.ID === ID)
      if(to){
        setQty(qty +1)
        to.quantity+=1
        to.Precio+=ca.Precio

      }
  } 

  const handDelete =({ID}) =>{
    if(qty==1){
         setCarts({
           ...carts,
           cart:[...carts.cart.filter(index =>  index.ID !==ID)]
         })
    }else{
        const to =  carts.cart.find(index => index.ID === ID)
        const ca =   Items?.query?.find(index => index.ID === ID)
        setQty(qty -1)
        to.quantity-=1
        to.Precio-=ca.Precio
    }
  }

  const total  = carts.cart.reduce((acumlator,currentValue) => acumlator + currentValue.Precio,0 )


  useEffect(() =>{
    handTotal({total})
  },[total])

 

  return (
    <>
 
    <div className="cartItem" id={index.ID}  >
      <div className="imgBoxe">
        <img src={"Prueba"}  alt="" />
      </div>
        <div className="itemSection">
            <h2 className="itemName">{index.Nombre}</h2>
            <div className="itemQuantity">
            <span>x{index.quantity}</span>
            <div className="quantity">
                <GrFormAdd
                
                className="itemRemove"
                onClick={() =>  handCartSum(index)}
                />
                <GrFormSubtract onClick={() =>handDelete(index)}
                className="itemAdd"
                />
            </div>
            </div>
        </div>
          <p className="itemPrice">
              <span className="dolorSign">$</span>{" "}
              <span className="itemPriceValue">{index.Precio}</span>
          </p>
    </div>
    </>
  );
}

export default CartItem;