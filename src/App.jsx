import { Route, Routes } from "react-router-dom"
import PageLayout from "./layout/PageLayout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AdminHome from "./pages/admin/HomePage";
import CartPage from "./pages/CartPage"
import RegisterAdminPage from "./pages/admin/RegisterAdminPage"
import PedidosPage from "./pages/admin/PedidosPage"
import SearchPage from "./pages/SearchPage"
import CategoriasPage from "./pages/admin/CategoriasPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route path="/" index element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/products/:name" element={<SearchPage />}></Route>
      </Route>

      <Route path="/admin" element={<PageLayout />}>
        <Route path="/admin/" index element={<AdminHome />}></Route>
        <Route path="/admin/categorias" index element={<CategoriasPage />}></Route>
        <Route path="/admin/create/account" element={<RegisterAdminPage />}></Route>
        <Route path="/admin/pedidos" element={<PedidosPage />}></Route>
      </Route>

    </Routes>
  )
}

export default App
