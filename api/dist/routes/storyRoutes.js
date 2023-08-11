import express from "express";
import { getStoriesByUserId, addStory, deleteStory } from "../controllers/storyControllers.js";
const router = express.Router();
router.get("/", getStoriesByUserId);
router.post("/", addStory);
router.delete("/:id", deleteStory);
export default router;
//# sourceMappingURL=storyRoutes.js.map