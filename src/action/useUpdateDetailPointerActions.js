import HttpClient from "../HttpClient";
import { useAppDispatch } from "../hooks/redux";
import {
  setUpdate,
  loading,
  setError,
} from "../reducers/updateDatailPounterReducer";
import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateDetailPointerActions = () => {
  const dispatch = useAppDispatch();
  const [error, setErro] = useState(false);

  const postUpdateDetailPointer = async ({ id, Fecha_final, countSeguro,type }) => {
    dispatch(loading());
    try {
      const response = await HttpClient.postUpdatailPounter({
        id,
        Fecha_final,
        countSeguro,
        type
      });
      if (response) {
        dispatch(setUpdate(response));
        toast.success("se ha cambiar la habitacion")
      }else{
        setError("Error")
      }
    } catch (error) {
      toast.error("Ha ocurrido un error")
      setError("Error")
    }
  };

  return {
    postUpdateDetailPointer,
    error,
  };
};

export default useUpdateDetailPointerActions;
