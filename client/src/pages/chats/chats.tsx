import moment from "moment";
import DataTable from "../../components/dataTable/DataTable";
import PreviewChats from "../../components/previewChats/previewChats";
import "../home/home.scss"
import "./chats.scss"
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Chats=()=>{
    return(
      <div className="home">
        <div className="page">
            <div className="vertical-line"></div>
            <div className="container">
                <PreviewUsers/>
                <div className="chats-container">
                    <div className="header">
                        <div className="user">
                            <img src="http://res.cloudinary.com/das1ifbzs/image/upload/v1691743868/upload/fapqis5g1ommgqhiszcl.jpg" alt="" />
                            <p>username</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}


export default Chats

const PreviewUsers = ()=>{
    return(
        <div>
            <div className="search">
                    <SearchOutlinedIcon />
                    {/* onClick={()=>setSearchOpen(!searchOpen)} */}

                    <input type="text" placeholder="Search..."/>
                </div>
                <div className="user-container">

                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
                <div className="user">
                    <div className="userInfo">
                    <a href={`/profile/${11}`}>
                        <img src={"http://res.cloudinary.com/das1ifbzs/image/upload/v1692129776/upload/fb8lrqvqk5vzkxn9prs9.png"} alt="" />
                    </a>
                        <div className="details">
                        <Link
                            to={`/profile/${11}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            >
                            <span className="name">{"test"}</span>
                        </Link>
                        <span className="date">{`1 new messages · ${moment("2023-08-12 12:36:37").fromNow()}`}</span>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
} 