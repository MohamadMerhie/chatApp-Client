import { useState } from "react";

import SetPassword from "./SetPassword";
import "./resetpasswors.css";
const ResetPassword = ({ isVerified }) => {
  const [email, setEmail] = useState();

  const resetPassword = async (event) => {
    try {
      event.preventDefault();

      console.log("reset");
      console.log(email);
      const response = await fetch(
        "http://localhost:4000/users/resetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(email);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  console.log("versuch");
  return (
    <>
      {!isVerified ? (
        <div className="resetPasword">
          <h1 className="header">Reset Password</h1>
          <form onSubmit={resetPassword} className="setPassForm">
            <input
              type="email"
              className="setPassInputs"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input type="submit" value="reset" className="setPassBtn" />
          </form>
        </div>
      ) : (
        <SetPassword />
      )}
    </>
  );
};
export default ResetPassword;
