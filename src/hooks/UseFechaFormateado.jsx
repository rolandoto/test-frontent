

const UseFechaFormateada =({fecha}) =>{

    const fechaOne = fecha;
    const fechaObjOne = new Date(fechaOne);
    const anioOne = fechaObjOne.getFullYear();
    const mesOne = fechaObjOne.getMonth() + 1; // sumamos 1 ya que los meses en JS empiezan en 0 (enero = 0)
    const diaOne = fechaObjOne.getDate();

    const fechaFormateadaHasta = `${anioOne}-${mesOne
      .toString()
      .padStart(2, "0")}-${diaOne.toString().padStart(2, "0")}`;

      return { fechaFormateadaHasta}

}

export default UseFechaFormateada