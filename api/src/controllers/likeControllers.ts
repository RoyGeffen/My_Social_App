import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from "jsonwebtoken";
import { db } from "../connect.js";
import { TrackRecentActivity } from './userControllers.js';

type Like = {
    userid: number
}

export const getLikes = (req:Request,res:Response)=>{
    const q = "SELECT userid FROM likes WHERE postid = ?";

    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((like:Like)=>like.userid));
    });
}

export const addLike = (req:Request, res:Response) => {
  const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err: VerifyErrors | null , userInfo: any| undefined) => {
      if (err) return res.status(403).json("Token is not valid!");
      
      const q = "INSERT INTO likes (`userid`,`postid`) VALUES (?)"
      const values = [
        userInfo.id,
        req.body.postId
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
          TrackRecentActivity("likes","like",req, res, userInfo)
        return res.status(200).json(data);
      });
    });
};

export const deleteLike = (req:Request, res:Response) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err: VerifyErrors | null , userInfo: any| undefined) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM likes WHERE `userid` = ? AND `postid` = ?";

      db.query(q, [userInfo.id, req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
          TrackRecentActivity("likes","unlike",req, res, userInfo)
        return res.status(200).json("Post has been unliked.");
      });
    });
};