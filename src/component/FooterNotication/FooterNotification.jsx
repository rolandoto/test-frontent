import { HeartIcon } from "../../page-resesion/Dashboard/IconReservation"
import "./FooterNotificaction.css"
import { IoCloseSharp } from "react-icons/io5";

const FooterNotifacation =({closeHandler}) =>{

    return (
        <nav className="container-footer-notification" >
                <div className="close-notificacion" onClick={closeHandler}  >
                    <IoCloseSharp  color="white" />
                </div>
                <div className="page-icon-title" href="">
                    <span className="row-item-page"  >Asi podra ver una nueva actualizaciones con estos video cortos</span>
                </div>
         
            <div className="page-icon"><iframe
                    className="video-iframe"
                    src={`https://www.youtube.com/embed/Y-TGutlBXw8?autoplay=1&amp;loop=1&amp;controls=0&amp;mute=1&amp;playlist=Y-TGutlBXw8`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen  // Enable fullscreen mode
                    title="Embedded youtube"
          /> </div>
        
        </nav>
    )
}

export  default FooterNotifacation