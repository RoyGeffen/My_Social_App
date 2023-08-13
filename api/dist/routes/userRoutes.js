import express from "express";
import { getUser, updateUser, getUserByName, getSuggestions } from "../controllers/userControllers.js";
const router = express.Router();
router.get("/find/:userId", getUser);
router.get("/suggestion", getSuggestions);
router.get("/", getUserByName);
router.put("/", updateUser);
export default router;
//# sourceMappingURL=userRoutes.js.map