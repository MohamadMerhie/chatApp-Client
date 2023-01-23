import dateFormat from "dateformat";
import {  format } from "timeago.js";

// masks.hammerTime = 'HH:MM! "Can\'t touch this!"';
// const now = dateFormat(new Date(), `DDDD "at" h:MM TT`)
const ChatHeader = ({ chatHeaderUser, image, imagePath ,loggedOut}) => {
      console.log(chatHeaderUser?.friend.updatedAt);


  return (
    <div className="chats1">
      
      <div className="imageContainer">
        <a
          href={
            chatHeaderUser?.friend.profilePicture
              ? imagePath + chatHeaderUser.profilePicture
              : image
          }
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={
              chatHeaderUser?.friend.profilePicture
                ? imagePath + chatHeaderUser.friend.profilePicture
                : image
            }
            alt=""
            className="userImage"
          />
        </a>
      </div>

      <div className="userInfo">
        <p className="chatUsername">
          {chatHeaderUser ? chatHeaderUser.friend.fullName : "C H A T - A P P"}
        </p>
        <p className="textStatus">
          {chatHeaderUser
            ? chatHeaderUser.online
              ? "Online"
              : "last seen "  + format(new Date((chatHeaderUser?.friend.updatedAt)))
            : "We hope to see you always"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
