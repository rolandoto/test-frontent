import React from "react"
import {useHistory}  from "react-router-dom"


const CheckingProcessTwo =() =>{

    const history = useHistory()

    const handNextProcess=() =>{
        history.push("/CheckingProcessThree")
    }  

    return (
        <div>
            <div className="image-fume">
                <h1>3</h1>
                <img src="https://cdn-icons-png.flaticon.com/512/1760/1760234.png" alt="" />
                    <div className="container-button-process" >
                        <button className="Button-process" onClick={handNextProcess} >
                            <span>Siguiente</span>
                        </button>
                </div>
            </div>
        </div>
    )
}

export default CheckingProcessTwo