import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export type newPost = {
  desc: string,
  img: string
}

const Share = () => {
  const [file, setFile] = useState<File|null>(null);
  const [desc, setDesc] = useState("");
  const {currentUser} = useContext(AuthContext)
  const queryClient = useQueryClient();

  const upload = async () => {
    try {
      const data = new FormData();
      if(!file) console.log("NO FILE GIVEN TO UPLOAD");
      if(file){
        data.append("file", file);
        data.append("upload_preset", "upload");
      }
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/das1ifbzs/image/upload",
        data
      );
      const { url } = uploadRes.data;
      return url;
    } catch (err) {
      console.log(err);
    }
  };
  
  const mutation = useMutation(
    (newPost: newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile || null);
  };

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">

          <img
            src={currentUser?.profilePic}
            alt=""
            />
          <input 
            type="text" 
            placeholder={`What's on your mind ${currentUser?.name}?`} 
            onChange={(e)=>setDesc(e.target.value)} 
            value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />)}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
          <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
