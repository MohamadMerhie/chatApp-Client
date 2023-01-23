import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './setPass.css'
const SetPassword = ({
  setIsVerified,
  isVerified,
  setEmail,
  email,
  id,
  setId,
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const resetPassword = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(
        "http://localhost:4000/users/updatePassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password,
          }),
          credentials: "include",
        },
        []
      );
      const data = await response.json();
      console.log(data);
      if (data.isVerified) {
        navigate("/users/spinner");
      }
      console.log("passwort geändert");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="setPass">
      <h1 className="header">Set Password</h1>
      <form onSubmit={resetPassword}className="setPassForm" >
        <input
        className="setPassInputs"
        
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="reset" className="setPassBtn"/>
      </form>
    </div>
  );
};
export default SetPassword;
