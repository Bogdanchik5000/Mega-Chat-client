import { useEffect, useState } from "react";
import socket from "../socket";
import { IChat, IUserDto } from "../interfaces/chat.interface";

export default function useChatActions(userDto: IUserDto) {
  const [chatHistory, setChatHistory] = useState<IChat[]>([]);

  function sendMessage(message: string) {
    socket.emit("message", {
      roomNum: userDto.room,
      from: userDto.name,
      message,
    });
  }

  useEffect(() => {
    socket.emit("getMessagesHistory", userDto.room);
  }, [userDto.room]);

  useEffect(() => {
    socket.on("message", (res: IChat[]) => {
      setChatHistory(res);
    });

    socket.on("getMessagesHistory", (res: null | IChat[]) => {
      if (res) setChatHistory(res);
    });
  }, []);

  return { sendMessage, chatHistory };
}
