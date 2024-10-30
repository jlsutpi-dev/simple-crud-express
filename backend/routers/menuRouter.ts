import express from "express";
import fs from "fs";
import { Menu } from "..";
// const app = express( );
const MenuRouter = express.Router();
const getMenu = () => {
  const menusJsonStr = fs.readFileSync("menus.json", "utf-8");
  const menus = JSON.parse(menusJsonStr);
  return menus;
};

MenuRouter.get("/", (req, res) => {
  const exist = fs.existsSync("menus.json");
  if (!exist) return res.send("[]");
  const menus = getMenu();
  res.send(menus);
});

MenuRouter.get("/:menuId", (req, res) => {
  const { menuId } = req.params;
  console.log("menuId", menuId);
  const menus = JSON.parse(fs.readFileSync("menus.json", "utf-8")) as Menu[];
  const menu = menus.find((item) => {
    return item.id === Number(menuId);
  });
  console.log("menu", menu);

  res.send(menu);
});

MenuRouter.post("/", (req, res) => {
  const menu = req.body;
  const menuJsonStr = fs.readFileSync("menus.json", "utf-8");
  const menus: Menu[] = JSON.parse(menuJsonStr);
  if (menus.length === 0) {
    menu.id = menus.length + 1;
    menus.push(menu);
    fs.writeFileSync("menus.json", JSON.stringify(menus));
    res.end();
  } else {
    menu.id = menus[menus.length - 1].id + 1;
    menus.push(menu);
    fs.writeFileSync("menus.json", JSON.stringify(menus));
    res.end();
  }
});

MenuRouter.put("/", (req, res) => {
  const menus = JSON.parse(fs.readFileSync("menus.json", "utf8"));
  const menu = req.body;
  const UpdatedMenus = menus.map((item) => {
    return item.id === menu.id ? menu : item;
  });

  fs.writeFileSync("menus.json", JSON.stringify(UpdatedMenus));
  res.end();
});

MenuRouter.delete("/", (req, res) => {
  // console.log()
  const query = req.query;
  const menuId = Number(req.query.menuId);
  console.log(menuId);
  const menuStr = fs.readFileSync("menus.json", "utf-8");
  let menus = JSON.parse(menuStr) as Menu[];
  console.log(menus);
  console.log(menuId);
  menus = menus.filter((menu) => {
    return menu.id !== menuId;
  });
  fs.writeFileSync("menus.json", JSON.stringify(menus));

  // res.end(JSON.stringify(menus));
  res.end("DELETE");
});
export default MenuRouter;
