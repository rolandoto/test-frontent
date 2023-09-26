import GroupRows from "./GroupsRows";
import { IoBedOutline ,IoBanOutline} from "react-icons/io5";
import { GiBroom } from "react-icons/gi";
import { BsCheckCircle,BsBell} from "react-icons/bs";
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
                iconState={<BsCheckCircle color="black"  fontSize={15} />}/>
        )
    }if(group.ID_estado_habiatcion == 5){
        rows.push(
            <GroupRows 	
                color="white"
                group={`${group.title}`} 
                key={group.id} 
                letra="black" 
                root={group.root}
                parent={group.parent}
                toggleGroup={toggleGroup}
                iconState={< GiBroom fontSize={15} color="black"  />}
                />
        )
    }
    if(group.ID_estado_habiatcion == 2){
        rows.push(
            <GroupRows	
                color="white"
                group={`${group.title}`}
                letra="black" 
                key={group.id} 
                root={group.root}
                parent={group.parent}
                toggleGroup={toggleGroup}
                iconState={<IoBanOutline  color="black"  fontSize={15}/>}
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
                iconState={	<div class="live-indicator">
                                <span class="live-text">En vivo</span>
                            </div>}
                                />
        )
    }
        rows.push(
            <GroupRows 	
                color="white"
                iconState={<IoBedOutline fontSize={15}  color="black" />}
                group={group.title} 
                root={group.root}
                key={group.id} 
                toggleGroup={toggleGroup}
                parent={group.parent}/>
        )
        return (
            <>
                {rows}
            </>
        );
};


export default renderGroup