import { Button, Spinner } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import { useEffect, useMemo } from "react";

import styles from "./ChatPage.module.css";
import useChat from "../../hooks/useChat";
import Timer from "../../components/Timer/Timer";
import Chat from "../../components/Chat/Chat";
import { IUserDto } from "../../interfaces/chat.interface";

interface IUserData {
  id: string;
  name: string;
}

export default function ChatPage() {
  const { search } = useLocation();
  const navigate = useNavigate();

  //Search Params
  const userDto = useMemo(() => {
    return Object.fromEntries(
      new URLSearchParams(search)
    ) as unknown as IUserDto;
  }, [search]);

  const usersData = useSocket<null | IUserData[]>("waitFriend", userDto);

  const { deleteChat } = useChat();

  useEffect(() => {
    if (usersData?.length === 0) {
      navigate("/join");
    }
  }, [usersData, navigate]);

  function cancelSearch() {
    deleteChat(userDto.room);
    navigate("/join");
  }

  return (
    <div className="container">
      {!usersData ? (
        <div className={styles["loading-wrap"]}>
          <h3 className={styles.heading}>Ожидание собеседника</h3>
          <Timer />
          <Spinner
            color="#3182ce"
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
          />
          <Button colorScheme="blue" onClick={cancelSearch}>
            Покинуть комнату
          </Button>
        </div>
      ) : (
        <Chat usersData={usersData} userDto={userDto} />
      )}
    </div>
  );
}
