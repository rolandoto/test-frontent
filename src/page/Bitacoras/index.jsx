import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import useBictacorasAction from "../../action/useBictacorasAction";
import useProgress from "../../hooks/useProgress";
import UseTitle from "../../hooks/UseTitle";
import UseUsers from "../../hooks/UseUser";
import BictacorasTemplate from "../../templates/Bictacoras";
import LineProgress from "../../Ui/LineProgress";

const Bictacoras  =() =>{
  const  {progress} = useProgress({id:"2"})
  const {jwt}  = UseUsers()
  const {getBictacorasById} =useBictacorasAction()
  const {loading,Bitacoras,error
                } =useSelector((state) => state.Bictacoras)

  const state=useSelector((state) => state)

  console.log(state)
 

  UseTitle({title:"Bictacoras"})

  const fetchData =async() =>{
      await getBictacorasById({id:jwt.result.id_hotel})
  }

  useEffect(() =>{
    fetchData()
  },[])

  const fillContent =()=>{

    if(progress <100){
      return <LineProgress progress={progress} />
    }
    if(loading){
      return <p>...Cargando</p>
    }
    if(error){
      return <p>{error}</p>
    } 

    return <BictacorasTemplate Bitacoras={Bitacoras} />

  }

  /**  const {bicta,isLoading} =UserListBictacoras()

   *   <div className="container-bicta">  
              {isLoading ?
              <div>
                <div className='container-image'>
                    <div className='color'></div>
                      <img className='image-logo-bicta' src={logo} alt="logo" />
                    </div>
              </div>
                :
              
              }
            </div>  
   * 
   */

        return (
            <>{fillContent()}</>
        )
}

export default Bictacoras