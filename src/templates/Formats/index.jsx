import React from "react";
import {BsFileEarmarkPdf ,BsFillArrowRightCircleFill} from "react-icons/bs";

const FormatsTemplate =({entities}) =>{

    return (
        <div className="container-format" >  
             <div className=" contenedor amarillo">
                {entities.map((index,e) => (
                <div className="container-formats" key={e}  >
                    <div className="row" >
                        <span className="text-title">{index.nombre}</span> 
                        <div className="icon-pdf" >
                            <BsFileEarmarkPdf color="#bb2d3b" size={60} />
                        </div>
                        <li className='page-iteme'  >
                            <a   href={`${index.pdf}`} target="_blank"     className='page-linke'>
                                ver Formato 
                                    <BsFillArrowRightCircleFill />
                            </a>
                        </li>
                    </div>
                </div>
                ))}
             </div>
        </div>
    )

}
export default FormatsTemplate