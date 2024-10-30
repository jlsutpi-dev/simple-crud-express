import { useState } from "react";
import { Menu } from "./Menus";

interface Prop {
  fetchMenus: () => Promise<void>;
}
const NewMenu = ({ fetchMenus }: Prop) => {
  const token = localStorage.getItem("token");
  const defaultMenu: Menu = {
    id: 0,
    name: "",
    price: 0,
    isAvailable: false,
  };
  const [newMenu, setNewMenu] = useState<Menu>(defaultMenu);

  const createMenuHandler = async () => {
    if (newMenu.name.trim() !== "" && newMenu.price >= 0) {
      await fetch("http://localhost:5000/menus", {
        method: "POST",
        // Content
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(newMenu),
      });
      console.log(newMenu);
      setNewMenu(defaultMenu);
      fetchMenus();
    } else {
      return alert("menu data is not valid");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <input
        style={{ padding: "10px 20px" }}
        onChange={(e) => {
          console.log(e.target.value);
          setNewMenu({ ...newMenu, name: e.target.value });
        }}
        value={newMenu.name}
        placeholder="name"
        type="text"
      />
      <input
        style={{ padding: "10px 20px" }}
        placeholder="price"
        value={newMenu.price}
        onChange={(e) => {
          console.log(e.target.value);
          setNewMenu({ ...newMenu, price: Number(e.target.value) });
        }}
        type="number"
      />
      <div>
        <label htmlFor="checkbox">is Available</label>
        <input
          placeholder="isAvailabe"
          checked={newMenu.isAvailable}
          onChange={() => {
            setNewMenu({ ...newMenu, isAvailable: !newMenu.isAvailable });
          }}
          type="checkbox"
        />
      </div>
      <button
        style={{ padding: "6px 20px", width: 100 }}
        onClick={createMenuHandler}
      >
        create
      </button>
    </div>
  );
};

export default NewMenu;
