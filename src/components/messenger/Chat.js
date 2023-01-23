
import {  format } from "timeago.js";
import { useEffect,useRef } from "react";

const Chat = ({ image, imagePath, user, messages, currentChat, allUsers }) => {
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // messages.map((message) =>
  //   console.log(message.createdAt)
  // )

  return (
    <div className="conversationContainer">
      {currentChat ? (
        messages?.map((message) => (
          <div ref={scroll} className="scroll">
            <div
              className={
                message.senderId === user._id ? "ownMessage" : "messages"
              }
            >
              <div className="imageContainer">
                {allUsers?.map(
                  (u) =>
                    message.senderId === u._id && (
                      <img
                        src={
                          u.profilePicture
                            ? imagePath + u.profilePicture
                            : image
                        }
                        alt=""
                        className="userImage"
                      />
                    )
                )}
              </div>

              <div className="text-time">
                <div className="message">
                  {message.text}
                  <span className="timeAgo">
                    {format(new Date(message?.createdAt))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="noConversation">Open a Conversation </div>
      )}
    </div>
  );
};

export default Chat;
