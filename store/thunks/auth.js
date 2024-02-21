import { clienteAxio } from "../../src/axios/clienteAxios";
import { onAuth, setLoading } from "../auth/authSlice";

export const validarLogin = (token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await clienteAxio.get("/users/auth", {
        headers: {
          "x-token": token,
        },
      });

      dispatch(onAuth(data));
    } catch (error) {
      console.log(error?.response);
    }
    dispatch(setLoading(false));
  };
};
