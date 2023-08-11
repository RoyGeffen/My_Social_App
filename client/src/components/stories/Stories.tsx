import { useContext, useState } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateStory from "../createStory/CreateStory";

type Story={
  id:number,
  img:string,
  username:string,
  userid:number
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



  return (
    <div className="stories">
      <div className="story">
          <img src={currentUser?.profilePic} alt="" />
          <span>{currentUser?.name}</span>
          <button onClick={()=>(setStoryMenu(!storyMenu))}>+</button>
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
            <span>{story.username}</span>
          </div>
      ))}
    </div>
  )
}

export default Stories