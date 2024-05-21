import React from "react"
import { BorderImgCloudbeds, ContaineButton, ImginProduct, MainCardReservation, MainProduct, MainReservation, StyleContainerLoadingCLoudbeds, TextWidth } from "../../stylecomponent/StyleMenu"

const CardCloudbedsReservation =({getHotelByReservation})  =>{

    const {data} =getHotelByReservation

    
    if(!data) return null

    return (<>
        {data.map((itemReservation,index) => (
            <MainCardReservation ke={index}  className="bg-white shadow-md"  >
            <div >
                <BorderImgCloudbeds className="bg-blue-500 ">
                    <img src="https://cloudbeds-fcfc.kxcdn.com/wp-content/uploads/2019/02/CB_logo_wht.svg" alt="" />
                </BorderImgCloudbeds>
            <TextWidth>
            <h2 className="text-lg font-semibold mb-2">{itemReservation.guestName}</h2>
            </TextWidth>
            <div className="text-sm text-gray-600 mb-2">ID:{itemReservation.guestID}</div>
                <div>
                    <span className="text-green-300 font-semibold">{itemReservation.status} <span >(200)</span></span>
                </div>
               

            </div>

       

            </MainCardReservation>

        ))}
           </>
    )
}

export default CardCloudbedsReservation