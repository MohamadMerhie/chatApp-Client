import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login.js";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ChatApp from "./components/ChatApp.js";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await fetch("http://localhost:4000/users");
  //     const data = response.json();
  //     console.log(data);
  //     setUsers(data);
  //   };
  //   fetchUsers();
  // });

  return (
    <>
      <div className="App">
        <a href="/users/login"> Login</a>

        {!loggedIn ? (
          <BrowserRouter>
            <Routes>
              <Route
                path="/users/login"
                element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />}
              />
            </Routes>
          </BrowserRouter>
        ) : (
          // {/* All App container */}
          // {/* ---------------------------------------- */}
          <ChatApp user={user} />
        )}
        {/* ---------------------------------------- */}
      </div>
    </>
  );
}

export default App;
