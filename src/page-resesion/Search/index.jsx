import React from "react";
import useProgress from "../../hooks/useProgress";
import TemplateSearch from "../../templates/Search";
import LineProgress from "../../Ui/LineProgress";
import "./style.css"

const Search =() =>{
    const id = 10
    const {progress} = useProgress({id})


    const fillConten =() =>{
        if(progress<100){
            return <LineProgress  progress={progress}/>
        }

        return  <TemplateSearch />
    }


    return (
       <> {fillConten()}</>
    )

}

export default Search