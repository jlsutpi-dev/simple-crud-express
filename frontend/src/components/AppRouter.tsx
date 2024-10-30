import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addons from "./Addons";
import Login from "./Login";
import MenuCategory from "./MenuCategory";
import Menus from "./Menus";
import Order from "./Order";
import PrivateRoute from "./PrivateRoute";
import Register from "./Register";
import Setting from "./Setting";
import UpdateMenu from "./UpdateMenu";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Order />} />
          <Route path="/menu" element={<Menus />} />
          <Route path="/menu_category" element={<MenuCategory />} />
          <Route path="/addon" element={<Addons />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/menu/:menuId" element={<UpdateMenu />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
