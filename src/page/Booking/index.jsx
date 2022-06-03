import React, { useEffect, useState }  from "react"
import { useDispatch, useSelector } from "react-redux"
import Pagination from "../../component/Post/Pagination"
import Post from "../../component/Post/Post"
import UseUsers from "../../hooks/UseUser"
import { getBooking } from "../../store/slice"
import moment  from "moment"

const Booking =() =>{

    const dispatch = useDispatch()
    const {jwt} = UseUsers()

    const t= moment().format();   
    let today = new Date(t)
    const day = today.toISOString().split('T')[0]
    
    const {booking,loading} = useSelector((state) => state.listBooking)
    const [products,setProducts] = useState("")


    const accordionNone  = booking.link?.filter(index => {
      let todayone =  new Date(index.endDate)
      const backday = todayone.toISOString().split('T')[0]
      if(backday >= day){
         return backday
      }
    })
   
    const pro = products ? products : accordionNone

    
    useEffect(() =>{
          dispatch(getBooking({id:jwt.result.id_hotel}))
    },[dispatch,setProducts])

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(50);
  
   
    const filtrar=(terminoBusqueda)=>{
      let resultadosBusqueda= accordionNone?.filter((elemento,index)=>{
          if(elemento.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ||elemento.id_booking?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
          return elemento;
          }
      });
      setProducts(resultadosBusqueda);
      }

      const [code,setCode] =useState("")
      const [name,setName] =useState("")
    

     
    
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = pro?.slice(indexOfFirstPost, indexOfLastPost);
      
      const paginate = pageNumber => setCurrentPage(pageNumber);

      
      const handSubmit =(e) =>{
          e.preventDefault()
          filtrar(name)
          filtrar(code)
      }
    
    

    if(!filtrar)  return null

    return (
        <div className="container-forgetfulnes" >
                <div className="App-Checking"   >
                    <form className='form-login' onSubmit={handSubmit} >
                        <input  
                            placeholder='Codigo'         
                            type='text'        
                            className='username' 
                            name="celular"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            />    
                        <input  
                            placeholder='Nombre'         
                            type='text'        
                            className='username'
                            name="fecha"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            /> 
                            <button className='button-login-checkin' type='submit' >Agregar busquedad</button>
                    </form>
                </div>
                <div>
                    <Post data={currentPosts} loading={loading}  />
                    {pro.length >10 &&  <Pagination 
                      postsPerPage={postsPerPage}
                      totalPosts={booking.link?.length}
                      paginate={paginate} />
                    }
                </div>
               
        </div>
          
    )
}

export default Booking