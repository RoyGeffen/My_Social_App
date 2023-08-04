import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

export type Comment = {
  id: number;
  desc: string;
  name: string;
  userId: number;
  profilePicture: string;
  createdAt: Date;
}

export type NewComment={
  desc:string,
  postId: number
}

type Props = {
  postId:number
}

const Comments = ( props : Props ) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + props.postId).then((res) => {
      return res.data;
    })
  );

  

  const mutation = useMutation(
    (newComment: NewComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutation.mutate({ desc, postId: (props.postId) });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser?.profilePic} alt="" />
        <input 
          type="text" 
          placeholder="write a comment" 
          onChange={(e)=>setDesc(e.target.value)}
          value = {desc}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading 
        ? "loading"
        : 
        data.map((comment:Comment) => (
          <div className="comment" key={comment.id}>
            <img src={comment.profilePicture} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
      ))}
    </div>
  );
};

export default Comments;