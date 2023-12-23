import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {useEffect, useState} from "react"
import { makeRequest } from "../../axios";
import "../rightBar/rightBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import moment from "moment"
import { User } from "../../types/customTypes";
import { useNavigate } from "react-router-dom";

type Activity = {
    createdAt: Date,
    userid:number,
    username:string,
    profilePic:string,
    type: "like" | "unlike" | "newPost" | "deletePost" | "newFollow" | "newComment" | "newStory"
}

const LatestActivity = () => {
    const {currentUser} = useContext(AuthContext)
    const [data, setData] = useState<[Activity]>();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchData();

        const intervalId = setInterval(() => {
          fetchData();
        }, 60000);
    
        return () => clearInterval(intervalId);
      }, []);

      const fetchData = ()=>{
        makeRequest.get(`/recentActivity/${currentUser?.id}`).then((res) => {
            setData(res.data);
          })
      }

      const ActivityDictionary = {
        "like" : "  has liked a post",
        "unlike" : "  has disliked a post",
        "newPost" : "  has uploaded a post!",
        "deletePost" : "  has Deleted a post",
        "newFollow" : "  now Follows a new person",
        "newComment": "  has commented on a post!",
        "newStory" : "  has uploaded a story!"
        }
    return(
      <div className="item">
        <span>Latest Activities</span>
        {data?.map((user:Activity)=>(
          <div className="user" key={new Date(user.createdAt).toISOString()}>
            <div className="userInfo" onClick={()=>navigate(`/profile/${user.userid}`)}>
                <img
                    src={user.profilePic}
                    alt=""
                />
                <p>
                    <span>{user.username}</span>{ActivityDictionary[user.type]}
                </p>
            </div>
            <span>{moment(user.createdAt).fromNow()}</span>
          </div>
        ))}
      </div>
    )

}

export default LatestActivity;