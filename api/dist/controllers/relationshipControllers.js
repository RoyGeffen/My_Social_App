import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getRelationships = (req, res) => {
    const q = "SELECT followerUserid FROM relationships WHERE followedUserid = (?)";
    db.query(q, [req.query.followedUserid], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data.map((relationship) => relationship.followerUserid));
    });
};
export const getAllRelationships = (req, res) => {
    const q = `SELECT followerUserid, followedUserid FROM relationships 
              WHERE followedUserid = (?) OR followerUserid = (?)`;
    db.query(q, [req.params.userId, req.params.userId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data.map((relationship) => relationship.followerUserid));
    });
};
export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(401).json("Not logged in!");
    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err, userInfo) => {
        if (err)
            return res.status(403).json("Token is not valid!");
        const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.userId
        ];
        db.query(q, [values], (err, data) => {
            if (err)
                return res.status(500).json(err);
            return res.status(200).json("Following");
        });
    });
};
export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(401).json("Not logged in!");
    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err, userInfo) => {
        if (err)
            return res.status(403).json("Token is not valid!");
        const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
        db.query(q, [userInfo.id, req.query.userId], (err, data) => {
            if (err)
                return res.status(500).json(err);
            return res.status(200).json("Unfollow");
        });
    });
};
//# sourceMappingURL=relationshipControllers.js.map