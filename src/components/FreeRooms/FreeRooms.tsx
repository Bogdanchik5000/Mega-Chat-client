import { useState } from "react";
import { Button, FormControl, Input } from "@chakra-ui/react";
import useSocket from "../../hooks/useSocket";
import { IUserDto } from "../../interfaces/chat.interface";

import styles from "./FreeRooms.module.css";

interface FreeRoomsProps {
  joinChat: (user: IUserDto) => void;
}

export default function FreeRooms({ joinChat }: FreeRoomsProps) {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);

  const freeRooms = useSocket<null | string[]>("getFreeRooms");

  function handleJoin(room: string) {
    if (!name) {
      setIsValid(false);
      return;
    }

    localStorage.setItem("isJoining", "true"); //protect link join
    joinChat({ name, room });
  }

  return (
    <div className={`${styles["chat-wrap"]} ${styles["free-rooms"]}`}>
      <h3 className={styles["heading"]}>Выбрать из списка свободных комнат</h3>
      <FormControl isInvalid={!isValid && !name}>
        <Input
          type="text"
          placeholder="Введите имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </FormControl>
      <div className={styles["rooms"]}>
        {!freeRooms || !freeRooms.length ? (
          <span>Пока нет комнат</span>
        ) : (
          <>
            {freeRooms.map((room) => (
              <div className={styles["room"]} key={room}>
                <div
                  style={{ fontSize: 20, fontWeight: 500, marginBottom: 10 }}
                >
                  Комната: {room}
                </div>
                <Button colorScheme="blue" onClick={() => handleJoin(room)}>
                  Войти
                </Button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
