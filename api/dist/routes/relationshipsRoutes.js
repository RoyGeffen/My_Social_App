import express from "express";
import { getRelationships, addRelationship, deleteRelationship, getAllRelationships, getAllFollowedUsers } from "../controllers/relationshipControllers.js";
const router = express.Router();
router.get("/", getRelationships);
router.get("/followed", getAllFollowedUsers);
router.get("/:userId", getAllRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);
export default router;
//# sourceMappingURL=relationshipsRoutes.js.map