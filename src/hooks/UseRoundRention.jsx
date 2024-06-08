
const UseRoundRention =({Price=0}) =>{

        function roundTo(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }
        const RountValue =(round) =>{
          return  Math.round(round * 10000000) / 10000000;
        }
        
        const CalculateRetention =(ValorProduct) =>{
            let totalDeseado =ValorProduct
            let tasaIVA = 0.19;
            let tasaRetefuente = 0.035;
            let factor = 1 + tasaIVA - tasaRetefuente;
            let subtotal = totalDeseado / factor;
            subtotal = roundTo(subtotal, 6);
            let iva = subtotal * tasaIVA;
            iva = roundTo(iva, 6);
            let retefuente = subtotal * tasaRetefuente;
            retefuente = roundTo(retefuente, 6);
            let total = roundTo(subtotal + iva - retefuente, 6);
            if (total !== totalDeseado) {
                let adjustment = totalDeseado - total;
                subtotal += adjustment;
                iva = roundTo(subtotal * tasaIVA, 6);
                retefuente = roundTo(subtotal * tasaRetefuente, 6);
                total = roundTo(subtotal + iva - retefuente, 6);
            }
          return {subtotal,retefuente,total,iva}
        }
    
        const {subtotal,retefuente,total,iva} = CalculateRetention(Price)


    const SubtotalDian =RountValue(subtotal)
    const TotalIva = RountValue(iva)
    const TotalRetentionDian = RountValue(retefuente)
    const TotalPay = RountValue(total)
    

    return {SubtotalDian,TotalIva,TotalRetentionDian,TotalPay}
   
}

export default UseRoundRention

