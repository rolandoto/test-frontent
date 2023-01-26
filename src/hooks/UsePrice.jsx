

const UsePrice =({number}) =>{

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',  
        currency: 'COP',
        minimumFractionDigits: 0
      })

    let price = formatter.format(number)

    return {price}

}

export default UsePrice