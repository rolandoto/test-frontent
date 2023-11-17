import GroupRows from "./GroupsRows";
import { IoBedOutline ,IoBanOutline} from "react-icons/io5";
import { GiBroom } from "react-icons/gi";
import { BsCheckCircle,BsBell} from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

const renderGroup = ({ group }) => {

    const toggleGroup = (itemId) => {
    
      };
    const rows= []
    if(group.ID_estado_habiatcion == 6){
        rows.push(
            <GroupRows	
                color="white"
                group={group.title} 
                key={group.id}
                estado={"Limpia"} 
                letra="black"
                root={group.root}
                parent={group.parent}
                toggleGroup={toggleGroup}
               
                Fecha={group.Fecha}
                iconState={<BsCheckCircle color="black"  className="margin-right-rig"  fontSize={15} />}/>
        )
    }if(group.ID_estado_habiatcion == 5){
        rows.push(
            <GroupRows 	
                color="rgba(243, 217, 36, 0.8)"
                group={`${group.title}`} 
                key={group.id} 
                letra="black" 
                root={group.root}
                parent={group.parent}
                toggleGroup={toggleGroup}
               
                Fecha={group.Fecha}
                iconState={< GiBroom fontSize={15} color="black"  className="margin-right-rig" />}
                />
        )
    }
    if(group.ID_estado_habiatcion == 2){
        rows.push(
            <GroupRows	
                color="rgb(116, 113, 113)"
                group={`${group.title}`}
                letra="white" 
                key={group.id} 
                root={group.root}
                parent={group.parent}
                toggleGroup={toggleGroup}
               
                Fecha={group.Fecha}
                iconState={<IoBanOutline  color="white" className="margin-right-rig"  fontSize={15}/>}
                />
        )
    }if(group.ID_estado_habiatcion == 3){
        rows.push(
            <GroupRows 	
                color="white"
                group={` ${group.title}`}
                letra="black" 
                key={group.id} 
                root={group.root}
                parent={group.parent}
                toggleGroup={toggleGroup}
               
                Fecha={group.Fecha}
                iconState={	<div className="live-indicator margin-right-rig ">
                                <span class="live-text">En vivo</span>
                            </div>}
                                />
        )
    }
    if(group.ID_estado_habiatcion == 7){
        rows.push(
            <GroupRows 	
                color="white"
                group={` ${group.title}`}
                letra="black" 
                key={group.id} 
                id={group.id} 
                ID_estado_habitacion={group.ID_estado_habitacion}
                root={group.root}
                parent={group.parent}
                toggleGroup={toggleGroup}
                 Time_ingreso={group.Time_ingreso}
                Time_salida={group.Time_salida}
                isValid={true}
                Fecha={group.Fecha}
                iconState={	<AiFillHeart className="live-indicator-heart margin-right-rig " color="red"  fontSize={15}/>}
                                />
        )
    }

    
        rows.push(
            <GroupRows 	
                color="white"
                iconState={<IoBedOutline fontSize={15}  className="margin-right-rig" color="black" />}
                group={group.title} 
                root={group.root}
                key={group.id} 
                toggleGroup={toggleGroup}
                Fecha={group.Fecha}
                parent={group.parent}/>
        )
        return (
            <>
                {rows}
            </>
        );
};


export default renderGroup