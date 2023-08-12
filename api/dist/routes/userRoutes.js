import express from "express";
import { getUser, updateUser, getUserByName } from "../controllers/userControllers.js";
const router = express.Router();
router.get("/find/:userId", getUser);
router.get("/", getUserByName);
router.put("/", updateUser);
export default router;
//# sourceMappingURL=userRoutes.js.map