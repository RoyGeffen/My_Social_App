import { Request, Response, NextFunction } from 'express';
import { db } from '../connect.js';
import jwt, { VerifyErrors } from "jsonwebtoken";

export const getUserByName = (req: Request, res: Response) => {
  const searchStr = req.query.str;
  const q = "SELECT id, username, profilePic FROM users WHERE `username` LIKE ? OR `name` LIKE ? OR `email` LIKE ? OR `id`=?";
  const qStr = `${searchStr}%`
  db.query(q, [qStr,qStr,qStr,searchStr], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

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
          if (affectedRows > 0){
            TrackRecentActivity("users","updateProfile",req,res,userInfo)
            return res.json("Updated!");
          } 
          return res.status(403).json("You can update only your post!");
        }
      );
    });
};

export const getSuggestions  = (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err: VerifyErrors | null , userInfo: any| undefined) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT DISTINCT rff.followedUserid AS friend_of_friend_id, rff.id AS relationshipId, uff.*
    FROM users AS u
    JOIN relationships AS rf ON u.id = rf.followerUserid
    JOIN relationships AS rff ON rf.followedUserid = rff.followerUserid
    JOIN users AS uff ON rff.followedUserid = uff.id
    WHERE u.id = ?
        AND rff.followedUserid != ?
        AND rff.followedUserid NOT IN (SELECT followedUserid FROM relationships WHERE followerUserid = ?)
        LIMIT 4`



    db.query(q, [userInfo.id,userInfo.id,userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  })
};

export const TrackRecentActivity = (tableName:string, action:string, req:Request, res:Response, userInfo: any| undefined)=>{
  var final_id:number = -1;
  const id_q = `SELECT MAX(id) AS max_id FROM social.${tableName}`
  const recent = "INSERT INTO recentactivity (`userid`,`type`,`createdAt`,`foreignid`) VALUES (?)"

  db.query(id_q, (err, res1) => {
    if (err) return res.status(500).json(err);
    final_id = res1[0].max_id

    const recentvalues = [
      userInfo.id,
      action,
      new Date().toISOString().slice(0, 19).replace('T', ' '),
      final_id
      ]      
    db.query(recent, [recentvalues], (err,data) => {
        if (err) console.log(err);
      });
  })
}
