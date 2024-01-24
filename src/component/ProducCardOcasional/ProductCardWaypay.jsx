const ProductCardWaypay = ({ID, checkButton,title, description, rating, imageUrl,Precio,toggleSelect ,selectedItems}) => {

  
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
                </div>
         </div> 
       </div>
     );
   };

export default ProductCardWaypay