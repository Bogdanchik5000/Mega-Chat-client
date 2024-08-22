import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUserData, IUserDto } from "../../interfaces/chat.interface";
import useChatActions from "../../hooks/useMessages";
import useChat from "../../hooks/useChat";
import useEventTyping from "../../hooks/useEventTyping";

import styles from "./Chat.module.css";

interface ChatProps {
  usersData: IUserData[];
  userDto: IUserDto;
}

export default function Chat({ usersData, userDto }: ChatProps) {
  const [message, setMessage] = useState("");

  const { deleteChat, resStatus } = useChat();
  const { sendMessage, chatHistory } = useChatActions(userDto);
  const { isTyping, sendEventTyping } = useEventTyping(userDto.room);

  const navigate = useNavigate();

  const friend =
    usersData.find((user) => user.name !== userDto.name)?.name ?? "Собеседник";

  function handleSendMessage() {
    if (!message) return; //handle send null message

    sendMessage(message);
    setMessage("");
  }

  function leftChat() {
    deleteChat(userDto.room);
    navigate("/join");
  }

  //handle reConnect after leave route
  useEffect(() => {
    return () => {
      localStorage.setItem("reConnect", Date.now().toString());
    };
  }, []);

  return (
    <div className={styles.chat}>
      <div className={styles["chat-top"]}>
        <div className={styles["user-info"]}>
          <img src="/circle-online.svg" />
          <span>{friend}</span>
        </div>
        <div className={styles["close-chat"]} onClick={leftChat}>
          <img src="/xmark.svg" width={15} />
        </div>
      </div>

      <div className={styles.main}>
        {chatHistory.map(({ from, message, id }) => (
          <div
            key={id}
            className={`${styles[`message`]} ${
              from === userDto.name ? styles["right"] : styles["left"]
            }`}
          >
            {message}
          </div>
        ))}

        {isTyping && <div className={styles["isTyping"]}>Печатает...</div>}

        {resStatus?.type === "leftRoom" && (
          <div className={styles["user-left"]}>
            <h3>Собеседник закончил общение</h3>
          </div>
        )}
      </div>

      {resStatus?.type !== "leftRoom" && (
        <div className={styles["chat-actions"]}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={styles["send-messages"]}
          >
            <input
              type="text"
              placeholder="Написать сообщение..."
              className={styles.input}
              onChange={(e) => {
                setMessage(e.target.value);
                sendEventTyping();
              }}
              value={message}
            />
            <button className={styles.send} onClick={handleSendMessage}>
              <img src="/send.svg" width={30} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
