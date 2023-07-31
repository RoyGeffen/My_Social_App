import express, {Express} from "express";
import dotenv from 'dotenv';
import userRouter from "./routes/userRoutes.js"

dotenv.config();
const app: Express = express();


app.use("/api/users", userRouter)


app.listen(8080, ()=>{
    console.log("API ONLINE")
})
