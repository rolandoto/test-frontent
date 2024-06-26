import React from "react";
import CardSigo from "../CardSigo";


const CardProductSigo =({dashboardSigo}) =>{

    return (  
                <div  >
                    {dashboardSigo.map((item) =>{
                        return <CardSigo  {...item}  />
                    })}
                </div>
     
    )

}
export default CardProductSigo