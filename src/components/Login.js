import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setLoggedIn, setUser, setLinkTo }) => {
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
        setLinkTo("/chatApp");
        setLoggedIn(true);
        setUser(data);
      }
    } catch (error) {
      console.log({ message: error });
      setLoggedIn(false);
      setLinkTo("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="login" />

        <br />
        <Link to="/users/resetpassword">Forget password?</Link>
        <br />
        <Link to="/users/register">Not registered? SignUp</Link>
      </form>
    </div>
  );
};

export default Login;
