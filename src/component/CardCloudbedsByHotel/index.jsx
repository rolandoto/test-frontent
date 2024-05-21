import React,{useEffect} from "react"
import HeaderCloudbed from "../HeaderCloudbed"
import UseApiCloudbedsActions from "../../action/useApiCloudbedsActions"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import PageBack from "../../component/PageBack"
import { useSelector } from "react-redux"
import { Loading } from "@nextui-org/react"
import ButtonBack from "../ButtonBack"
import ButtonHome from "../ButtonHome"
import ContentLoader from "react-content-loader"
import CardCloudbedsReservation from "../CardCloudbedsReservation"
import { MainReservation, StyleContainerLoadingCLoudbeds } from "../../stylecomponent/StyleMenu"


const LoadingSkeleton =(props) =>{
    return (      <ContentLoader height={1000} width={700} >
        <circle cx="25" cy="50" r="25" />
        <circle cx="25" cy="150" r="25" />
        <circle cx="25" cy="250" r="25" />
        <circle cx="25" cy="330" r="25" />
      
       
        <rect x="60" y="30" rx="5" ry="5" width="220" height="15" />
        <rect x="60" y="50" rx="5" ry="5" width="70" height="15" />
        <rect x="140" y="50" rx="5" ry="5" width="90" height="15" />
        <rect x="240" y="50" rx="5" ry="5" width="70" height="15" />
        <rect x="320" y="50" rx="5" ry="5" width="60" height="15" />
        <rect x="390" y="50" rx="5" ry="5" width="50" height="15" />
        <rect x="450" y="50" rx="5" ry="5" width="70" height="15" />
        <rect x="60" y="70" rx="5" ry="5" width="60" height="15" />
        <rect x="130" y="70" rx="5" ry="5" width="80" height="15" />
        <rect x="220" y="70" rx="5" ry="5" width="90" height="15" />
        <rect x="320" y="70" rx="5" ry="5" width="100" height="15" />
        <rect x="380" y="70" rx="5" ry="5" width="50" height="15" />
        <rect x="440" y="70" rx="5" ry="5" width="60" height="15" />
  
        <rect x="60" y="130" rx="5" ry="5" width="220" height="15" />
        <rect x="60" y="150" rx="5" ry="5" width="70" height="15" />
        <rect x="140" y="150" rx="5" ry="5" width="90" height="15" />
        <rect x="240" y="150" rx="5" ry="5" width="70" height="15" />
        <rect x="320" y="150" rx="5" ry="5" width="60" height="15" />
        <rect x="390" y="150" rx="5" ry="5" width="50" height="15" />
        <rect x="450" y="150" rx="5" ry="5" width="70" height="15" />
        <rect x="60" y="170" rx="5" ry="5" width="60" height="15" />
        <rect x="130" y="170" rx="5" ry="5" width="80" height="15" />
        <rect x="220" y="170" rx="5" ry="5" width="90" height="15" />
        <rect x="320" y="170" rx="5" ry="5" width="100" height="15" />
        <rect x="380" y="170" rx="5" ry="5" width="50" height="15" />
        <rect x="440" y="170" rx="5" ry="5" width="60" height="15" />
  
        <rect x="60" y="230" rx="5" ry="5" width="220" height="15" />
        <rect x="60" y="250" rx="5" ry="5" width="70" height="15" />
        <rect x="140" y="250" rx="5" ry="5" width="90" height="15" />
        <rect x="240" y="250" rx="5" ry="5" width="70" height="15" />
        <rect x="320" y="250" rx="5" ry="5" width="60" height="15" />
        <rect x="390" y="250" rx="5" ry="5" width="50" height="15" />
        <rect x="450" y="250" rx="5" ry="5" width="70" height="15" />
        <rect x="60" y="270" rx="5" ry="5" width="60" height="15" />
        <rect x="130" y="270" rx="5" ry="5" width="80" height="15" />
        <rect x="220" y="270" rx="5" ry="5" width="90" height="15" />
        <rect x="320" y="270" rx="5" ry="5" width="100" height="15" />
        <rect x="380" y="270" rx="5" ry="5" width="50" height="15" />
        <rect x="440" y="270" rx="5" ry="5" width="60" height="15" />
  
        <rect x="60" y="310" rx="5" ry="5" width="220" height="15" />
        <rect x="60" y="330" rx="5" ry="5" width="70" height="15" />
        <rect x="140" y="330" rx="5" ry="5" width="90" height="15" />
        <rect x="240" y="330" rx="5" ry="5" width="70" height="15" />
        <rect x="320" y="330" rx="5" ry="5" width="60" height="15" />
        <rect x="390" y="330" rx="5" ry="5" width="50" height="15" />
        <rect x="450" y="330" rx="5" ry="5" width="70" height="15" />
        <rect x="60" y="350" rx="5" ry="5" width="60" height="15" />
        <rect x="130" y="350" rx="5" ry="5" width="80" height="15" />
        <rect x="220" y="350" rx="5" ry="5" width="90" height="15" />
        <rect x="320" y="350" rx="5" ry="5" width="100" height="15" />
        <rect x="380" y="350" rx="5" ry="5" width="50" height="15" />
        <rect x="440" y="350" rx="5" ry="5" width="60" height="15" />
  
      
       
      </ContentLoader>)
}

const CardCloudbedsByHotel =() =>{

    const {id} = useParams()
    const {getHotelGenalCloudbedsByHotel,getCloudbedsByReservation} = UseApiCloudbedsActions()
    const { getHotelByHotel,
            loadingByHotel,
            errorByHotel,
            getHotelByReservation,
            loadingByReservation,
            errorByReservation} = useSelector((state) => state.ApiCloudbedsReducersSlice)

    const fetchDate =async() =>{
        await getHotelGenalCloudbedsByHotel({id})
        await getCloudbedsByReservation({id})
    }

    const FillContent =() =>{
        if(loadingByHotel){
          return (<StyleContainerLoadingCLoudbeds >
                     <Loading type="default"  color={"success"} size="lg" />
                 </StyleContainerLoadingCLoudbeds>
             )
        }if(errorByHotel){
          return  <PageBack />
        }
       return 
    }


    const FillContentReservation =() =>{
       if(errorByReservation){
          return  <PageBack />
        }
       return 
    }

    useEffect(() =>{
        fetchDate()
    },[id])


    return (<>{FillContent()}
            <ButtonBack />
            <ButtonHome/>
            {!loadingByHotel  &&  <HeaderCloudbed  getHotelByHotel={getHotelByHotel} /> }   

            {FillContentReservation()}

            <MainReservation className=" mx-auto    max-w-7xl items-center justify-between p-4 lg:px-8">
             {loadingByReservation  ?< LoadingSkeleton  /> :  <CardCloudbedsReservation  getHotelByReservation={getHotelByReservation} /> }
             </MainReservation>
            </>
    )
}

export default CardCloudbedsByHotel