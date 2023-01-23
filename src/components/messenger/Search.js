import "./Search.css";

const Search = ({
  searchNewChat,
  setSearchNewChat,
  users,
  openChatFetch,
  imagePath,
  image,
}) => {
  return (
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
                <img
                  src={
                    user.profilePicture
                      ? imagePath + user.profilePicture
                      : image
                  }
                  alt=""
                  className="userImage"
                />
                <span className={user.isOnline && "status"}></span>
              </div>
              <div /* className="userInfo" */>
                <p className="chatUsername">{user.fullName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
