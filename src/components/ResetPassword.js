import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetPassword from "./SetPassword";
const ResetPassword = ({
  setIsVerified,
  isVerified,
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
      // const data = await response.json();
      if( response.ok) {
        setIsVerified(true);

      }
      
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  console.log("versuch");
  return (
    <>{!isVerified ?( <div>
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
    </div>):(<SetPassword/>)}
     
    </>
  );
};
export default ResetPassword;
