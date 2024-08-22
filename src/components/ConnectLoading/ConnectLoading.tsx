import { Spinner } from "@chakra-ui/react";
import styles from "./ConnectLoading.module.css";

export default function ConnectLoading() {
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        <h3 className={styles["logo-heading"]}>Mega Chat</h3>
        <img src="/favicon.png" width={50} alt="лого" />
      </div>
      <div className={styles.loader}>
        <p className={styles.text}>
          Уважаемые пользователи Mega Chat! Обращаем ваше внимание, что первый
          вход на сайт может занять немного больше времени, чем обычно. Это
          связано с тем, что разработчик использует бесплатный тариф для
          сервера. Благодарим вас за понимание и терпение!
        </p>
        <Spinner
          color="#3182ce"
          size="xl"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
        />
      </div>
    </div>
  );
}
