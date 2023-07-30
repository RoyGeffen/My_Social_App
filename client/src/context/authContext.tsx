import { createContext, useEffect, useState , ReactNode } from "react";

export type User = {
  id: number;
  name: string;
  profilePic: string;
}

interface AuthContextValue {
  currentUser: User | null;
  login: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  login: () => {},
});


export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")!) || null
  );

  const login = () => {
    //TO DO
    setCurrentUser({
      id: 1,
      name: "John Doe",
      profilePic:
        "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
    });
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
