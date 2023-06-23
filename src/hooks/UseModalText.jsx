import React from "react"
import { confirmAlert } from "react-confirm-alert";

const UseModalText =({handlModal,Text}) =>{

    const handModalText =(e) =>{
        confirmAlert({
          title: '',
          message: Text,
          
              customUI: ({ onClose }) => {

                const handClick =() =>{
                    handlModal()
                    onClose() 
                }
    
               const handClose =() =>{
                    onClose() 
               }
    
                return (
                    <div className="popup-overlay"  >
                        <h4 className="let-letra" >{Text}</h4>
                        <button  className="react-confirm-alert-button-group" onClick={handClick} >Si</button>
                        <button  className="react-confirm-alert-button-group" onClick={ handClose} >No</button>
                  </div>         
                );
              }
        })
        }

        


    return  {handModalText}

}

export default UseModalText