import express, {Express} from "express";
import dotenv from 'dotenv';
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js"
import authRouter from "./routes/authRoutes.js"
import likeRouter from "./routes/likeRoutes.js"
import storyRouter from "./routes/storyRoutes.js" //?????????????????????????????
import commentRouter from "./routes/commentRouts.js"
import postRouter from "./routes/postRoutes.js"
import relationshipsRouter from "./routes/relationshipsRoutes.js"

dotenv.config();
const app: Express = express();


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", JSON.stringify(true));
    next();
  });
const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(express.json());
app.use(cors(corsOptions))

app.use(cookieParser());
  
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../client/public/upload");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//     },
//   });
// const upload = multer({ storage: storage });


// app.post("/api/upload", upload.single("file"), (req, res) => {
//   const file: Express.Multer.File | undefined = req.file;
//   res.status(200).json(file?.filename);
// });


app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/relationships", relationshipsRouter);


app.listen(8080, ()=>{
    console.log("API ONLINE")
})
