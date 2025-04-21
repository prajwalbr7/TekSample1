import { BrowserRouter,Routes, Route } from "react-router-dom";
import Registration from './components/registration'
import Login from './components/login'
import Home from "./components/home";
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
