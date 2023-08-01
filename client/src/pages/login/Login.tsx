import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/")
    } catch (err) {
      if (axios.isAxiosError(err)) setErr(err.response?.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(e)}/>
            <input type="password" placeholder="Password"name="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(e)}/>
            {err && err}
            <button onClick={((e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{handleLogin(e)})}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
