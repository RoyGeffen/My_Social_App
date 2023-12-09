import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { User } from "../../types/customTypes";
import DropDownList from "../dropDownList/DropDownList";

const Navbar = () => {
  const [search, setSearch] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [data,setData] = useState<User[]>([])
  const { toggle, darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      if (search) {
        setSearchOpen(true)
        await makeRequest.get("/users?str=" + search).then((res)=>{
          setData(res.data);
        });
      }
    }
    fetchData()
  }, [search]);

  const handleSearchClick = (pId:number)=>{
    setSearchOpen(false)
    navigate("/profile/"+pId)
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>My Social</span>
        </Link>
        <HomeOutlinedIcon onClick={()=>{navigate("/")}}/>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon onClick={()=>setSearchOpen(!searchOpen)}/>
            {data[0] && searchOpen && search &&
            <div className="searchResults">
            {searchOpen && data && data.map((user:User)=>(
              <div key={user.id} onClick={()=>handleSearchClick(user.id)}>
                <span>{user?.username}</span>
                <img src={user.profilePic} alt="" />
              </div>
              ))}
            </div>}
          <input type="text" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/>
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <DropDownList/>
          <span>{currentUser?.name}</span>
        </div>
      </div>
    </div>     
  );
};

export default Navbar;
