import { useEffect, useState } from "react";

export default function Timer() {
  const [timer, setTimer] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => {
        let { h, m, s } = prevTimer;

        s++;
        if (s === 60) {
          s = 0;
          m++;
        }

        if (m === 60) {
          m = 0;
          h++;
        }

        return { h, m, s };
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div style={{ fontSize: 18 }}>
      Время ожидания -{" "}
      {`${String(timer.h).padStart(2, "0")}:${String(timer.m).padStart(
        2,
        "0"
      )}:${String(timer.s).padStart(2, "0")}`}
    </div>
  );
}
