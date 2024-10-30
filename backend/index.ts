import fs from "fs";
import http from "http";
import { URL } from "url";
// fs.writeFileSync(
//   "menus.json",
//   JSON.stringify({
//     id: 1,
//     name: "shan khour swell",
//     price: 2400,
//     isAVAilable: true,
//   })
// );
export interface Menu {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
}
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from your React app origin

  res.setHeader("Access-Control-Allow-Methods", "*");
  const { url, method } = req;

  if (method === "GET") {
    if (url === "/") {
      const menus = fs.readFileSync("menus.json", "utf8");
      res.end(menus);
    } else {
      const newUrl = new URL(url, `http://${req.headers.host}`);
      console.log(newUrl);
      const menuId = Number(newUrl.searchParams.get("menuId"));
      const menuStr = fs.readFileSync("menus.json", "utf-8");
      const menus = JSON.parse(menuStr) as Menu[];
      console.log(menus);
      console.log(menuId);
      const menu = menus.find((menu) => {
        return menu.id === menuId;
      });
      console.log(menu);
      res.end(JSON.stringify(menu));
    }
  } else if (method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      console.log("chunk", chunk);
      data += chunk;
    });
    req.on("end", () => {
      const menus = JSON.parse(fs.readFileSync("menus.json", "utf8"));
      const menu = JSON.parse(data);
      menu.id = menus.length + 1;
      menus.push(menu);
      fs.writeFileSync("menus.json", JSON.stringify(menus));
    });
    const menus = fs.readFileSync("menus.json", "utf8");
    res.end(menus);
  }
  // res.end("DELETE");
  else if (method === "PUT") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      const menus = JSON.parse(fs.readFileSync("menus.json", "utf8")) as Menu[];
      const menu = JSON.parse(data);
      console.log(menu);
      const updateMenus = menus.map((menuItem) => {
        return menuItem.id === menu.id ? menu : menuItem;
      });
      console.log("menus", updateMenus);

      // menus.push(menu);
      fs.writeFileSync("menus.json", JSON.stringify(updateMenus));
    });
    const menus = fs.readFileSync("menus.json", "utf8");

    res.end(menus);
  } else if (method === "DELETE") {
    const newUrl = new URL(url, `http://${req.headers.host}`);
    console.log(newUrl);
    const menuId = Number(newUrl.searchParams.get("menuId"));
    const menuStr = fs.readFileSync("menus.json", "utf-8");
    let menus = JSON.parse(menuStr) as Menu[];
    console.log(menus);
    console.log(menuId);
    menus = menus.filter((menu) => {
      return menu.id !== menuId;
    });
    fs.writeFileSync("menus.json", JSON.stringify(menus));

    // res.end(JSON.stringify(menus));
    res.end("deleted");
  } else res.end("hello");
});
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`server started listening on ${PORT}`);
});
