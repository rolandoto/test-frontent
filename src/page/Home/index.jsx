import React, { useEffect } from 'react'
import UseTitle from '../../hooks/UseTitle';
import { RiStoreLine } from "react-icons/ri";
import { RiHotelLine } from "react-icons/ri";
import { IoAnalyticsOutline } from "react-icons/io5";
import {useHistory} from "react-router-dom"

const Home =() =>{

    const history = useHistory() 

    UseTitle({title:"Home"})
    //<ShowBed bed={ray}  />


    const handNextHotels =() =>{
        history.push("/Hotels")
    }
 
    return (
        <div>
            <div className='container'>
                <div className='rowMenuCard-home' onClick={handNextHotels} >
                     <h3 class="itemName-home">
                        <RiHotelLine   fontSize={24} />
                        <span className='let-home' >Hotel</span>
                     </h3>
                </div>
                <div className='rowMenuCard-home '>
                     <h3 class="itemName-home">
                        <RiStoreLine fontSize={24}/>
                        <span className='let-home' >Tienda</span>
                    </h3>
                </div>
                <div className='rowMenuCard-home '>
                     <h3 class="itemName-home">
                        <IoAnalyticsOutline fontSize={24}  />
                        <span className='let-home'>Analitica</span>
                     </h3>
                </div>
            </div>
        </div>
    )
}

export default Home
