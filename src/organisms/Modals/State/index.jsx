import React from "react"
import { useState } from "react"
import { IoMdCloseCircle } from "react-icons/io";
import ButtonState from "../../../atoms/ButtonState";
import ButtonStateOne from "../../../atoms/ButtonStateOne";
import "./style.css"

const ModalSate  =({handChangeTypeRoomOne,modalState,handClickCloseState,handClikCleanline,handBlock}) =>{

    

    return (
        <>
            {modalState &&
                <div className="border-ri modalNewBooking">
                    <div className="content-Modal-dasboard">
                        <div className="contain-state-global" >
                                <div className="handclose">
                                   <IoMdCloseCircle fontSize={30} color="black" onClick={handClickCloseState} />
                                </div>

                             
                        </div>
                    </div>
                </div>
            }
        </>
    )

}

export default ModalSate