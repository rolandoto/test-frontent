import React from "react";
import CartItem from "../../../component/CartItems/CartItems";

const Cart =({handModal,priceCart,carts,handTotal,Items}) =>{

    return (
        <div className="cartCheckOutContianer">
            <div className="cartContainer">
                <div className="cartItems">
                {carts?.cart?.length>0 &&
                    carts.cart.map((data,e) => (
                    <CartItem
                        key={e}
                        index={data}
                        Items={Items}
                        handTotal={handTotal}
                    />
                    ))}
                </div>
            </div>
            <div className="totalSection">
                <h3>Total</h3>
                <p>
                    <span>$ {priceCart}</span>
                </p>
            </div>
            <button className="checkOut" onClick={handModal} >
                    <span className="itemNameonE">Pagar</span>
            </button>
        </div>
    )

}
export default Cart