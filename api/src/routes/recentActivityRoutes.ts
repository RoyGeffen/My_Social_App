import express from "express";
import {getUsersRecentActivity} from "../controllers/recentActivityControllers.js";

const router = express.Router()

router.get("/:userId", getUsersRecentActivity)

export default router