const ProductCardWaypay = ({ID, checkButton,title, description, rating, imageUrl,Precio,toggleSelect ,selectedItems}) => {

    const  typy_buy =  [
        {   
            id:1,
            name:"Efectivo",
        },
        {
            id:2,
            name:"Consignaciones",
        },
        {   
            id:3,
            name:"Destino",
        },
        {   
            id:4,
            name:"Sitio Web",
        },
        {   
            id:5,
            name:"Payoneer",
        },
        {   
            id:6,
            name:"T.Debito",
        },
        {   
            id:7,
            name:"T.Credito",
        },
        {   
            id:8,
            name:"Hotel Beds",
        },
        {   
            id:9,
            name:"Despegar",
        },
        {   
            id:10,
            name:"Price Travel",
        },
        {   
            id:11,
            name:"Link de pago",
        },
        {   
            id:12,
            name:"Expedia",
        },
      ]
    /**
     * <div className="container-button-pay" >
                 <button className="pay-button" >
                     {checkButton  ?  "":"Pagar"}
                 </button>
             </div>
     */
     return (
       <div  className={"product-card"} >
       
         <div className="product-image">
           <img src={"https://raw.githubusercontent.com/rolandoto/image-pms/main/servicio.png"} alt={"skldnask"} />
         </div>
 
         <div className="product-detail-container" >
             <div className="product-details">
               <h2 className="product-title">Ocasiaonal</h2>
               <p className="product-description">Cantidad horas: 3</p>
               <p className="product-description">Precio: $95.000</p>
               <div className="product-rating"> </div>
             </div>
                <div className="container-button-pay" >
               
                <select   name="Tipo_forma_pago"
                         
                         className={`desde-detail-product-datail` }    >
                              <option></option>
                              {typy_buy?.map(category =>(
                                  <option 
                                  value={category.id}   
                                  key={category.id}>
                                  {category.name}
                              </option>
                              )
                              )}
                        </select>
                </div>
              
         </div> 
       </div>
     );
   };

export default ProductCardWaypay