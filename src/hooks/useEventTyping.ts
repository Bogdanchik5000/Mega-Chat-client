import { useEffect, useState } from "react";
import socket from "../socket";

export default function useEventTyping(roomNum: string) {
  const [isTyping, setIsTyping] = useState(false);

  socket.on("isTyping", () => setIsTyping(true));

  useEffect(() => {
    if (!isTyping) return;

    const timeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isTyping]);

  function sendEventTyping() {
    socket.emit("isTyping", roomNum);
  }

  return { isTyping, sendEventTyping };
}
