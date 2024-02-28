import "./App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import UpdateUser from "./components/UpdateUser";
import Register from "./components/Register"


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
      </Routes>
    </>
  );
}
export default App;