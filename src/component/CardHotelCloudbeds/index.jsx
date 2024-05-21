import React from "react"
import { BorderImgCloudbeds, ContaineButton, ImginProduct, MainProduct, MainReservation, TextWidth } from "../../stylecomponent/StyleMenu"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const CardHotelCloudbeds =({getHotel}) =>{

    const  {data} =  getHotel
    const   history = useHistory()

    return (<>  
                {data?.data.map((itemHotel) => {
                const handNextByHotelCloudbed =()=>{
                    history.push(`/Cloudbeds/hotel/${itemHotel.propertyID}`)
                }
                    return ( <main key={itemHotel.propertyID} className=" mx-auto max-w-5xl items-center justify-between p-4 lg:px-8">
                            <MainProduct className="bg-white shadow-md"  >
                                <ImginProduct src={itemHotel.propertyImage}  alt="Hotel Image"/>
                                <div >
                                    <BorderImgCloudbeds className="bg-blue-500 ">
                                        <img src="https://cloudbeds-fcfc.kxcdn.com/wp-content/uploads/2019/02/CB_logo_wht.svg" alt="" />
                                    </BorderImgCloudbeds>
                                <TextWidth>
                                <h2 className="text-lg font-semibold mb-2">{itemHotel.propertyName}</h2>
                                </TextWidth>
                                <div className="text-sm text-gray-600 mb-2">ID: {itemHotel.propertyID}</div>
                                    <div>
                                    <span className="text-green-300 font-semibold">{itemHotel.propertyCurrency.currencyCode} <span >(200)</span></span>
                                    </div>
                                </div>
                                <ContaineButton  >
                                    <button className=" Button-Search w-[150px] bg-blue-500 text-white py-4  rounded hover:bg-blue-600 transition duration-200" onClick={handNextByHotelCloudbed}   >
                                                Ver hotel
                                    </button>
                                </ContaineButton>
                            </MainProduct>
                    </main>)
                })}
              
            </> 
        )
}

export default CardHotelCloudbeds