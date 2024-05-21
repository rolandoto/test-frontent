import React from "react"
import { ContaineButton, ImginProduct, MainProduct, TextWidth } from "../../stylecomponent/StyleMenu"

const CardHotelCloudbeds =({getHotel}) =>{

    const  {data} =  getHotel

    return (<>  
                {data?.data.map((itemHotel) => {
                    return ( <main className=" mx-auto flex  max-w-5xl items-center justify-between p-4 lg:px-8">
                            <MainProduct className="bg-white shadow-md"  >
                                <ImginProduct src={itemHotel.propertyImage}  alt="Hotel Image"/>
                                <div >

                                <TextWidth>
                                <h2 className="text-lg font-semibold mb-2">{itemHotel.propertyName}</h2>
                                </TextWidth>
                                <div className="text-sm text-gray-600 mb-2">ID: {itemHotel.propertyID}</div>
                                    <div>
                                    <span className="text-green-300 font-semibold">{itemHotel.propertyCurrency.currencyCode} <span >(200)</span></span>
                                    </div>
                                </div>
                                <ContaineButton >
                                    <button className=" Button-Search w-[150px] bg-blue-500 text-white py-4  rounded hover:bg-blue-600 transition duration-200">
                                                Mirar hotel
                                    </button>
                                </ContaineButton>
                            </MainProduct>
                    </main>)
                })}
              
            </> 
        )
}

export default CardHotelCloudbeds