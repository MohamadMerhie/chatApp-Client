import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Set Password</h1>
      <form onSubmit={resetPassword}>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="reset" />
      </form>
    </div>
  );
};
export default SetPassword;
