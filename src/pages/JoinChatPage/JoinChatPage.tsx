import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useChat from "../../hooks/useChat";
import FreeRooms from "../../components/FreeRooms/FreeRooms";

import styles from "./JoinChatPage.module.css";
import { useNavigate } from "react-router-dom";

export default function JoinChatPage() {
  const [roomValues, setRoomValues] = useState({ name: "", room: "" });
  const [isValid, setIsValid] = useState(true);

  const { joinChat, resStatus } = useChat();

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (resStatus?.type === "success") {
      const { name, room } = resStatus.userDto;
      navigate(`/chat?name=${name}&room=${room}`);
    }
  }, [resStatus, navigate]);

  useEffect(() => {
    if (resStatus?.type === "error") {
      toast({
        title: "Ошибка при подключении к комнате",
        description: resStatus.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [resStatus, toast]);

  function handleJoin() {
    if (!roomValues.name || !roomValues.room) {
      setIsValid(false);
      return;
    }

    localStorage.setItem("isJoining", "true"); //protect link join

    joinChat(roomValues);
  }

  return (
    <>
      <div className={styles["chat-wrap"]}>
        <h3 className={styles["heading"]}>Подключитесь к комнате</h3>
        <FormControl isInvalid={!isValid}>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormLabel>Введите имя</FormLabel>
            <Input
              type="text"
              isInvalid={!isValid && !roomValues.name}
              onChange={(e) =>
                setRoomValues({ ...roomValues, name: e.target.value })
              }
              value={roomValues.name}
              required
            />
            <FormLabel>Введите название комнаты</FormLabel>
            <Input
              type="text"
              isInvalid={!isValid && !roomValues.room}
              onChange={(e) =>
                setRoomValues({ ...roomValues, room: e.target.value })
              }
              value={roomValues.room}
              required
            />
            {!isValid && (!roomValues.name || !roomValues.room) && (
              <FormErrorMessage>Оба поля обязательны</FormErrorMessage>
            )}
            <Button
              colorScheme="blue"
              className={styles["btn"]}
              onClick={handleJoin}
            >
              Подключиться к комнате
            </Button>
          </form>
        </FormControl>
      </div>

      <FreeRooms joinChat={joinChat} />
    </>
  );
}
