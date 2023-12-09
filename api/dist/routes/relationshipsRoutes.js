import express from "express";
import { getRelationships, addRelationship, deleteRelationship, getAllRelationships } from "../controllers/relationshipControllers.js";
const router = express.Router();
router.get("/", getRelationships);
router.get("/:userId", getAllRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);
export default router;
//# sourceMappingURL=relationshipsRoutes.js.map