import { db } from "../connect.js";
import jwt, { VerifyErrors } from "jsonwebtoken";
import moment from "moment";
import { Request, Response, NextFunction } from 'express';

export const getStoriesByUserId = (req: Request, res: Response) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err: VerifyErrors | null , userInfo: any| undefined) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = `SELECT s.*, username FROM stories AS s JOIN users AS u ON (u.id = s.userid)
        LEFT JOIN relationships AS r ON (s.userid = r.followedUserid AND r.followerUserid= ?) LIMIT 4`;

        db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
        });
    });
};

export const addStory = (req: Request, res: Response) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err: VerifyErrors | null , userInfo: any| undefined) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO stories(`img`, `createdAt`, `userid`) VALUES (?)";
      const values = [
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Story has been created.");
      });
    });
};

export const deleteStory = (req: Request, res: Response) => {

};

