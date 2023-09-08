import toast from 'react-hot-toast';
import HttpClient from "../HttpClient";
import { useAppDispatch } from "../hooks/redux";
import { setTarifasReservation,loading, setError } from "../reducers/apiPostTarifasReservation"


const useTarifasReservationActions =() =>{

    const dispatch = useAppDispatch();

    const saveSettings = async (settings) => {
        // Simula una promesa de guardado
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (settings) {
              resolve();
            } else {
              reject();
            }
          }, 2000);
        });
      };
    
    const PostTarifasReservationById = async({id_user,id_hotel,valor,Description,Fecha,ID_reservation,name_reservation,codigo_reserva,noches,Abono}) => {
        console.log("rolando")
        dispatch(loading())
        try {
            const postReservation =  await HttpClient.postTarifaReservation({
                id_user,
                id_hotel,
                valor,
                Description,
                Fecha,
                ID_reservation,
                name_reservation,
                codigo_reserva,
                noches,
                Abono})
                toast.promise(
                    saveSettings(postReservation),
                     {
                       loading: 'Guardando...',
                       success: <b>Solicitud enviada!</b>,
                       error: <b>Error al Guardar</b>,
                     }
                   );
            if(postReservation){
                
                dispatch(setTarifasReservation(postReservation))
            }else{
                setError("NO FOUND")
                console.log("error of solicitud")
            }

        } catch (error) {
            setError("NO FOUND")
            toast.error("Error el enviar solicitud ")
        }
    }


    return {
        PostTarifasReservationById
    }
}

    export default useTarifasReservationActions