import { clienteAxio } from "../../src/axios/clienteAxios";
import { setCompras, setLoading } from "../compras/comprasSlide";

export const getCompras = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await clienteAxio.get("/compras");

      dispatch(setCompras(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};
