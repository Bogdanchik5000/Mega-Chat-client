import { useEffect, useState } from "react";
import socket from "../socket";
import { IResponse, IUserDto } from "../interfaces/chat.interface";

export default function useChat() {
  const [resStatus, setResStatus] = useState<null | IResponse>(null);

  function joinChat(user: IUserDto) {
    setResStatus(null);
    socket.emit("joinChat", user);
  }

  function deleteChat(roomNum: string) {
    setResStatus(null);
    socket.emit("leftRoom", roomNum);
  }

  useEffect(() => {
    socket.on("joinChat", (res: IResponse) => {
      setResStatus(res);
    });

    socket.on("leftRoom", (res: IResponse) => {
      setResStatus(res);
    });

    return () => {
      socket.off("joinChat");
      socket.off("leftRoom");
    };
  }, []);

  return { joinChat, deleteChat, resStatus };
}
