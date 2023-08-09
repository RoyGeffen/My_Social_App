import express from "express";
import { getIsCookie } from "../controllers/cookieControllers.js";
const router = express.Router();
router.get("/tokenExists", getIsCookie);
export default router;
//# sourceMappingURL=cookieRoutes.js.map