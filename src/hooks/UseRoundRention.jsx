
const UseRoundRention =({Price=0}) =>{

   function roundTo(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const roundValue = (value) => {
    return Math.round(value * 100) / 100;
}

const calculateRetention = (valorProduct) => {
    const totalDeseado = valorProduct;
    const tasaIVA = 0.19;
    const tasaRetefuente = 0.035;
    const factor = 1 + tasaIVA - tasaRetefuente;
    let subtotal = totalDeseado / factor;
    subtotal = roundTo(subtotal, 5);
    let iva = subtotal * tasaIVA;
    iva = roundTo(iva, 2);  // Redondear a dos decimales para IVA
    let retefuente = subtotal * tasaRetefuente;
    retefuente = roundTo(retefuente, 5);
    let total = roundTo(subtotal + iva - retefuente, 2);  // Redondear a dos decimales para el total

    // Ajuste para que coincida con el totalDeseado
    if (total !== totalDeseado) {
        const adjustment = totalDeseado - total;
        subtotal += adjustment / (1 + tasaIVA - tasaRetefuente);  // Ajuste con el factor correcto
        subtotal = roundTo(subtotal, 5);
        iva = roundTo(subtotal * tasaIVA, 2);
        retefuente = roundTo(subtotal * tasaRetefuente, 5);
        total = roundTo(subtotal + iva - retefuente, 2);
    }

    return { subtotal, retefuente, total, iva };
}

// Ejemplo de uso

const { subtotal, retefuente, total, iva } = calculateRetention(Price);

    const SubtotalDian =RountValue(subtotal)
    const TotalIva = RountValue(iva)
    const TotalRetentionDian = RountValue(retefuente)
    const TotalPay = RountValue(total)
    

    return {SubtotalDian,TotalIva,TotalRetentionDian,TotalPay}
   
}

export default UseRoundRention

