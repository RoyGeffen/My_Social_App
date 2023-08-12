import { useState } from "react";
import { makeRequest } from "../../axios";
import "./createStory.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { User } from "../../types/customTypes";
import React from "react";
import axios from "axios";

interface IUpdate {
    setStoryMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateStory: React.FC<IUpdate> = ({ setStoryMenu }) => {
    const queryClient = useQueryClient();
    const [img, setImg] = useState<File | null>(null);
    let defaultImg = "http://res.cloudinary.com/das1ifbzs/image/upload/v1691754956/upload/yrmhcqhywdjvfxnexydo.jpg";

    const upload = async (file:File)=>{
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/das1ifbzs/image/upload",
        data
      );
      const { url } = uploadRes.data;
      return url;
    }
  

    const mutation = useMutation(
      (img: string) => {
        return makeRequest.post("/stories", {img:img});
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["stories"]);
        },
      }
    );
  
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        //TODO: find a better way to get image URL
        let imgUrl: string;
        imgUrl = img ? await upload(img) : defaultImg;

        mutation.mutate(imgUrl);
        setStoryMenu(false);
        setImg(null);
    }

    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setImg((prev)=>(e.target.files && e.target.files[0] ? e.target.files[0] : prev))
    }

    return (
      <div className="update">
        <div className="wrapper">
          <h1>Create a Story!!</h1>
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Your Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      img
                        ? URL.createObjectURL(img)
                        : (defaultImg && defaultImg.startsWith("http")? 
                            defaultImg : 
                           "/upload/" + defaultImg)
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={handleImgChange}
              />
            </div>

            <button onClick={handleSubmit}>Update</button>
          </form>
          <button className="close" onClick={() => setStoryMenu(false)}>
            close
          </button>
        </div>
      </div>
    );
  };

export default CreateStory;