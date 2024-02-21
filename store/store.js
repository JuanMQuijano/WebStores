import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { productsSlice } from "./products/productsSlice";
import { cartSlice } from "./cart/cartSlice";
import { comprasSlice } from "./compras/comprasSlide";
import { categoriasSlice } from "./categorias/categoriasSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    compras: comprasSlice.reducer,
    categorias: categoriasSlice.reducer,
  },
});
