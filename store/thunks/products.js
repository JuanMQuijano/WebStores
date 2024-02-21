import { clienteAxio } from "../../src/axios/clienteAxios";
import EMPRESA_ID from "../../src/constant/EMPRESA_ID";
import { setLoading, setProduct, setProducts } from "../products/productsSlice";

export const getProducts = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await clienteAxio.get(`/products/${EMPRESA_ID}`);

      dispatch(setProducts(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await clienteAxio.get(`/products/${id}`, {
        headers: {
          "x-token": localStorage.getItem("token-muevelo"),
        },
      });

      dispatch(setProduct(data));

      setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchProducts = (name) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await clienteAxio.get(`/products/get/${name}`);
      dispatch(setProducts(data));

      setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
    } catch (error) {
      console.log(error?.response);
    }
  };
};
