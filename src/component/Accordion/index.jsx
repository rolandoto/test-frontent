import React from "react"
import "./Accordion.css"


const Accordion =({title,active,setActive,acordionOne,accordionTwo,accordionThree,accordionFour,accordionFive,accordionSix,accordionSevent,accordionNone,icone}) =>{

    const taOne = acordionOne && true
    const taTwo = accordionTwo && true
    const taThree = accordionThree && true
    const taFour = accordionFour && true
    const tafive = accordionFive && true
    const taSix = accordionSix && true
    const taSevent = accordionSevent && true
    const taNine = accordionNone && true
   

   

    const event  = title ? title :null

    const open =() =>{
        setActive(event)
    }

    const closed =() =>{
        setActive(!event)
    }

    const icon = active ==title ? "-" :"+"


    return (
        <div className="App-container-accordion" >
            <div className="accordione">
                <div className="accordionHeading">
                    <div className="containero">

                            <p>{icone} {title}</p>
                            <span className="icon-accordion" onClick={(active ==title ? closed :open )} >{icon}</span>
                    </div>
                </div>

                <div className={(active==title ?"show":"")+ " accordionContent"}  >
                    <div className="containero">
                    <table className="tab">
                <thead className="go">
                    <tr>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Direccion</th>
                    </tr>
                </thead>
                    {taOne && acordionOne.map((index) =>(
                         <tr>
                         <td>{index.name}</td>
                         <td>{index.phone}</td>
                         <td>{index.direccion}</td>
                     </tr>
                    ))}

                    {taTwo && accordionTwo.map((index) =>(
                                            <tr>
                                                <td>{index.name}</td>
                                                <td>{index.phone}</td>
                                                <td>{index.direccion}</td>
                                            </tr>
                        ))}
                    {taThree && accordionThree.map((index) =>(
                                           <tr>
                                           <td>{index.name}</td>
                                           <td>{index.phone}</td>
                                           <td>{index.direccion}</td>
                                       </tr>
                        ))}
                    {taFour && accordionFour.map((index) =>(
                                            <tr>
                                            <td>{index.name}</td>
                                            <td>{index.phone}</td>
                                            <td>{index.direccion}</td>
                                        </tr>
                        ))}
                    {tafive && accordionFive.map((index) =>(
                                            <tr>
                                            <td>{index.name}</td>
                                            <td>{index.phone}</td>
                                            <td>{index.direccion}</td>
                                        </tr>
                        ))}
                    {taSix && accordionSix.map((index) =>(
                                           <tr>
                                           <td>{index.name}</td>
                                           <td>{index.phone}</td>
                                           <td>{index.direccion}</td>
                                       </tr>
                        ))}
                    {taSevent && accordionSevent.map((index) =>(
                                           <tr>
                                           <td>{index.name}</td>
                                           <td>{index.phone}</td>
                                           <td>{index.direccion}</td>
                                       </tr>
                        ))}
                    {taNine && accordionNone.map((index) =>(
                                            <tr>
                                            <td>{index.name}</td>
                                            <td>{index.phone}</td>
                                            <td>{index.direccion}</td>
                                        </tr>
                        ))}
                    
            </table>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Accordion