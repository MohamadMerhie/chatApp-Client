import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [signedUp, setSignedUp] = useState(false);
  const [profilePicture, setProfilePicture] = useState();

  const registerUser = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", profilePicture);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await fetch("http://localhost:4000/users/register", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData,
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

            <div className="input-group">
              <label htmlFor="files" >Select profile picture</label>
              <input
              className="upload"
                type="file"
                onChange={(event) => {
                  setProfilePicture(event.target.files[0]);
                }}
              />
            </div>

       <input type="submit" value="register" className="registerBtn" />
            <div className="links">
              <Link to="/" className="loginLink">
                already registered? SignIn
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
