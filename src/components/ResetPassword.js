import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ResetPassword = ({
  setIsVerified,
  isVerified,
  setEmail,
  email,
  id,
  setId,
}) => {
  const navigate = useNavigate();
  const resetPassword = async (event) => {
    try {
      event.preventDefault();
      console.log("reset");
      const response = await fetch(
        "http://localhost:4000/users/resetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
          }),
          credentials: "include",
        },
        []
      );
      const data = await response.json();
      setEmail(data[0].email);
      console.log(email);
      // const id = await data[0]._id;
      // console.log(id);
      // const verify = data[0].isVerified;
      // setIsVerified(verify);
      // setId(id);
      // console.log(data);
      // if (isVerified) {
      //   console.log("thanks for verifying the email enter new password");
      // const nav = () => navigate("/users/setPassword");
      // nav();
      //   // setLinkTo("/chatApp");
      //   // setLoggedIn(true);
      //   // setUser(data);
      // } else if (!isVerified) {
      const nav = () => navigate("/spinner");
      nav();
      // }
    } catch (error) {
      console.log({ message: error });
      // setLoggedIn(false);
      // setLinkTo("/");
    }
  };
  console.log("versuch");
  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={resetPassword}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input type="submit" value="reset" />
      </form>
    </div>
  );
};
export default ResetPassword;