import React from "react"
import Header from "../../component/Header"
import ShowBed from "../../component/showBed"
import "./index.css"


const HomeResesion =() =>{
    
    const ray =[3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,61,62,63,64,65,66,67,68,69,70]

        return(
        <div>
               
                <div className="continainer-resesion" >
                    <ShowBed bed={ray}  />
                    <div className='container-resesion'>
                        <div className='rowMenuCard-home '>
                            <h3 class="itemName-home">
                                <span className='let-home' >Hotel</span>
                            </h3>
                        </div>
                        <div className='rowMenuCard-home '>
                            <h3 class="itemName-home">
                                <span className='let-home' >Tienda</span>
                            </h3>
                        </div>
                        <div className='rowMenuCard-home '>
                            <h3 class="itemName-home">
                                <span className='let-home'>Analitica</span>
                            </h3>
                        </div>
                    </div>
                </div>
        </div>
        
    )
}

export default HomeResesion