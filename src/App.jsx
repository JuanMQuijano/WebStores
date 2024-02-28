import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LayoutPage from "./layout/LayoutPage"
import ServicePage from "./pages/ServicePage"
import LoginPage from "./pages/admin/LoginPage"
import RegisterPage from "./pages/admin/RegisterPage"
import AdminHome from "./pages/admin/HomePage";
import CotizacionPage from "./pages/admin/CotizacionPage"

function App() {

  return (
    <Routes>

      <Route path="/" element={<LayoutPage />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/servicio/:id" element={<ServicePage />}></Route>

        <Route path="/*" element={<HomePage />}></Route>
      </Route>

      <Route path="/admin" element={<LayoutPage />}>
        <Route path="/admin/" index element={<AdminHome />}></Route>
        <Route path="/admin/login" element={<LoginPage />}></Route>
        <Route path="/admin/register" element={<RegisterPage />}></Route>
        <Route path="/admin/cotizaciones" element={<CotizacionPage />}></Route>
      </Route>

    </Routes>
  )
}

export default App
