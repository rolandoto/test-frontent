import React, { useState } from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import { Button, Spacer } from "@nextui-org/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SearchBYID =() =>{
    const history = useHistory()

    const [inputValue, setInputValue] = useState('');

    // Handle the input change
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const handSubmit =(e) =>{
        e.preventDefault();
        history.push(`Createreservaction/${inputValue}`)
    }

    return (
        <ContainerGlobal>
               <div>
                <form onSubmit={handSubmit} >
                    <input  type="text" 
                              value={inputValue}
                              onChange={handleInputChange}
                            placeholder="Ingrese numero de documento" 
                            className="input-selecto-dasboard-n1-reservaction"  />
                    <br />
                    <Spacer x={0.1} y={0.5} />
                    <Button    
                            type="submit"
                            style={{width:"100%",height:"50px"}} 
                            auto color={"success"} >Consultar</Button>
                </form>
            </div>
        </ContainerGlobal>
    )

}

export default SearchBYID