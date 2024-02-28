import { clienteAxio } from "../../src/axios/clienteAxios";
import { setCotizaciones, setLoading } from "../cotizaciones/cotizacionesSlice";

export const getCotizaciones = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await clienteAxio.get("/cotizacion");

      dispatch(setCotizaciones(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};
