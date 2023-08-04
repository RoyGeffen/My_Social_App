import express from "express";
import { uploadPostImg } from "../controllers/uploadControllers.js";
import multer from "multer";
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage: storage });
router.post("/", upload.single("file"), uploadPostImg);
export default router;
//# sourceMappingURL=uploadRouters.js.map