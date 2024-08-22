import { ReactNode, useEffect, useState } from "react";
import socket from "../socket";
import ConnectLoading from "../components/ConnectLoading/ConnectLoading";

export default function ConnectLoadingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 3000);

    socket.on("connect", () => {
      clearTimeout(timer);
      setIsLoading(false);
      setIsConnect(true);
    });

    return () => {
      clearTimeout(timer);
      socket.disconnect();
    };
  }, []);

  if (isLoading) {
    return <ConnectLoading />;
  }

  if (isConnect) {
    return children;
  }
}
