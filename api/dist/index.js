import express from "express";
import dotenv from 'dotenv';
import userRouter from "./routes/userRoutes.js";
dotenv.config();
const app = express();
app.use("/api/users", userRouter);
app.listen(8080, () => {
    console.log("API ONLINE");
});
//# sourceMappingURL=index.js.map