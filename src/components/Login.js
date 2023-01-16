import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setLoggedIn, setUser, loggedIn }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const loginUser = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
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
        console.log(loggedIn);
      }
    } catch (error) {
      console.log({ message: error });
      setLoggedIn(false);
      console.log(loggedIn);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="firstName"
          placeholder="first Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <input
          type="lastName"
          placeholder="lastName"
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
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
        <Link to="/chatApp" onSubmit={loginUser}>
          <input type="submit" value="login" />
          
        </Link>
<br />
        <Link to="/users/resetpassword">Forget password?</Link>
        <br />
        <Link to="/users/register">Not registered? SignUp</Link>
      </form>
    </div>
  );
};

export default Login;