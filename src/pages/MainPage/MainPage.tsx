import { Button } from "@chakra-ui/react";

import styles from "./MainPage.module.css";
import { Link } from "react-router-dom";

export default function MainPage() {
  const isCancelSearch = localStorage.getItem("isCancel") === "true";

  if (isCancelSearch) localStorage.removeItem("isCancel");

  return (
    <>
      <div className="container">
        <div className={styles["main-wrapper"]}>
          <div className={styles.chat}>
            <h2 className={styles["chat-heading"]}>Анонимный чат онлайн</h2>
            <Link to={"/join"}>
              <Button colorScheme="blue">Войти в чат</Button>
            </Link>
          </div>
          <div className={styles["chat-info"]}>
            <h2 className={styles["chat-desc__heading"]}>
              Mega Chat: Анонимный текстовый чат
            </h2>
            <p className={styles["chat-desc"]}>
              Приглашаем вас в Mega Chat - идеальное место для анонимного
              текстового общения, безопасности и новых знакомств. В Mega Chat мы
              уважаем вашу приватность и предоставляем уникальную возможность
              анонимного общения, давая вам свободу выражать свои мысли и идеи
              без ограничений. Наш сервис гарантирует полную анонимность, что
              делает его идеальным выбором для тех, кто ищет анонимный чат без
              необходимости регистрации. Здесь вы можете найти друзей по
              интересам, поделиться секретами или просто провести время, общаясь
              на различные темы. Используйте возможность анонимного общения в
              чате, чтобы расширить свой кругозор, встретить интересных людей и
              обсудить все, что вам нравится, не боясь быть осужденными. Mega
              Chat - это не просто анонимный текстовый чат, это сообщество, где
              каждый может чувствовать себя свободно и в безопасности.
              Присоединяйтесь к нам прямо сейчас и начните общение без
              ограничений!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
