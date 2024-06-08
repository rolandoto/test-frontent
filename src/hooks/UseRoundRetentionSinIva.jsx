
const UseRoundRetentionSinIva =({Price=0}) =>{

                function roundTo(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }

        // Función para redondear a cinco decimales
        const roundValue = (value) => {
            return Math.round(value * 100000) / 100000;
        }

// Función para calcular la retención y los valores necesarios
const calculateRetention = (cantidad, valorUnitario, descuento, porcentajeIVA, porcentajeRetefuente, valorProductoDeseado) => {
    // Cálculo del valor base
    let valorBase = roundTo(cantidad * valorUnitario - descuento, 2);

    // Cálculo del IVA
    let iva = roundTo((valorBase * porcentajeIVA) / 100, 2);

    // Cálculo del total del ítem
    let totalItem = roundTo(valorBase + iva, 2);

    // Ajuste para que coincida con el valor deseado (total neto)
    let totalDeseado = valorProductoDeseado;
    let factor = 1 + porcentajeIVA / 100 - porcentajeRetefuente;
    let subtotal = totalDeseado / factor;
    subtotal = roundTo(subtotal, 5);
    iva = roundTo(subtotal * porcentajeIVA / 100, 2);
    let retefuente = roundTo(subtotal * porcentajeRetefuente, 2);
    let total = roundTo(subtotal + iva - retefuente, 2);

    // Ajuste fino
    if (total !== totalDeseado) {
        let adjustment = (totalDeseado - total) / (1 + porcentajeIVA / 100 - porcentajeRetefuente);
        subtotal = roundTo(subtotal + adjustment, 5);
        iva = roundTo(subtotal * porcentajeIVA / 100, 2);
        retefuente = roundTo(subtotal * porcentajeRetefuente, 2);
        total = roundTo(subtotal + iva - retefuente, 2);
    }

    return { valorBase, iva, totalItem, retefuente, subtotal, total };
}

// Ejemplo de uso
const cantidad = 10;
const valorUnitario = 100;
const descuento = 50;
const porcentajeIVA = 19;
const porcentajeRetefuente = 0.035;
const valorProductoDeseado = Price;

const { valorBase, iva, totalItem, retefuente, subtotal, total } = calculateRetention(
    cantidad, valorUnitario, descuento, porcentajeIVA, porcentajeRetefuente, valorProductoDeseado
);
const subtotalDian = roundValue(subtotal);
const totalIva = roundValue(iva);
const totalRetentionDian = roundValue(retefuente);
const totalPay = roundValue(total);

return {subtotalDian,totalIva,totalRetentionDian,totalPay}
return {subtotalDian,totalIva,totalRetentionDian,totalPay}

}

export default UseRoundRetentionSinIva
