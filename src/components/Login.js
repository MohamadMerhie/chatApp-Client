import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
const Login = ({ setLoggedIn, setUser, setOnline }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loginUser = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("logged in successfuly");
        setLoggedIn(true);
        setUser(data);
      }
    } catch (error) {
      console.log({ message: error.message });
      setLoggedIn(false);
    }
  };

  return (
    <div className="login">
      <h1 className="header">Login</h1>

      <form onSubmit={loginUser} className="loginForm">
        <input
          className="inputs"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="inputs"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="links">
         
          <Link to="/users/resetpassword" className="link">
            Forget password?
          </Link>


          <Link to="/users/register" className="link">
            Not registered? SignUp
          </Link>
          



        <input type="submit" value="login" className="btn" />
        </div>

      </form>
    </div>
  );
};

export default Login;
