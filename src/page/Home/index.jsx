import React, { useContext, useEffect, useState } from 'react'
import UseTitle from '../../hooks/UseTitle';
import { RiStoreLine } from "react-icons/ri";
import { RiHotelLine } from "react-icons/ri";
import { IoAnalyticsOutline } from "react-icons/io5";
import {useHistory} from "react-router-dom"
import  AutoProvider  from '../../privateRoute/AutoProvider';
import { StyleSpanIcons, StyleTitle, StyledContextTyeHotelConfiguration, StyledContextTyeHotelConfigurationHome, StyledMenuItem, StyledMenuItemUser } from '../../stylecomponent/StyleMenu';
import { PiUserSwitchThin } from "react-icons/pi";
import useUserUpdateRolesActions from '../../action/useUserUpdateRolesActions';
import confetti from 'canvas-confetti';
import UseUsers from '../../hooks/UseUser';
const Home =() =>{

    const {jwt} =useContext(AutoProvider)
    const [contextMenuPositionHome, setContextMenuPositionHome] = useState({ top: 0, left: 0 });
    const [OpenConfiguration,setOpenConfiguration] =useState(false)
    const history = useHistory() 

    const {postUserUpdateRolesById} = useUserUpdateRolesActions()
    const { login,isError,isLogin} =UseUsers() 

    UseTitle({title:"Home"})
    //<ShowBed bed={ray}  />

    const handNextHotels =() =>{
        history.push(`/DetailBedRoom/${jwt.result.id_hotel}`)
    }

    const handNextStores = () => {
        history.push(`/DetailStore/${jwt.result.id_hotel}`)
    }

    const handNextStoresSubcategory = () => {
        history.push(`/SubCategoria/${jwt.result.id_hotel}`)
    }

    const handNextStUpload =() =>{
        history.push(`/UploadPopUp`)
    }

    const handNextTarifasReservation  =() =>{
         history.push(`/TarifasReservation/${jwt.result.id_hotel}`)
    }

    const handClickConfiguration =() =>{
		setOpenConfiguration(!OpenConfiguration)
		setContextMenuPositionHome({top:67, left: 40})
	}

    const HandClickUserUpdtateRoles=async(byIdpermision) =>{
		try {
			await postUserUpdateRolesById({id_permissions:byIdpermision,id:jwt.result.id_user})
			login({username:jwt.result.username,password:"sassadas",hotel:jwt.result.id_hotel})
			confetti({
				zIndex: 999,
				particleCount: 100,
				spread: 70,
				origin: { x: 0.50, y: 0.8 }
			});
			setOpenConfiguration(false)
		} catch (error) {
			console.log("error en el servidor ")
		}
	}


    return (
        <>
  
            <div className="Container-looking-for-home">
                <div className="row-icon-searching" onClick={handClickConfiguration}    >
					<img src="https://github.com/rolandoto/image-pms/blob/main/WhatsApp%20Image%202024-04-19%20at%2010.32.39%20PM.jpeg?raw=true" alt="" />
			    </div>

            <div  className="row-icon-searching" >
            {OpenConfiguration &&  <StyledContextTyeHotelConfigurationHome className="fade-in"  top={contextMenuPositionHome.top} left={contextMenuPositionHome.left} >
                    <StyledMenuItemUser>
                        <StyleSpanIcons   > <div className="row-icon-searching"><img src="https://github.com/rolandoto/image-pms/blob/main/WhatsApp%20Image%202024-04-19%20at%2010.32.39%20PM.jpeg?raw=true" alt="" /></div></StyleSpanIcons> 
                        <StyleTitle>{jwt.result.name}  </StyleTitle>
                    </StyledMenuItemUser>
                    <StyledMenuItem  onClick={() => HandClickUserUpdtateRoles(1)} > 
                        <StyleSpanIcons   > <PiUserSwitchThin   fontSize={30} /></StyleSpanIcons> 
                        <StyleTitle>Administrador</StyleTitle>
                    </StyledMenuItem>
                    <StyledMenuItem   onClick={() => HandClickUserUpdtateRoles(7)}  >
                        <StyleSpanIcons   > <PiUserSwitchThin   fontSize={30} /></StyleSpanIcons> 
                        <StyleTitle>Reservas</StyleTitle>
                    </StyledMenuItem>
                </StyledContextTyeHotelConfigurationHome>}
            </div>
            </div>
            <div className='container'>
                <div className='rowMenuCard-home' onClick={handNextHotels} >
                     <h3 class="itemName-home">
                        <RiHotelLine   fontSize={24} />
                        <span className='let-home' >Hotel</span>
                     </h3>
                </div>
                <div className='rowMenuCard-home ' onClick={handNextStores}>
                     <h3 class="itemName-home">
                        <RiStoreLine fontSize={24}/>
                        <span className='let-home' >Tienda</span>
                    </h3>
                </div>
                <div className='rowMenuCard-home ' onClick={handNextStoresSubcategory}>
                     <h3 class="itemName-home">
                        <RiStoreLine fontSize={24}/>
                        <span className='let-home' >Categorias</span>
                    </h3>
                </div>

                <div className='rowMenuCard-home' onClick={handNextStUpload}  >
                     <h3 class="itemName-home">
                        <IoAnalyticsOutline fontSize={24}  />
                        <span className='let-home'>Notificacion</span>
                     </h3>
                </div>
                <div className='rowMenuCard-home' onClick={handNextTarifasReservation}  >
                     <h3 class="itemName-home">
                        <IoAnalyticsOutline fontSize={24}  />
                        <span className='let-home'>Tarifas</span>
                     </h3>
                </div>
                <div className='rowMenuCard-home '>
                     <h3 class="itemName-home">
                        <IoAnalyticsOutline fontSize={24}  />
                        <span className='let-home'>Analitica</span>
                     </h3>
                </div>
            </div>
        </>
    )
}

export default Home
