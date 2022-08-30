import React from "react"


const MenuItem =({id,itemId,imgSrc,name,setData}) =>{

            const da =  id == "2" ? true : false

            return (
                <div onClick={() => setData(itemId) } key={id} >
                        <div className="imgBox-Container">
                            <div className="imgBox" >
                                    <img  alt="" src={imgSrc} />
                            </div>               
                        </div>

                        <div className={`rowMenuCard ${da ? `active` : ``}`}>
                                <h3 className="itemName" >{name}</h3>
                            <i className="loadMenu">
                            </i>
                        </div>
                </div>
            )
    }

export default MenuItem