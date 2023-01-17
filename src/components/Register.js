import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [signedUp, setSignedUp] = useState(false);

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/users/register", {
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
      setSignedUp(response.ok);
      if (response.ok) {
        console.log("logged in successfuly");
      }
    } catch (error) {
      console.log({ message: error });
    }
  };
  return (
    <>
      {signedUp ? (
        <div>thanks for signing up. please verify yout email</div>
      ) : (
        <div className="register">
          <h1 className="header">Register</h1>
          <form onSubmit={registerUser} className="loginForm">
            <input
              className="inputs"
              type="firstName"
              placeholder="first Name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              className="inputs"
              type="lastName"
              placeholder="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />

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
              <Link to="/" className="link">
                already registered? SignIn
              </Link>
              <input type="submit" value="register" className="btn" />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
