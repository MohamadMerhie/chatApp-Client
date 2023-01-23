import { useEffect, useRef, useState } from "react";
import "./Search.css";
import "./chatApp.css";
import Search from "./Search";
import Chats from "./Chats.js";
import ChatHeader from "./ChatHeader.js";
import Chat from "./Chat.js";
import Keyboard from "./Keyboard.js";
import { io } from "socket.io-client";

const ChatApp = ({
  user,
  allUsers,
  image,
  imagePath,
  setOnlineUsers,
  onlineUsers,
  loggedOut
}) => {
  const [users, setUsers] = useState([]);
  const [searchNewChat, setSearchNewChat] = useState("");
  const [chatMembers, setMembers] = useState([]);
  const [chatHeaderUser, setChatHeaderUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);

  const socket = useRef();
  useEffect(() => {
    const chatsFetch = async () => {
      try {
        const response = await fetch(`http://localhost:4000/chats/${user._id}`);
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.log(error);
      }
    };
    chatsFetch();
  }, [user, chats]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setReceivedMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  });
  useEffect(() => {
    receivedMessage &&
      currentChat.members.includes(receivedMessage.senderId) &&
      setMessages((prev) => [...prev, receivedMessage]);
  }, [receivedMessage, currentChat]);

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
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [currentChat]);

  const submitTextMessageHandler = async (event) => {
    event.preventDefault();
    try {
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
      console.log(receiverId);
      if (textMessage !== "") {
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId: receiverId,
          text: textMessage,
        });
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
        setMessages((prev) => [...prev, data]);
        console.log(data);
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);

    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <div className="chatApp">
        {/* left side app (search and chats)  */}
        <div className="left-side">
          {/* search container */}
          <Search
            searchNewChat={searchNewChat}
            setSearchNewChat={setSearchNewChat}
            users={users}
            openChatFetch={openChatFetch}
            imagePath={imagePath}
            image={image}
          />
          {/* ---------------------------------------- */}

          {/* chats container */}
          <div className="chats">
            {chatMembers?.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Chats
                  chat={chat}
                  setChatHeaderUser={setChatHeaderUser}
                  user={user}
                  imagePath={imagePath}
                  image={image}
                  online={checkOnlineStatus(chat)}
                  // isOnline={isOnline}
                />
              </div>
            ))}
          </div>
          {/* ---------------------------------------- */}
        </div>
        {/* ---------------------------------------- */}

        {/* right side app (conversations)  */}
        <div className="right-side">
          {/* Chat Header Container */}
          <ChatHeader
            chatHeaderUser={chatHeaderUser}
            imagePath={imagePath}
            image={image}
            loggedOut={loggedOut}
          />
          {/* ---------------------------------------- */}

          {/* conversation Container */}
          <Chat
            currentChat={currentChat}
            user={user}
            messages={messages}
            imagePath={imagePath}
            image={image}
            allUsers={allUsers}
          />
          {/* ---------------------------------------- */}

          {/* keyboard container */}
          <Keyboard
            textMessage={textMessage}
            setTextMessage={setTextMessage}
            submitTextMessageHandler={submitTextMessageHandler}
          />
          {/* ---------------------------------------- */}
        </div>
        {/* ---------------------------------------- */}
      </div>
    </>
  );
};

export default ChatApp;
