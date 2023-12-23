import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {useState} from "react"
import { makeRequest } from "../../axios";
import "../rightBar/rightBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { User } from "../../types/customTypes";
import { useNavigate } from "react-router-dom";

const Suggestions = () => {
    const {currentUser} = useContext(AuthContext)
    const [blackList, setBlackList] = useState<number[]>([]);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const { isLoading, error, data:suggestions  } = useQuery(["suggestions"], () =>
      makeRequest.get("/users/suggestion").then((res) => {
        return res.data;
      })
    );
  
    const handleDismiss = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      let otherUserid = parseInt(e.currentTarget.value);
      console.log(otherUserid);
      setBlackList((prev)=>[...prev, otherUserid])
    }
  
    const mutation = useMutation(
      (id:number) => {
        return makeRequest.post("/relationships", { userId:id });
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["suggestions"]);
        },
      }
    );
  
    const handleFollow = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      let otherUserid = e.currentTarget.value;
      mutation.mutate(parseInt(otherUserid));
    };
    
    return(
        <div className="item">
        <span>Suggestions For You</span>
        {isLoading?"Loading...":
        (suggestions.length==blackList.length || suggestions.length==0) ? 
            <span className="user">{"    No Suggestions For You At The Moment"}</span>
        :
        suggestions.map((suggestion:User)=>(
        !blackList.includes(suggestion.id) &&
        <div className="user" key={suggestion.id}>
            <div className="userInfo" onClick={()=>navigate("/profile/"+suggestion.id)}>
            <img
                src={suggestion.profilePic}
                alt=" "
            />
            <span>{suggestion.username}</span>
            </div>
            <div className="buttons">
            <button 
                onClick={handleFollow} 
                name="otherUserid" 
                value={suggestion.id}>
                follow
            </button>
            <button 
                onClick={handleDismiss} 
                value={suggestion.id}
                name="otherUserid">
                dismiss
            </button>
            </div>
        </div>
        ))}
        </div>
    )

}

export default Suggestions;