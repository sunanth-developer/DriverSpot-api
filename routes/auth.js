import express from "express";
import { register, login, logout, merchantregister, merchantlogin,driverregister } from "../controllers/auth.js";
import { getdrivers } from "../controllers/getdrivers.js";

const router = express.Router();
router.post("/register", register);
router.post("/driverregister", driverregister);
router.post("/login", login);
router.post("/logout", logout);
router.post("/getdrivers", getdrivers);
export default router;
