import React from "react";

const Input =({title,name,change,type="text"}) =>{

    return (
        <li>
            <label className="title-stores">{title}</label>
            <input className="input-selecto-dasboard-n1"  name={name} type={type} onChange={change} />
        </li>
    )
}   
 
export default Input     