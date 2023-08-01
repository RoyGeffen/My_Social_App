import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"

const Home = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className="home">
      <Stories/>
      <Share/>
      <Posts userId={currentUser? currentUser.id : undefined}/>
    </div>
  )
}

export default Home