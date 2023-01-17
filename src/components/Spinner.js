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
      if (data[0].isVerified) {
        console.log("thanks for verifying the email enter new password");
        const userId = data[0]._id;
        console.log(userId);
        const nav = () => navigate("/users/setpassword");
        nav();
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
  return <>verify email...</>;
};
export default Spinner;
