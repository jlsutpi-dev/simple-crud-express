import { useEffect, useState } from "react";
import Layout from "./Layout";
import MenuItem from "./MenuItem";
import NewMenu from "./NewMenu";
export interface Menu {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
}

const Menus = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  const token = localStorage.getItem("token") as string;
  const fetchMenus = async () => {
    const response = await fetch("http://localhost:5000/menus", {
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setMenus(data);
  };
  useEffect(() => {
    fetchMenus();
  }, []);
  return (
    <Layout>
      <div>
        <div>
          <button className="menu-button">Open Menu</button>

          <NewMenu fetchMenus={fetchMenus} />
        </div>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 30,
            flexWrap: "wrap",
          }}
        >
          {menus.map((menu) => {
            return (
              <MenuItem fetchMenus={fetchMenus} menu={menu} key={menu.id} />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Menus;
