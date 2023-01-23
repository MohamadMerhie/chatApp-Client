import { useEffect, useState } from "react";

const Conversation = ({
  chat,
  user,
  setChatHeaderUser,
  imagePath,
  image,
  online,
}) => {
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
      onClick={() => setChatHeaderUser({friend,online})}
    >
      <div className="imageContainer">
        <img
          src={
            friend.profilePicture ? imagePath + friend.profilePicture : image
          }
          alt=""
          className="userImage"
        />
        <span className={online ? "status" : ""}></span>
      </div>
      <div>
        <p className="chatUsername">{friend.fullName}</p>
      </div>
    </div>
  ));
};

export default Conversation;
