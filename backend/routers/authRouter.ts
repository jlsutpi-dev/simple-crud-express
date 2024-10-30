import bcrypt from "bcryptjs";
import express from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
interface RegisterUser {
  id: number;
  name: string;
  email: string;
  password: string;
}
const authRouter = express.Router();
export const authSecret = "NAWRAM";

authRouter.post("/register", (req, res) => {
  const user: RegisterUser = req.body;
  const { email, name, password } = user;

  const isValid =
    email.trim() !== "" && name.trim() !== "" && password.trim() !== "";
  if (!isValid) return res.status(400).send("Bad Request not include data");

  const exist = fs.existsSync("users.json");
  if (!exist) {
    fs.writeFileSync("users.json", JSON.stringify([]));
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  user.password = hash;
  const users = JSON.parse(
    fs.readFileSync("users.json", "utf-8")
  ) as RegisterUser[];
  const existUser = users.find((item) => item.email === user.email);
  if (existUser) {
    return res.status(400).send("Bad request");
  }
  user.id = users.length + 1;
  user.password = hash;
  users.push(user);
  fs.writeFileSync("users.json", JSON.stringify(users));

  res.send({ registerData: "OK" });
});

authRouter.post("/login", (req, res) => {
  const { email, password }: RegisterUser = req.body;

  const isValid = email.trim() !== "" && password.trim() !== "";
  if (!isValid) return res.status(400).send("Bad Request");

  const exist = fs.existsSync("users.json");

  if (!exist) {
    return res.status(500).end();
  }
  const users = JSON.parse(
    fs.readFileSync("users.json", "utf-8")
  ) as RegisterUser[];

  const user = users.find((item) => item.email === email);

  if (!user) return res.status(404).send("not found");

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (passwordMatch) {
    const token = jwt.sign({ email }, authSecret);
    res.send({ token });
  } else {
    res.status(404).send("password not match");
  }

  console.log("user", email, password);

  res.end();
});
export default authRouter;
