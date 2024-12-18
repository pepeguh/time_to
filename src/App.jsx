import { useEffect, useRef, useState } from "react";
import "./style.css";

function App() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [unit, setUnit] = useState("days");
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedMain, setIsClickedMain] = useState(false);
  const videoRef = useRef(null);
  const targetDate = new Date(2024, 11, 29, 6, 0);

  const now1 = new Date();
  const diff1 = targetDate - now1;
  const [isTimeOut, setIsTimeOut] = useState(diff1 > 0 ? false : true);

  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = targetDate - now;
    return diff > 0 ? diff : 0;
  };

  const getTimeInUnit = () => {
    if (unit === "days") {
      return Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    } else if (unit === "hours") {
      return Math.floor(timeLeft / (1000 * 60 * 60));
    } else if (unit === "mins") {
      return Math.floor(timeLeft / (1000 * 60));
    } else {
      return Math.floor(timeLeft / 1000);
    }
  };

  const changeUnit = () => {
    setIsClickedMain(true);
    setUnit((prevUnit) => {
      if (prevUnit === "days") return "hours";
      if (prevUnit === "hours") return "mins";
      if (prevUnit === "mins") return "secs";
      return "days";
    });
  };

  useEffect(() => {
    if (diff1 < 0) {
      setIsTimeOut(true);
    }
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Ошибка воспроизведения:", err);
      });
    }
  }, []);
  return (
    <div className="main_parent">
      <div className={!isTimeOut ? "main_content" : "main_content_timeLeft"}>
        <div className={!isTimeOut ? "top" : "top_timeLeft"}>
          {!isTimeOut && (
            <div className="main_nums" id="mainNums" onClick={changeUnit}>
              <div className="nums_div">
                {isClickedMain ? (
                  <p>
                    {getTimeInUnit()} {unit}
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "35px", margin: "0" }}>
                      Nastya bubnilka
                    </p>
                    <p
                      style={{
                        fontSize: "35px",
                        margin: "0",
                        color: "#ffc0ff",
                      }}
                    >
                      ❤
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="bot" onClick={() => setIsClicked(true)}>
          {isTimeOut ? (
            <div className="kobancheg_div">
              <span>Привет кобанчик мой камчатский</span>
              {isClicked ? (
                <video
                  ref={videoRef}
                  src="./koban.webm"
                  autoPlay
                  loop
                  onError={() => console.error("Ошибка загрузки видео")}
                ></video>
              ) : (
                <span>Нажми куда-нибудь</span>
              )}
            </div>
          ) : (
            <div className="bot_img_container">
              <img src="./pepega1.jpg"></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
