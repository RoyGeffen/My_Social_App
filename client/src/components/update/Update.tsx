import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { User } from "../../types/customTypes";
import React from "react";

interface IUpdate {
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    user: User 
}

const Update: React.FC<IUpdate> = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState<File | null>(null);
    const [profile, setProfile] = useState<File | null>(null);
    const [texts, setTexts] = useState( //TODO ADD USER REDUCER AND ALL DETAILS
      user
    );

    const upload = async (file: File) => {
        try {
          const formData = new FormData();
          if(!file) console.log("NO FILE GIVEN TO UPLOAD");
          if(file) formData.append("file", file);
          const res = await makeRequest.post("/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setTexts((prev)=> ({...prev, [e.target.name]:[e.target.value] }))
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setCover((prev)=>(e.target.files && e.target.files[0] ? e.target.files[0] : prev))
    }


    return (
      <div className="update">
        <div className="wrapper">
          <h1>Update Your Profile</h1>
          <form>
            <div className="files">
              {/* <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : "/upload/" + user.coverPic
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
                onChange={handleFileChange}
              />
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : "/upload/" + user.profilePic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label> */}
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            {/* <label>Email</label>
            <input
              type="text"
              // value={texts.user.email}
              name="email"
              onChange={handleChange}
            />
            <label>Name</label>
            <input
              type="text"
              value={texts.name}
              name="name"
              onChange={handleChange}
            />
            <label>Country / City</label>
            <input
              type="text"
              name="city"
              value={texts.city}
              onChange={handleChange}
            />
            <label>FACEBOOK</label>
            <input
              type="text"
              name="website"
              value={texts.websites?.facebook}
              onChange={handleChange}
            /> */}
            {texts&& 
             Object.entries(user).map(([key, value]) => (
              !(key == "coverPic") && !(key == "profilePic") &&                 
                <React.Fragment key={key}>
                  <label key={`label_${key}`}>
                    {key}
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