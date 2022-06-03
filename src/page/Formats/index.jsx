import React, { useState } from "react"
import UseListFormats from "../../hooks/UseListFormats"
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFileEarmarkPdfFill, BsFileEarmarkPdf ,BsFillArrowRightCircleFill} from "react-icons/bs";
import UseUsers from "../../hooks/UseUser";


const Formats =() =>{

    const {jwt} = UseUsers()

    const {id_hotel}  = jwt.result

    const {data} = UseListFormats({id_hotel})
    
    if(!data && !jwt)  return null

    return (
        <div className="container-format" >  
             <div className=" contenedor amarillo">
                {data.link?.map((index,e) => (
                <div className="container-formats" key={e}  >
                    <div className="row" >
                        <span className="text-title">{index.name_centro_documental}</span> 
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
export default Formats