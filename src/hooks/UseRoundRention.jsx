
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
    iva = roundTo(iva, 2);
    let retefuente = subtotal * tasaRetefuente;
    retefuente = roundTo(retefuente, 5);
    let total = roundTo(subtotal + iva - retefuente, 2);

    // Adjusting to match totalDeseado
    if (total !== totalDeseado) {
        const adjustment = totalDeseado - total;
        subtotal += adjustment / (1 + tasaIVA - tasaRetefuente);  // Proper adjustment factor
        subtotal = roundTo(subtotal, 5);
        iva = roundTo(subtotal * tasaIVA, 2);
        retefuente = roundTo(subtotal * tasaRetefuente, 5);
        total = roundTo(subtotal + iva - retefuente, 2);
    }

    return { subtotal, retefuente, total, iva };
}

// Ejemplo de uso
const { subtotal, retefuente, total, iva } = calculateRetention(Price);

const subtotalDian = roundValue(subtotal);
const totalIva = roundValue(iva);
const totalRetentionDian = roundValue(retefuente);
const totalPay = total;

  return {subtotalDian,totalIva,totalRetentionDian,totalPay}
   
}

export default UseRoundRention

