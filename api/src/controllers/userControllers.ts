import { Request, Response, NextFunction } from 'express';
import { db } from '../connect.js';
import jwt, { VerifyErrors } from "jsonwebtoken";



export const getUser = (req: Request, res: Response) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id=?";
    const websites_q = "SELECT * FROM social.links WHERE `userid` = ?";
    let sites: any;
    db.query(websites_q, [userId], (err, links) => {
      if (err) return res.status(500).json(err);
      sites = links[0];
    });
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      const { password, ...info } = data[0];
      return res.json({...info, websites: sites});
    });
};

export const updateUser = (req: Request, res: Response) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");
    let affectedRows = 0;
    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err: VerifyErrors | null , userInfo: any| undefined) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "UPDATE users SET `name`=?,`username`=?,`email`=?,`city`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";
      const sites_q =
        "UPDATE links SET `facebook`=?,`instagram`=?,`linkedIn`=?,`twitter`=?,`pinterest`=? WHERE userid=? ";
      
      db.query(
          sites_q,
          [
            req.body.websites.facebook,
            req.body.websites.instagram,
            req.body.websites.linkedIn,
            req.body.websites.twitter,
            req.body.websites.pinterest,
            userInfo.id,
          ],
          (err, data) => {
            if (err) res.status(500).json(err);
            affectedRows+= data.affectedRows
          }
        );
  
      db.query(
        q,
        [
          req.body.name,
          req.body.username,
          req.body.email,
          req.body.city,
          req.body.profilePic,
          req.body.coverPic,
          userInfo.id,
        ],
        (err, data) => {
          if (err) res.status(500).json(err);
          affectedRows += data.affectedRows
          if (affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("You can update only your post!");
        }
      );
    });
};