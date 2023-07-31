import express from "express";
import { getLikes, addLike, deleteLike } from "../controllers/likeControllers.js";
const router = express.Router();
router.get("/", getLikes);
router.post("/", addLike);
router.delete("/", deleteLike);
export default router;
//# sourceMappingURL=likeRoutes.js.map