import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { UNSAFE_DataRouterContext, useLocation } from "react-router-dom"
import RightBar from "../../components/rightBar/RightBar"

const Home = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const {currentUser} = useContext(AuthContext);
  return (
    <div className="home">
      <Stories/>
      <Share/>
      <Posts userId={userId || undefined}/>
    </div>
  )
}

export default Home