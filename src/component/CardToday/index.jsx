import React from "react"

const CardToday =() =>{


    const options = { weekday: 'long' };
    const today = new Date().toLocaleDateString('es-ES', options);

    const optionsmontNumeri = { day: 'numeric' };
    const currentDateNumeriMonth = new Date().toLocaleDateString('es-ES', optionsmontNumeri);

    
    const optionsmontNumeriYears = { month: 'long' };
    const currentDateNumeriMonthYears= new Date().toLocaleDateString('es-ES', optionsmontNumeriYears);


    return ( <div className="flex-item-dashboard" style={{backgroundColor:"white" }}   >
                <li >
                    <div>
                        <li><h4 className="let-letra-dashboard absolute end-0	  top-10	 right-0	 left-0	 	 mx-auto flex items-center justify-center font-display text-5xl text-green-400"  >  {today}  </h4></li>
                        <li><h4 className="let-letra-dashboard-one absolute end-0	  top-20	 right-0	 left-0	 	 mx-auto flex items-center justify-center font-display text-5xl text-green-400"   >  {currentDateNumeriMonth}  </h4></li>
                        <li><h4 className="let-letra-dashboard absolute end-0	  top-40	 right-0	 left-0	 	 mx-auto flex items-center justify-center font-display text-5xl text-green-400"   >  {currentDateNumeriMonthYears}  </h4></li>
                    </div>
                </li>
            </div>
            )
    
}

export default CardToday