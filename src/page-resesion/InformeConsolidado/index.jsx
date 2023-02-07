import React from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import LoadingDetail from "../../Ui/LoadingDetail"
import { useState } from "react";

const InformeConsolidado = () => {

    const [value, setValue] = useState("");

  const handleChange = event => {
    let newValue = event.target.value;
    if (newValue >= 0) {
      setValue(newValue);
    }
  };

    return (
        <ContainerGlobal>
             <LoadingDetail
                        loading={true}
                        titleLoading={"Informe consolidado"}  />
            <div className="init" >
        <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 

        <span className="desde-detail-two-title" > Habitaciones ocupadas </span>
        <span className="desde-detail-two-title" >Habitaciones sin vender: </span>
        <span className="desde-detail-three-title-das" >Subir pantallazo del rack soho</span>    

            </div>
              <div className="container-detail-dasboard-in" > 
                <input type="number" 
                      className="desde-detail-two"  
                      placeholder="Habitaciones ocupadas" 
                      name="Adultos"
                      value={value} onChange={handleChange}
                      
                        />  
             
                <input 
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Habitaciones sin vender"  
                      type="number" 
                />
                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Subir pantallazo del rack soho"  
                      type="number" 
                />
            </div>
        </form>

        <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 

        <span className="desde-detail-two-title" > Efectivo total </span>
        <span className="desde-detail-two-title" >Otros medio: </span>
        <span className="desde-detail-three-title-das" > Dolares/Euros en pesos</span>    
        <span className="desde-detail-two-das" >Gastos (NO CAJA MENOR)</span>    

            </div>
              <div className="container-detail-dasboard-in" > 
              <input  type="text" 
                                        className="desde-detail-three"  
                                        placeholder="Nombre" 
                                     
                                        />

                                <input  type="text" 
                                        className="desde-detail-three" 
                                        name="Apellido"  
                                        placeholder="Apellido" 
                                      
                                        />

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        placeholder="Tipo de documento"
                                        name="Fecha" 
                                       
                                        />

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        name="Fecha" 
                                        placeholder="No Documento"  
                                      
                                        />
            </div>
        </form>


        <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 

        <span className="desde-detail-two-title" > Efectivo total </span>
        <span className="desde-detail-two-title" >Otros medio: </span>
        <span className="desde-detail-three-title-das" > Dolares/Euros en pesos</span>    
        <span className="desde-detail-two-das" >Gastos (NO CAJA MENOR)</span>    

            </div>
              <div className="container-detail-dasboard-in" > 
                                <input  type="text" 
                                        className="desde-detail-three"  
                                        placeholder="Nombre" 
                                     
                                        />

                                <input  type="text" 
                                        className="desde-detail-three" 
                                        name="Apellido"  
                                        placeholder="Apellido" 
                                      
                                        />

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        placeholder="Tipo de documento"
                                        name="Fecha" 
                                       
                                        />

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        name="Fecha" 
                                        placeholder="No Documento"  
                                      
                                        />

                                <input  type="text" 
                                        className="desde-detail-two" 
                                        name="Fecha" 
                                        placeholder="No Documento"  
                                      
                                        />
                                <input  type="text" 
                                            className="desde-detail-two" 
                                            name="Fecha" 
                                            placeholder="No Documento"  
                                        
                                            />
                                <input  type="text" 
                                            className="desde-detail-two" 
                                            name="Fecha" 
                                            placeholder="No Documento"  
                                        
                                            />
                                <input  type="text" 
                                            className="desde-detail-two" 
                                            name="Fecha" 
                                            placeholder="No Documento"  
                                        
                                            />
            </div>
        </form>

      </div>
        </ContainerGlobal>
    )
}

export default InformeConsolidado