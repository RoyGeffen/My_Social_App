import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/register", inputs); //proxy.........
    } catch (err) {
      if (axios.isAxiosError(err)) setErr(err.response?.data);
    }
  };


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleChange(e)}}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleChange(e)}}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleChange(e)}}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleChange(e)}}
            />
            {err && err}
            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{handleClick(e)}}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
