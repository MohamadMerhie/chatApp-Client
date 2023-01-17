import { useEffect, useState } from "react";
import image from "./Avatar.webp";

const Conversation = ({ chat, user, setChatHeaderUser }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const usersIds = chat.members.find((id) => id !== user._id);

    const getUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/users/find/" + usersIds
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [user, chat]);

  return userData?.map((friend) => (
    <div
      className="chat"
      key={friend._id}
      onClick={() => setChatHeaderUser(friend)}
    >
      <div className="imageContainer">
        <img src={image} alt="" className="userImage" />
        <span className={friend.isOnline?"status":""}></span>
      </div>
      <div>
        <p className="chatUsername">{friend.fullName}</p>
      </div>
    </div>
  ));
};

export default Conversation;
