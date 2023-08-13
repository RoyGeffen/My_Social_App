import express, { Router } from "express";
import { getUser , updateUser, getUserByName, getSuggestions} from "../controllers/userControllers.js";

const router: Router = express.Router();

router.get("/find/:userId", getUser)
router.get("/suggestion", getSuggestions)
router.get("/", getUserByName)
router.put("/", updateUser)

export default router;