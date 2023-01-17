import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Spinner = ({ setIsVerified, isVerified, id, setId }) => {
  const navigate = useNavigate();
  const checkVerification = async () => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:4000/users/find/${id}`);
      const data = await response.json();
      console.log(data);
      setIsVerified(data.isVerified);
      if (data.isVerified) {
        console.log("thanks for verifying the email enter new password");
        const userId = data._id;
        console.log(userId);
        navigate("/")
        // setLinkTo("/chatApp");
        // setLoggedIn(true);
        // setUser(data);
      } else {
        const nav = () => navigate("/spinner");
        nav();
      }
    } catch (error) {
      console.log({ message: error });
      // setLoggedIn(false);
      // setLinkTo("/");
    }
  };
  checkVerification();
  return isVerified ? (
    <div>verification Successful </div>
  ) : (
    <div>verification error</div>
  );
};
export default Spinner;
