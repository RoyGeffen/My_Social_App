import "./profile.scss";
import React, { useEffect } from 'react';
import { User } from "../../types/customTypes";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Update from "../../components/update/Update.js";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const location = useLocation();
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery<boolean, any, User>(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  useEffect(() => {
    queryClient.invalidateQueries(["user"]);
  }, []);

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserid=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following:boolean) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser?.id));
  };
  
  console.log(data);
  console.log(relationshipData);
  return (
    <div className="profile">
      {isLoading? "Loading...":
      <><div className="images">
        <img
          src= {data?.coverPic || "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
          alt=""
          className="cover"
        />
        <img
          src={data?.profilePic || "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href={(data && data.websites && data.websites.facebook) ? data.websites.facebook : "http://facebook.com"} target="_blank" rel="noopener noreferrer">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href={(data && data.websites && data.websites.instagram) ? data.websites.instagram : "https://www.instagram.com"} target="_blank" rel="noopener noreferrer">
              <InstagramIcon fontSize="large" />
            </a>
            <a href={(data && data.websites && data.websites.twitter) ? data.websites.twitter : "https://twitter.com/home"} target="_blank" rel="noopener noreferrer">
              <TwitterIcon fontSize="large" />
            </a>
            <a href={(data && data.websites && data.websites.linkedIn) ? data.websites.linkedIn : "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href={(data && data.websites && data.websites.pinterest) ? data.websites.pinterest : "https://www.pinterest.com"} target="_blank" rel="noopener noreferrer">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data?.username || "JANE"}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data?.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data?.name}</span>
              </div>
            </div>
            {rIsLoading? "Loading" 
            : currentUser?.id === userId 
              ? (<button onClick={()=>setOpenUpdate(true)}>Update Profile</button>)
              : (<button onClick={handleFollow}>{relationshipData.includes(currentUser?.id) ? "unfollow" : "follow"}</button>)}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts userId={userId || undefined}/>
      </div>
      </>}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data || {id: 0,name: "",profilePic: ""}}/>}
    </div>
  );
};

export default Profile;
