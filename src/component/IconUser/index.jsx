import React from "react"

const IconsUser =({Username}) =>{

    return ( <div class="w-[98%] mx-auto mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="h-20 bg-gradient-to-r  to-sky-500 from-blue-700"></div>
                <div class="flex items-center p-6 -mt-14">
                    <img src="https://cloudbeds-fcfc.kxcdn.com/wp-content/uploads/2023/04/cloudbeds-support-service-93.webp" alt="Profile Picture" className="w-20 h-20 rounded-full border-4 border-white mr-4" />
                    <div>
                        <div class="text-xl font-medium text-white">Recepcionista</div>
                        <p class="text-xl font-medium text-black">{Username}</p>
                    </div>
                </div>          
            </div>)

}

export default IconsUser