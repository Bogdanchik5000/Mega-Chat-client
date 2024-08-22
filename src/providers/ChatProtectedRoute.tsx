import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ChatProtectedRouteProps {
  children: ReactNode;
}

export default function ChatProtectedRoute({
  children,
}: ChatProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const isJoining = localStorage.getItem("isJoining");
    const isReConnect = localStorage.getItem("reConnect");

    const validReConnect = isReConnect
      ? Date.now() - +isReConnect < 300000
      : false;

    if (!isJoining && !validReConnect) {
      navigate("/join");
    }

    localStorage.removeItem("isJoining");
    localStorage.removeItem("reConnect");
  }, [navigate]);

  return children;
}
