import express from "express";
import { getdrivers } from "../controllers/getdrivers";

const router = express.Router();
console.log("ddddd")
router.post("/getdriversinfo", getdrivers);

export default router;