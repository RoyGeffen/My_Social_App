import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dropDownList.scss"
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

type DropDownProps={
  img:string,
  text:string,
  onclick: ()=>void
}

const DropDownList = ()=>{
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    const [open, setOpen] = useState(false);

    const images={
      edit : "http://res.cloudinary.com/das1ifbzs/image/upload/v1691911585/upload/vwmt5htfyvzdjtk9pfgc.png",
      defaultProfilePic: "http://res.cloudinary.com/das1ifbzs/image/upload/v1691911548/upload/qcitmlig4rf8jeq2ecxd.png",
      settings: "http://res.cloudinary.com/das1ifbzs/image/upload/v1691911540/upload/vzvhh9wzdyceizrqnokr.png",
      logout: "http://res.cloudinary.com/das1ifbzs/image/upload/v1691911556/upload/hcxccemiyztauczvev0v.png",
      mail: "http://res.cloudinary.com/das1ifbzs/image/upload/v1691911581/upload/uhljakmqlluwfpwxcux8.png",
      register : "http://res.cloudinary.com/das1ifbzs/image/upload/v1691911571/upload/fzupgqsalkhowtrlkwzn.png"

    }
    const LogOutcurrentUser = async () => {
        try {
            makeRequest.post('/auth/logout')
            localStorage.removeItem('currentUser')
            window.location.reload();
            navigate("/login")
            //remove cookie
        } catch (error) {
            console.log(error)
          }
      }

  let menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: MouseEvent)=>{
      if(!menuRef.current || !menuRef.current.contains(e.target as Node)){
        setOpen(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }});

    function DropdownItem(props:DropDownProps){
        return(
          <li onClick={props.onclick} className = 'dropdownItem'>
            <img src={props.img} alt=""></img>
            <a> {props.text} </a>
          </li>
        );
      }

    return(
      // <div className="container">
        <div className="DropDownList">
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                    <img src= { (currentUser&&currentUser.profilePic) ? currentUser.profilePic : images.defaultProfilePic} alt="Profile"></img>
                </div>
            {currentUser?
                (
                <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                    <h3>Menu<br/><span>user options</span></h3>
                        <ul>
                        <DropdownItem onclick={()=>(navigate(`./profile/${currentUser.id}`))} img = {images.edit} text = {"Edit Profile"}/>
                        <DropdownItem onclick={()=>(navigate("./settings"))} img = {images.settings} text = {"Settings"}/>
                        <DropdownItem onclick={LogOutcurrentUser} img = {images.logout} text = {"Logout"}/>
                        </ul>
                </div>
                )  
                : 
                (
                    <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                        <h3>Menu<br/><span>user options</span></h3>
                            <ul>
                                <DropdownItem onclick={()=>(navigate("./login"))} img = {images.edit} text = {"login"}/>
                                <DropdownItem onclick={()=>(navigate("./register"))} img = {images.register} text = {"register"}/>
                                <DropdownItem onclick={()=>(navigate("./settings"))} img = {images.settings} text = {"Settings"}/>
                            </ul>
                    </div>
                )
            }
            </div>
        </div>
      //</div>
    )
}

export default DropDownList;

