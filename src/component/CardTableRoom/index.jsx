import { StyleTitleHotel } from "../../stylecomponent/StyleMenu"


const CardTableRoom  =({ItemValueRoom,title}) =>{
    
        return ( <div className="row-cardTableRoom" >
                            <table className="table-factura-two" > 
                            <tr>
                                <td >Habitación</td>
                                <td >Cantidad</td>
                                <td  >Ventas</td>
                            </tr>
                            
                                {ItemValueRoom.map(index  => {
                                        const totalWith = parseInt(index.abono) 
                                        return (
                                            <tr>
                                            <th  className="text-font-wei-one-informe" >{index.room}</th>
                                            <th  className="text-font-wei-one-informe">{index.cantidad}</th>
                                            <th  className="text-font-wei-one-informe">${totalWith.toLocaleString()}</th>
                                        </tr>
                                        )}
                                        )}

                             
                           
                        </table>
                        <div>
                            <span style={{color:"black"}} >	
                                <StyleTitleHotel> {title} 
                                </StyleTitleHotel>
                            </span>
                        </div>
                       
                </div>
        )

}

export default CardTableRoom