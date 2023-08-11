import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { User } from "../../types/customTypes";
import React from "react";
import axios from "axios";

interface IUpdate {
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    user: User 
}

const Update: React.FC<IUpdate> = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState<File | null>(null);
    const [profile, setProfile] = useState<File | null>(null);
    const [texts, setTexts] = useState<User>( //TODO ADD USER REDUCER AND ALL DETAILS
      user
    );

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setTexts((prev)=> ({...prev, [e.target.name]:[e.target.value] }))
    }
    const handleWebsiteChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setTexts((prev)=>({
        ...prev, 
        websites: { ...prev.websites, [e.target.name]: e.target.value },
      }))
    }

    const queryClient = useQueryClient();

    const mutation = useMutation(
      (user: User) => {
        return makeRequest.put("/users", user);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["user"]);
        },
      }
    );
  
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        //TODO: find a better way to get image URL
        
        let coverUrl: string;
        let profileUrl: string;
        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;
        // const {websites, ...otherText} = {...texts}
        // mutation.mutate({ ...websites, ...otherText, coverPic: coverUrl, profilePic: profileUrl });
        mutation.mutate({ ...texts , coverPic: coverUrl, profilePic: profileUrl });
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
    }

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setCover((prev)=>(e.target.files && e.target.files[0] ? e.target.files[0] : prev))
    }
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setProfile((prev)=>(e.target.files && e.target.files[0] ? e.target.files[0] : prev))
    }


    return (
      <div className="update">
        <div className="wrapper">
          <h1>Update Your Profile</h1>
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : (user.coverPic && user.coverPic.startsWith("http")? 
                           user.coverPic : 
                           "/upload/" + user.coverPic)
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
                onChange={handleCoverChange}
              />
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : (user.profilePic.startsWith("http")? 
                              user.profilePic : 
                              "/upload/" + user.profilePic)
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={handleProfileChange}
              />
            </div>

            {texts&& 
             Object.entries(user).map(([key, value]) => (
               !(key == "coverPic") && !(key == "profilePic") && !(key == "id") && !(key == "websites") &&                  
               <React.Fragment key={key}>
                  <label key={`label_${key}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={key}
                    placeholder={String(value instanceof Object ? JSON.stringify(value) : value ?? 'N/A')}
                    onChange={handleChange}
                    key={`input_${key}`}
                    />
                </React.Fragment>
            ))}

          <div className="formInputContainer">
            {texts&& user.websites &&
             Object.entries(user.websites).map(([key, value]) => (
               !(key == "id") && !(key == "userid") &&
              <div className="formInput" key={key}>
                <label key={`label_${key}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input 
                  name={key} 
                  onChange={handleWebsiteChange} 
                  type="text"                  
                  placeholder={typeof value === 'object' ? JSON.stringify(value) : String(value ?? 'N/A')}
                  />
              </div>
            ))}
            </div>
            <button onClick={handleSubmit}>Update</button>
          </form>
          <button className="close" onClick={() => setOpenUpdate(false)}>
            close
          </button>
        </div>
      </div>
    );
  };

export default Update;