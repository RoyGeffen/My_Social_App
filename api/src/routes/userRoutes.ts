import express, { Router } from "express";

const router: Router = express.Router();

router.get("/test",(req,res)=>{
    res.send("holaaaaa")
})

export default router;