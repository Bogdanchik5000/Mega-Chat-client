import { Link, Outlet } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

import styles from "./HeaderLayout.module.css";

export default function HeaderLayout() {
  const usersOnline = useSocket<number>("usersCount");

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles["header-wrapper"]}>
            <Link to={"/"} reloadDocument>
              <div className={styles["header-left"]}>
                <h1 className={styles["header-logo"]}>
                  Mega Chat <img src="/favicon.png" width={30} alt="" />
                </h1>
                <span>Всего онлайн: {usersOnline ?? "..."}</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
}
