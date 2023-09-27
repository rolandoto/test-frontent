import React, { useState } from  "react"

const GroupRows =({group,color,estado,iconState,letra,root,parent,toggleGroup}) =>{

    const handClickToggle  =() =>{
		toggleGroup(parent)
	}
	
    if(root){
		return (
			<div    style={{ backgroundColor: color, color:letra}} className="flex-romm-grup" >
				<div>
					<span  onClick={handClickToggle} style={{ cursor: "pointer", color: "black", fontWeight: "bold" }} className="font-room" > {"[-]"} {group} {estado}  </span> 
				</div>
				<div>
					{iconState} 
				</div>
			</div>
		)
	}else {
		return (
			<div    style={{ backgroundColor: color, color:letra}} className="flex-romm-grup" >
				<div>
					<span className="font-room" >  {group} {estado}  </span> 
				</div>
				<div>
					{iconState} 
				</div>
			</div>
		)
	}
    
}

export default GroupRows