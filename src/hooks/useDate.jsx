import React from "react";

const useDate =({fecha}) =>{

    const final = new Date(fecha);
    const futureDateone = final.getDate();
    final.setDate(futureDateone);
    const defaultValueone = final.toLocaleDateString('en-CA');

    return {defaultValueone}

}

export default useDate