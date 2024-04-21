import express from "express";
import path from "path";

import homeControl from "../controller/homeController.js";
import {
  getUserControl,
  addUserControl,
  updateUserControl,
  deleteUserControl
} from "../controller/userController.js";

const router = express.Router();
const __dirname = import.meta.dirname;

router.use(express.static(path.join(__dirname, "views")));

router.get("/", homeControl);

router.post("/usuario", addUserControl);

router.get("/usuarios", getUserControl);

router.put("/usuario", updateUserControl);

router.delete("/usuario", deleteUserControl);

router.post("/transferencia", (req, res) => {});

router.get("/transferencias", (req, res) => {});

export default router;
