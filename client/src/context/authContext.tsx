import axios from "axios";
import { createContext, useEffect, useState , ReactNode } from "react";
import { AuthContextValue, LoginInput, User} from "../types/customTypes";
//import { makeRequest } from "../axios.js";


export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  login: () => {},
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialUserString = localStorage.getItem("user");
  const initialUser: User | null = initialUserString ? JSON.parse(initialUserString) : null;

  const [currentUser, setCurrentUser] = useState<User | null>(initialUser)

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
