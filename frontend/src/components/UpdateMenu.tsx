import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import { Menu } from "./Menus"; // Adjust the import based on your project structure

const UpdateMenu = () => {
  const [menuUpdate, setMenu] = useState<Menu>({
    id: 0,
    name: "",
    price: 0,
    isAvailable: false,
  });
  const token = localStorage.getItem("token");
  const { menuId } = useParams();
  const navigate = useNavigate();
  const fetchMenuById = async () => {
    const response = await fetch(`http://localhost:5000/menus/${menuId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const menu = await response.json();
    setMenu(menu);

    if (menu) {
      setMenu(menu);
    }
    console.log(menu);
  };
  useEffect(() => {
    fetchMenuById();
  }, []);

  const updateMenuHandler = async () => {
    const response = await fetch(`http://localhost:5000/menus`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuUpdate),
    });
    navigate("/menu");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div
        className="menu-update-div"
        style={{
          width: 400,
          borderRadius: "20px",
          paddingLeft: 40,
          paddingTop: 20,
        }}
      >
        <div>
          <h4 style={{ marginBottom: 20 }}>Menu Update</h4>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <label htmlFor="">Name :</label>
          <input
            style={{ borderRadius: 8, padding: "10px 20px" }}
            type="text"
            value={menuUpdate.name}
            onChange={(e) => {
              setMenu({ ...menuUpdate, name: e.target.value });
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <label htmlFor="">Price :</label>
          <input
            style={{ borderRadius: 8, padding: "10px 20px" }}
            type="number"
            value={menuUpdate.price}
            onChange={(e) => {
              setMenu({ ...menuUpdate, price: Number(e.target.value) });
            }}
          />
        </div>
        <div>
          <label htmlFor="">Is Available</label>
          <input
            type="checkbox"
            placeholder=""
            checked={menuUpdate.isAvailable}
            onChange={(e) => {
              setMenu({ ...menuUpdate, isAvailable: !menuUpdate.isAvailable });
            }}
          />
        </div>

        <button
          onClick={() => {
            updateMenuHandler();
          }}
          style={styles.button}
        >
          update
        </button>
      </div>
    </div>
  );
};

export default UpdateMenu;

const styles = {
  button: {
    padding: "10px 20px",
    width: "fit-content",
    margin: "30px 0px",
    backgroundColor: "#4CAF50", // Green background color
    color: "white", // White text color
    border: "none", // Remove border
    borderRadius: "5px", // Rounded corners
    cursor: "pointer", // Pointer cursor on hover
    fontSize: "16px", // Increase font size
    fontWeight: "bold", // Bold text
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    transition: "background-color 0.3s, transform 0.3s", // Smooth transitions
  },
  buttonHover: {
    backgroundColor: "#45a049", // Darker green on hover
    transform: "scale(1.05)", // Slightly increase size on hover
  },
};
