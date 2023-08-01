import { Request, Response, NextFunction } from 'express';
import { db } from '../connect.js';
import jwt, { VerifyErrors } from "jsonwebtoken";


export const getPosts = (req: Request, res: Response) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err: VerifyErrors | null , userInfo: any| undefined) => {
      if (err) return res.status(403).json("Token is not valid!");
  
  
      const q =
        userId == "undefined"
          ? `SELECT p.*, u.id AS userid, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid) WHERE p.userid = ? ORDER BY p.createdAt DESC`
          : `SELECT p.*, u.id AS userid, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid)
      LEFT JOIN relationships AS r ON (p.userid = r.followedUserid) WHERE r.followerUserid= ? OR p.userid =?
      ORDER BY p.createdAt DESC`;

      const values =
        userId == "undefined" ? [userId] : [userInfo.id, userInfo.id];

      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
};

export const addPost = (req: Request, res: Response) => {

};
export const deletePost = (req: Request, res: Response) => {

};