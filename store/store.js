import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { productsSlice } from "./products/productsSlice";
import { cartSlice } from "./cart/cartSlice";
import { cotizacionesSlice } from "./cotizaciones/cotizacionesSlice";
import { categoriasSlice } from "./categorias/categoriasSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    cotizaciones: cotizacionesSlice.reducer,
    categorias: categoriasSlice.reducer,
  },
});
