import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate()

  const loginAfterRegister = async ()=>{
    try {
      await login(inputs);
      navigate("/")
    } catch (err) {
      if (axios.isAxiosError(err)) setErr(err.response?.data);
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/register", inputs); //proxy.........
      loginAfterRegister();
    } catch (err) {
      if (axios.isAxiosError(err)) setErr(err.response?.data);
    }
  };


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>My Social.</h1>
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
            <p>
            {err && err}
            </p>
            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{handleRegister(e)}}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
