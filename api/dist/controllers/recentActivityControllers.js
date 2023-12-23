import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getUsersRecentActivity = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(401).json("Not logged in!");
    jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err, userInfo) => {
        if (err)
            return res.status(403).json("Token is not valid!");
        const q = `
        SELECT ra.userid, ra.createdAt, ra.type, u.id,u.username,u.profilePic
        FROM social.recentactivity ra
        JOIN users u ON ra.userid = u.id
        WHERE ra.userid IN (
          SELECT followedUserid
          FROM social.relationships
          WHERE followerUserid = (?)
        )
        ORDER BY ra.createdAt DESC
        LIMIT 5;
      `;
        db.query(q, [req.params.userId], (err, data) => {
            if (err)
                return res.status(500).json(err);
            return res.json(data);
        });
    });
};
// export const getUsersRecentActivity = (req: Request, res: Response)=>{
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Not logged in!");
//   jwt.verify(token, JSON.stringify(process.env.SECRET_KET), (err: VerifyErrors | null , userInfo: any| undefined) => {
//     if (err) return res.status(403).json("Token is not valid!");
//       const q = `SELECT followedUserid FROM social.relationships WHERE followerUserid = (?)`;
//       let userids:number[] = []
//       db.query(q, [req.params.userId], (err, data) => {
//         if (err) return res.status(500).json(err);
//          userids = data.map((entry: { followedUserid: number }) => entry.followedUserid);
//          if(!userids[0]) userids=[0];
//           const recent_q = 
//             `SELECT userid,createdAt,type 
//             FROM social.recentactivity 
//             WHERE userid IN (?) 
//             ORDER BY createdAt DESC LIMIT 5;`
//           db.query(recent_q, [userids], (err, data2) => {
//             if (err) return res.status(500).json(err);
//             return res.json(data2);
//           });
//       });
//   });
// }
//# sourceMappingURL=recentActivityControllers.js.map