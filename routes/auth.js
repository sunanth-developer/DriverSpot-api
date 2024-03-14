import express from "express";
import { register, login, logout,driverregister, driverregister2, driverlogin } from "../controllers/auth.js";
import { getdrivers } from "../controllers/getdrivers.js";

const router = express.Router();
router.post("/register", register);
router.post("/driverregister", driverregister);
router.post("/driverregister2", driverregister2);
router.post("/login", login);
router.post("/driverlogin", driverlogin);
router.post("/logout", logout);
router.post("/getdrivers", getdrivers);
export default router;
