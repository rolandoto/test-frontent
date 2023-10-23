import HttpClient from "../HttpClient";
import { useAppDispatch } from "../hooks/redux";
import {
  setSearch,
  setError,
  loading,
} from "../reducers/searchUsersReducers";
import { toast } from "react-hot-toast";

const useSearchUser = () => {
  
  const dispatch = useAppDispatch();

      const postSearchUsers = async ({serchvalue, type}) => {
        console.log("hoal mundo nuievo")
        dispatch(loading());
        try {
          const postResponse = await HttpClient.PostSearchValue({serchvalue, type});
          if (postResponse) {
            toast.success("Huesped encontrado")
            dispatch(setSearch(postResponse));
          } else {
            dispatch(setError("post with wans found"));
            toast.error("Huesped no encontrado")
            dispatch(setSearch([]));
          }
        } catch (error) {
          dispatch(setError("Post with wasn found"));
          toast.error("Huesped no encontrado")
     
        }
      };

      return { postSearchUsers };
};

export default useSearchUser;
