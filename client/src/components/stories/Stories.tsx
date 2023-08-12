import { useContext, useState } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateStory from "../createStory/CreateStory";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";

type Story={
  id:number,
  img:string,
  username:string,
  userid:number,
  createdAt: Date
}



const Stories = ()  => {
  const [storyMenu, setStoryMenu] = useState(false);
  const queryClient = useQueryClient();
  const {currentUser} = useContext(AuthContext)
  const { isLoading, error, data:stories } = useQuery(["stories"], () =>
    makeRequest.get("/stories?userId="+currentUser?.id).then((res) => {
      return res.data;
    })
  );

  const deleteMutation = useMutation(
    (storyId: number) => {
      return makeRequest.delete("/stories/" + storyId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleDelete=async(id:number)=>{
    deleteMutation.mutate(id);
  }

//menuOpen &&
  return (
    <div className="stories">
      <div className="story">
          <img src={currentUser?.profilePic} alt="" />
          <span>{currentUser?.name}</span>
          <button className="create" onClick={()=>(setStoryMenu(!storyMenu))}>+</button>
          {storyMenu && <CreateStory setStoryMenu={setStoryMenu}/>}
        </div>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        :
        stories.map((story: Story)=>(
          <div className="story" key={story.id}>
            <img src={story.img} alt="" />
            <div className="details">
              <span className="name">{story.username}</span>
              <span className="date">{moment(story.createdAt).fromNow()}</span>
            </div>
            <div className="delete">
              {story.userid == currentUser?.id && 
                <button onClick={(e)=>(handleDelete(story.id))}>Delete</button>}
            </div>  
          </div>

      ))}
    </div>
  )
}

export default Stories