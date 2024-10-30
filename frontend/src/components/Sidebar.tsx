import { Link } from "react-router-dom";
import ".././App.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link className="sidebar-item" to={"/"}>
        Order
      </Link>
      <Link className="sidebar-item" to={"/menu"}>
        Menu
      </Link>
      <Link className="sidebar-item" to={"/menu_category"}>
        Menu Category
      </Link>
      <Link className="sidebar-item" to={"/setting"}>
        Setting
      </Link>
    </div>
  );
};

export default Sidebar;
