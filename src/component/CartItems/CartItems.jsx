import React, { useContext, useEffect, useState } from "react";
import { GrFormAdd,GrFormSubtract } from "react-icons/gr";
import  AutoProvider  from "../../privateRoute/AutoProvider";

function CartItem({index,Items,handTotal}) {

  const [qty, setQty] = useState(1);

  const {carts,setCarts} = useContext(AutoProvider)

  const handCartSum =({id}) =>{
      const to =  carts.cart.find(index => index.id === id)
      const ca =  Items.find(index => index.id === id)
      if(to){
        setQty(qty +1)
        to.quantity+=1
        to.price+=ca.price
        
      }
  } 

  const handDelete =({id}) =>{
    if(qty==1){
         setCarts({
           ...carts,
           cart:[...carts.cart.filter(index =>  index.id !==id)]
         })
    }else{
        const to =  carts.cart.find(index => index.id === id)
        const ca =  Items.find(index => index.id === id)
        setQty(qty -1)
        to.quantity-=1
        to.price-=ca.price
    }
  }

  const total  = carts.cart.reduce((acumlator,currentValue) => acumlator + currentValue.price,0 )


  useEffect(() =>{
    handTotal({total})
  },[total])

 

  return (
    <>
 
    <div className="cartItem" id={index.id}  >
      <div className="imgBoxe">
        <img src={index.imgSrc}  alt="" />
      </div>
        <div className="itemSection">
            <h2 className="itemName">{index.name}</h2>
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
              <span className="itemPriceValue">{index.price}</span>
          </p>
    </div>
    </>
  );
}

export default CartItem;