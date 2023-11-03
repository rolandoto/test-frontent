import React from "react"
import ReactDOM from 'react-dom'
import { IoMdCloseCircle } from "react-icons/io";

const ModalStore =({state ,setState,handSubmit,handOrganize,handOrganizeOcasional}) =>{

    return ReactDOM.createPortal(
        <>
            {state &&   <div className="border-ri" >
                <div className="content-Modal" >
                        <div className="handclose" onClick={() => setState(false)}>
                            <IoMdCloseCircle   fontSize={30} color="black" />
                        </div>
                    <div>
                        <button className='button-store' onClick={handSubmit} >Asignar habitacion</button>
                        <button className='button-store' onClick={handOrganizeOcasional} >Asignar Ocasional</button>
                        <button className='button-store' onClick={handOrganize} >Generar Orden</button>
                    </div> 
                </div>
            </div>}
        </>,
        document.getElementById('createPortal')
    )

}

export default ModalStore