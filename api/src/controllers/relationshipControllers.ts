import { Request, Response, NextFunction } from 'express';
import { db } from "../connect.js";
import jwt, { VerifyErrors } from "jsonwebtoken";


export const getRelationships = (req: Request, res: Response)=>{

    const q = "SELECT followerUserid FROM relationships WHERE followedUserid = (?)";

    db.query(q, [req.query.followedUserid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((relationship:{followerUserid: number}) =>relationship.followerUserid));
    });
}

export const addRelationship = (req: Request, res: Response) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err: VerifyErrors | null , userInfo: any| undefined) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
      const values = [
        userInfo.id,
        req.body.userId
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Following");
      });
    });
  };

export const deleteRelationship = (req: Request, res: Response) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err: VerifyErrors | null , userInfo: any| undefined) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
  
      db.query(q, [userInfo.id, req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Unfollow");
      });
    });
  };