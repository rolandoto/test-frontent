import React from "react";

const Input =({title,name,change,type="text",value}) =>{

    return (
        <li>
            <label className="title-stores">{title}</label>
            <input className="input-selecto-dasboard-n1"  name={name} type={type} onChange={change} value={value} />
        </li>
    )
}   
 
export default Input     