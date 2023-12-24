import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import {  QueryClient,  QueryClientProvider} from '@tanstack/react-query'
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./styles/global.scss";
import { ReactNode, useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import axios from "axios";
import Friends from "./pages/friends/Friends";
import Chats from "./pages/chats/chats";




interface ProtectedRouteProps {
  children: ReactNode;
}

function App() {
  const {currentUser} = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient()

  const BasicLayout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };
  const ChatsLayout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 16 }}>
              <Outlet />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const CheckCookie = async()=>{
    const res = await axios.get("http://localhost:8080/api/cookies/tokenExists", {
      withCredentials: true,
    });
    return res
  } 

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tokenExists, setTokenExists] = useState(false);
  
    useEffect(() => {
      const fetchTokenStatus = async () => {
        try {
          const res = await CheckCookie();
          setTokenExists(res.data.accessTokenExists);
        } catch (error) {
          console.error("Error checking token:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchTokenStatus();
    }, []);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!currentUser || !tokenExists) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <BasicLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
      ],
    },

    {
      path: "/",
      element: (
        <ProtectedRoute>
          <ChatsLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/chats",
          element: <Chats />,
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
