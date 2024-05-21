import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import UseApiCloudbedsActions from "../../action/useApiCloudbedsActions"
import PageBack from "../../component/PageBack"
import { Loading } from "@nextui-org/react"
import CardHotelCloudbeds from "../../component/CardHotelCloudbeds"
import { StyleContainerLoadingCLoudbeds } from "../../stylecomponent/StyleMenu"

const HomeIntegrationCloudbeds =() =>{

    const {getHotelGenalCloudbeds} = UseApiCloudbedsActions()

    const {loading,error,getHotel} = useSelector((state) => state.ApiCloudbedsReducersSlice)

    const fetchDate =async() =>{
        await getHotelGenalCloudbeds()
    }

    const FillContent =() =>{
        if(loading){
          return (<StyleContainerLoadingCLoudbeds >
                     <Loading type="default"  color={"success"} size="lg" />
                 </StyleContainerLoadingCLoudbeds>
             )
        }if(error){
          return  <PageBack />
        }
        return <CardHotelCloudbeds getHotel={getHotel} />
    }

    useEffect(() =>{
        fetchDate()
      },[])
  
    return ( <> {FillContent()} </>)

}

export default HomeIntegrationCloudbeds