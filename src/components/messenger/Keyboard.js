const Keyboard = ({
  textMessage,
  setTextMessage,
  submitTextMessageHandler,
}) => {
  return (
    <div className="keyboard">
      <input
        type="text"
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
      />
      <button onClick={submitTextMessageHandler} className="sendBtn">
        send
      </button>
    </div>
  );
};

export default Keyboard;
