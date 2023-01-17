import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login.js";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ChatApp from "./components/ChatApp.js";
import ResetPassword from "./components/ResetPassword";
import Register from "./components/Register";
import SetPassword from "./components/SetPassword.js";
import Spinner from './components/Spinner.js'
function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isVerified,setIsVerified] = useState(false)


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
        {/* All App container */}

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <ChatApp user={user} setLoggedIn={setLoggedIn} />
                ) : (
                  <Login
                    setLoggedIn={setLoggedIn}
                    setUser={setUser}
                    loggedIn={loggedIn}
                  />
                )
              }
            />
            <Route path="/users/register" element={<Register />} />
            <Route path="/users/resetpassword" element={<ResetPassword setIsVerified={setIsVerified} />} />
            <Route path="/users/setPassword" element={<SetPassword />} />
            <Route path="/users/spinner" element={<Spinner setIsVerified={setIsVerified}  isVerified={isVerified} /> } />
          </Routes>
        </BrowserRouter>
        {/* ---------------------------------------- */}
      </div>
    </>
  );
}

export default App;
