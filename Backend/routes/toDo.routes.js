import { createToDo, getTODO, updateTODO, deleteTODO } from "../controllers/toDoController.js";
import express from "express";
import verifyToken from "../middleware/userMiddleware.js";
const router = express.Router()

router.post("/create", verifyToken, createToDo);
router.get("/get", verifyToken, getTODO);
router.put("/update/:id", verifyToken, updateTODO)
router.delete("/delete/:id", verifyToken, deleteTODO)

export default router