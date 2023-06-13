import HttpClient from "../HttpClient";
import { useAppDispatch } from "../hooks/redux";
import {
  setUpdate,
  loading,
  setError,
} from "../reducers/updateDatailPounterReducer";
import Swal from "sweetalert2";
import { useState } from "react";
import confetti from "canvas-confetti";

const useUpdateDetailPointerActions = () => {
  const dispatch = useAppDispatch();
  const [error, setErro] = useState(false);

  const postUpdateDetailPointer = async ({ id, Fecha_final }) => {
    dispatch(loading());
    try {
      const response = await HttpClient.postUpdatailPounter({
        id,
        Fecha_final,
      });
      if (response) {
        dispatch(setUpdate(response));
        confetti({
          zIndex: 999,
          particleCount: 100,
          spread: 70,
          origin: { x: 0.5, y: 0.8 },
        });
      }
    } catch (error) {
      dispatch(setError(true));
      setErro(true);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "<p>Error</p>",
        showConfirmButton: false,
        timer: 3000,
      });
      setErro(false);
    }
  };

  return {
    postUpdateDetailPointer,
    error,
  };
};

export default useUpdateDetailPointerActions;
