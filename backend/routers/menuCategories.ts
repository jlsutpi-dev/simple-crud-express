import express from "express";
// const app = express( );
const MenuCategories = express.Router();

MenuCategories.get("/", (req, res) => {
  res.end("HELLO Menu-category");
});
MenuCategories.post("/", (req, res) => {});
MenuCategories.put("/", (req, res) => {});
MenuCategories.delete("/", (req, res) => {});
export default MenuCategories;
