import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface IUpdate {
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Update: React.FC<IUpdate> = ({ setOpenUpdate }) => {
    // const [cover, setCover] = useState(null);
    // const [profile, setProfile] = useState(null);
    // const [texts, setTexts] = useState({
    //   email: user.email,
    //   password: user.password,
    //   name: user.name,
    //   city: user.city,
    //   website: user.website,
    // });
    const handleChange = ()=>{}

    return(
        <div className="update">
            <form>
                <input type="text"></input>
                <input type="file"></input>
                <input type="text" name="name" onChange={handleChange}></input>
                <input type="text" name="city" onChange={handleChange}></input>
                <input type="text" name="facebook" onChange={handleChange}></input>
            </form>
            <button onClick={()=>setOpenUpdate(false)}>X</button>
        </div>
    )
}

export default Update;