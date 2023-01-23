import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/auth/Login.js";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ChatApp from "./components/messenger/ChatApp.js";
import ResetPassword from "./components/auth/ResetPassword.js";
import Register from "./components/auth/Register.js";
import SetPassword from "./components/auth/SetPassword";
import Home from "./pages/Home";
import image from "./Avatar.webp";
const imagePath = "http://localhost:4000/";
let off;
function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loggedOut, setLoggedOut] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:4000/users");
      const data = await response.json();
      setAllUsers(data);
    };
    fetchUsers();
  }, [loggedIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Home
                  setLoggedIn={setLoggedIn}
                  user={user}
                  setLoggedOut={setLoggedOut}
                />
              ) : (
                <Login
                  setLoggedIn={setLoggedIn}
                  setUser={setUser}
                  loggedIn={loggedIn}
                  user={user}
                />
              )
            }
          />
          <Route
            path="/messenger"
            element={
              <ChatApp
                onlineUsers={onlineUsers}
                setOnlineUsers={setOnlineUsers}
                user={user}
                setLoggedIn={setLoggedIn}
                allUsers={allUsers}
                image={image}
                imagePath={imagePath}
                loggedOut={loggedOut}
              />
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/setPassword" element={<SetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
