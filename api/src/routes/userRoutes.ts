import express, { Router } from "express";
import { getUser , updateUser} from "../controllers/userControllers.js";

const router: Router = express.Router();

router.get("/find/:userId", getUser)
router.put("/", updateUser)

export default router;