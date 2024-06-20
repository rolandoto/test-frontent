const UseAroundIpoconsumo =({Price=0}) =>{

    function roundTo(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }
    const RountValue =(round) =>{
      return  Math.round(round * 100000) / 100000;
    }

    const validIva =0.08 

    const CalculateRetention =(ValorProduct) =>{
        let totalDeseado =ValorProduct
        let tasaIVA = validIva
        let tasaRetefuente = 0.00;
        let factor = 1 + tasaIVA - tasaRetefuente;
        let subtotal = totalDeseado / factor;
        subtotal = roundTo(subtotal, 5);
        let iva = subtotal * tasaIVA;
        iva = roundTo(iva, 2);
        let retefuente = subtotal * tasaRetefuente;
        retefuente = roundTo(retefuente, 2);
        let total = roundTo(subtotal + iva - retefuente, 2);
        if (total !== totalDeseado) {
            let adjustment = totalDeseado - total;
            subtotal += adjustment;
            iva = roundTo(subtotal * tasaIVA, 2);
            retefuente = roundTo(subtotal * tasaRetefuente, 2);
            total = roundTo(subtotal + iva - retefuente, 2);
        }
      return {subtotal,retefuente,total,iva}
    }

    const {subtotal,retefuente,total,iva} = CalculateRetention(Price)

    const SubtotalDianIpoconsumo =RountValue(subtotal)
    const TotalIvaIpoconsumo = RountValue(iva)
    const TotalRetentionDianIpoconsumo = RountValue(retefuente)
    const TotalPayipoconsumo = RountValue(total)


    return {SubtotalDianIpoconsumo,
            TotalIvaIpoconsumo,
            TotalRetentionDianIpoconsumo,
            TotalPayipoconsumo}

}

export default UseAroundIpoconsumo
