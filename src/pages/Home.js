import { Link } from "react-router-dom";

const Home = ({ user, setLoggedIn ,setLoggedOut}) => {
  const logoutHandler = async (event) => {
    event.preventDefault();

    console.log(user._id);
    try {
      const response = await fetch("http://localhost:4000/users/logout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user._id,
        }),
        credentials: "include",
      });
      const data =await response.json()
      console.log(data);
      if (response.ok) {
        setLoggedIn(false);
        setLoggedOut(data.lastSeen)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={logoutHandler} className="logout">
        Logout
      </button>

      <Link to="/messenger">Messnger</Link>
    </div>
  );
};

export default Home;
