import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import UpdateUser from "./components/UpdateUser";
import Register from "./pages/Register"
import RegistrationSuccess from "./pages/RegistrationSuccess";
import Typing from "./components/Typing";
import Profile from "./pages/Profile";
import Layout from "./pages/Layout";


function App() {
  return (
    <>
      <div className="App">
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/UpdateUser" element={<UpdateUser />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RegistrationSuccess" element={<RegistrationSuccess />} />
        <Route path="/Typing" element={<Typing />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Layout" element={<Layout />} />
      </Routes>
    </>
  );
}
export default App;