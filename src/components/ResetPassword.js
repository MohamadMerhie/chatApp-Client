import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ResetPassword = ({
  setIsVerified,
  isVerified,

  id,
  setId,
}) => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

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
      // setLoggedIn(false);
      // setLinkTo("/");
    }
  };
  // useEffect(() => {
  //   resetPassword(email);
  // }, [email]);
  console.log("versuch");
  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={resetPassword}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input type="submit" value="reset" />
      </form>
    </div>
  );
};
export default ResetPassword;
