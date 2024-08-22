import { useEffect, useState } from "react";
import socket from "../socket";

export default function useSocket<T>(event: string, data?: unknown) {
  const [socketResponse, setSocketResponse] = useState<T | null>(null);

  useEffect(() => {
    socket.emit(event, data);
    socket.on(event, (response: T) => {
      setSocketResponse(response);
    });

    return () => {
      socket.off(event);
    };
  }, [event, data]);

  return socketResponse;
}
