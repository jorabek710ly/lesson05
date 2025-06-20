import { Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Blog from "./pages/Blog"

const App = () => {
  
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/blog"}>Blog</Link>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/blog" element={<Blog/>}/>
      </Routes>
    </div>
  )
}

export default App