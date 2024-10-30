import { Outlet } from "react-router-dom";
import Login from "./Login";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return <>{token ? <Outlet /> : <Login />}</>;
};

export default PrivateRoute;
