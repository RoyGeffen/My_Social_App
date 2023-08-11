import "./singlePost.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import { Post } from "../../types/customTypes";
import moment from "moment"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
  
export type Props ={
  post:Post,
  key:number
}
export type Like = {
  liked: boolean | null;
}

const SinglePost = (props :Props) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", props.post.id], () =>
    makeRequest.get("/likes?postId=" + props.post.id).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (liked: Like) => {
      if (liked) return makeRequest.delete("/likes?postId=" +  props.post.id);
      return makeRequest.post("/likes", { postId:  props.post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const deleteMutation = useMutation(
    (postId: number) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  const handleLike = () => {
    mutation.mutate(data.includes(currentUser?.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(props.post.id);
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
          <a href={`/profile/${props.post.userid}`}>
            <img src={props.post.profilePic} alt="" />
          </a>
            <div className="details">
              <Link
                to={`/profile/${props.post.userid}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{props.post.name}</span>
              </Link>
              <span className="date">{moment(props.post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={()=>props.post.userid == currentUser?.id && setMenuOpen(!menuOpen)}/>
          {menuOpen && <button onClick={handleDelete}>Delete</button>}
        </div>
        <div className="content">
          <p>{props.post.desc}</p>
          <img src={(props.post && props.post.img && props.post.img.startsWith("http")? 
                      props.post.img : 
                      "/upload/" + props.post.img)} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading?"Loading": 
              data.includes(currentUser?.id) 
                   ? <FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike}/> 
                   : <FavoriteBorderOutlinedIcon onClick={handleLike}/>}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={props.post.id}/>}
      </div>
    </div>
  );
};

export default SinglePost;
