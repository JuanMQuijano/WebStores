import { clienteAxio } from "../../src/axios/clienteAxios";
import { setCategorias, setLoading } from "../categorias/categoriasSlice";

export const getCategorias = () => {
  return async (dispatch) => {
    setLoading(true);

    try {
      const { data } = await clienteAxio.get("/categorias");

      dispatch(setCategorias(data));
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
};
