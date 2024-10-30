import { Link } from "react-router-dom";
import { Menu } from "./Menus";

interface Prop {
  menu: Menu;
  fetchMenus: () => Promise<void>;
}
const MenuItem = ({ menu, fetchMenus }: Prop) => {
  const token = localStorage.getItem("token");
  const deleteBtnHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const response = await fetch(
      `http://localhost:5000/menus?menuId=${menu.id}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) {
      fetchMenus(); // Refresh menus after successful delete
    } else {
      console.error("Error deleting menu:", await response.text());
    }
  };

  return (
    <div className="menu-card">
      <Link to={`/menu/${menu.id}`}>
        <div>
          <p>{menu.name}</p>
          <p>{menu.price}</p>
          <p> {menu.isAvailable ? "available" : ""}</p>
        </div>
      </Link>
      <div>
        <button onClick={deleteBtnHandler} style={{ padding: "8px 20px" }}>
          delete
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
