import { db } from '../connect.js';
import jwt from "jsonwebtoken";
export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id=?";
    const websites_q = "SELECT * FROM social.links WHERE `userid` = ?";
    let sites;
    db.query(websites_q, [userId], (err, links) => {
        if (err)
            return res.status(500).json(err);
        sites = links[0];
    });
    db.query(q, [userId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        const { password, ...info } = data[0];
        return res.json({ ...info, websites: sites });
    });
};
export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(401).json("Not authenticated!");
    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err, userInfo) => {
        if (err)
            return res.status(403).json("Token is not valid!");
        const q = "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";
        db.query(q, [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.coverPic,
            req.body.profilePic,
            userInfo.id,
        ], (err, data) => {
            if (err)
                res.status(500).json(err);
            if (data.affectedRows > 0)
                return res.json("Updated!");
            return res.status(403).json("You can update only your post!");
        });
    });
};
//# sourceMappingURL=userControllers.js.map