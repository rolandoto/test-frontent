

const ProductCard = ({ID, checkButton,title, description, rating, imageUrl,Precio,toggleSelect ,selectedItems}) => {

    const ValuPrice = Precio.toLocaleString()
 
    /**
     * <div className="container-button-pay" >
                 <button className="pay-button" >
                     {checkButton  ?  "":"Pagar"}
                 </button>
             </div>
     */
     return (
       <div  className={selectedItems.includes(ID) ? "selected" : "product-card"} >
        {checkButton  ?   <input
               type="checkbox"
               className="checkbox-product"
               checked={selectedItems.includes(ID)}
               onChange={() => toggleSelect(ID)}
             /> : ""}
        
         <div className="product-image">
           <img src={imageUrl} alt={title} />
         </div>
 
         <div className="product-detail-container" >
             <div className="product-details">
               <h2 className="product-title">{title}</h2>
               <p className="product-description">{description}</p>
               <p className="product-description">Precio: ${ValuPrice}</p>
               <div className="product-rating"> </div>
             </div>

             {!checkButton  ? <div className="container-button-pay" >
                 <button className="pay-button" >
                    Pagado
                 </button>
                </div> :  
                <div className="container-button-pay" >
                <button className="pay-button-deuda" >
                   pendiente
                </button>
               </div>}
             
         </div> 
       </div>
     );
   };

export default ProductCard