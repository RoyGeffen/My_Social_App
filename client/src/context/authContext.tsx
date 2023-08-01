import axios from "axios";
import { createContext, useEffect, useState , ReactNode } from "react";
import { AuthContextValue, LoginInput, User} from "../types/customTypes";



export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  login: () => {},
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")!) || null
  );

  const login = async (inputs: LoginInput) => {
    const res = await axios.post("http://localhost:8080/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
