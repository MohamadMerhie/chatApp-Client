import { useEffect, useRef, useState } from "react";
import "./Search.css";
import image from "./Avatar.webp";
import Conversation from "./Conversation.js";
import { format } from "timeago.js";
const ChatApp = ({ user, loggedIn }) => {
  const [users, setUsers] = useState([]);
  const [searchNewChat, setSearchNewChat] = useState("");
  const [chatMembers, setMembers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();
  useEffect(() => {
    const chatsFetch = async () => {
      // event.preventDefault()
      console.log(user._id);
      try {
        const response = await fetch(`http://localhost:4000/chats/${user._id}`);
        const data = await response.json();
        setMembers(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    chatsFetch();
  }, [user, chats]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/users/${searchNewChat}`
        );
        const data = await response.json();
        const users = data.filter((friend) => friend._id !== user._id);
        setUsers(users);
      } catch (error) {
        console.log({ error: error.message });
      }
    };

    fetchUsers();
  }, [searchNewChat, user._id]);

  const openChatFetch = async (friend) => {
    console.log(user._id, friend._id);
    try {
      const response = await fetch(
        `http://localhost:4000/chats/find/${user._id}/${friend._id}`
      );
      if (!response.ok) {
        const addUser = await fetch("http://localhost:4000/chats/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            members: [user._id, friend._id],
          }),
          credentials: "include",
        });
        const data = await addUser.json();
        setChats(data);
        setSearchNewChat("");
      } else {
        setSearchNewChat("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/messages/" + currentChat._id
        );
        const data = await response.json();
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const submitTextMessageHandler = async (event) => {
    event.preventDefault();
    console.log(event);

    try {
      const response = await fetch("http://localhost:4000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: currentChat._id,
          senderId: user._id,
          text: textMessage,
        }),
        credentials: "include",
      });
      const data = await response.json();
      setMessages([...messages, data]);
      setTextMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatApp">
      {/* left side app (search and chats)  */}
      {/* ---------------------------------------- */}

      <div className="left-side">
        {/* search container */}
        {/* ---------------------------------------- */}

        <div className="search">
          <input
            type="search"
            name="search"
            id=""
            placeholder="search"
            value={searchNewChat}
            onChange={(e) => setSearchNewChat(e.target.value)}
          />

          {searchNewChat && (
            <div className="searchNewChat">
              {users?.map((user) => (
                <div className="chat" onClick={() => openChatFetch(user)}>
                  <div className="imageContainer">
                    <img src={image} alt="" className="userImage" />
                    <span className="status"></span>
                  </div>
                  <div /* className="userInfo" */>
                    <p className="chatUsername">{user.fullName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* ---------------------------------------- */}

        {/* chats container */}
        {/* ---------------------------------------- */}
        <div className="chats">
          {chatMembers?.map((chat) => (
            <div onClick={() => setCurrentChat(chat)}>
              <Conversation
                chat={chat}
                // openChatFetch={openChatFetch}
                user={user}
              />
            </div>
          ))}
        </div>

        {/* ---------------------------------------- */}
      </div>
      {/* ---------------------------------------- */}

      {/* right side app (conversation)  */}
      {/* ---------------------------------------- */}

      <div className="right-side">
        {/* friends' chat Container */}
        {/* ---------------------------------------- */}
        <div className="chats1">
          <div className="imageContainer">
            <img src={image} alt="" className="userImage" />
            <span className="status1"></span>
          </div>

          <div className="userInfo">
            <p className="chatUsername">john</p>
            <p className="textStatus">last seen ..</p>
          </div>
        </div>
        {/* ---------------------------------------- */}

        {/* conversation Container */}
        {/* ---------------------------------------- */}
        <div className="conversationContainer">
          {currentChat ? (
            messages?.map((message) => (
              <div ref={scroll} className="scroll">
                <div
                  className={
                    message.senderId === user._id ? "ownMessage" : "messages"
                  }
                >
                  <div className="chats3">
                    <div className="imageContainer">
                      <img src={image} alt="" className="userImage" />
                    </div>
                  </div>

                  <div className="text-time">
                    <div className="message">{message.text} </div>
                    <div className="timeAgo">{format(message.createdAt)}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="noConversation">Open a Conversation </div>
          )}
        </div>
        {/* ---------------------------------------- */}

        {/* keyboard container */}
        {/* ---------------------------------------- */}
        <div className="keyboard">
          <input
            type="text"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
          />
          <button onClick={submitTextMessageHandler}>send</button>
        </div>

        {/* ---------------------------------------- */}
      </div>

      {/* ---------------------------------------- */}
    </div>
  );
};

export default ChatApp;
