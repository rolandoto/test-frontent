import React from "react";


const Day =({event}) =>{

   
    
    let today = new Date(event)
    const result = today?.toISOString().split('T')[0]
    
    if(!event) return null
    return <td>{result}</td>
    
}
export default Day