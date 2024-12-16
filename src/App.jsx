import { useEffect, useRef, useState } from "react";
import "./style.css";

function App() {
  const [timeLeft, setTimeLeft] = useState(0); // Оставшееся время
  const [unit, setUnit] = useState("days"); // Единицы измерения
  const [isClicked,setIsClicked] = useState(false)
  const [isClickedMain,setIsClickedMain] = useState(false)
  const videoRef = useRef(null)
  const targetDate = new Date(2024, 11, 29, 6, 0); // Целевая дата
  
  const now1 = new Date();
  const diff1 = targetDate - now1;
  const [isTimeOut,setIsTimeOut] = useState(diff1 > 0 ? false : true)
  // Вычисление оставшегося времени
  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = targetDate - now; // Разница в миллисекундах
    return diff > 0 ? diff : 0; // Если время истекло, возвращаем 0
  };

  // Установка времени в нужной единице
  const getTimeInUnit = () => {
    if (unit === "days") {
      return Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    } else if (unit === "hours"){
      return Math.floor(timeLeft / (1000 * 60 * 60));
    }else if (unit === "mins") {
      return Math.floor(timeLeft / (1000 * 60));
    } else {
      return Math.floor(timeLeft / 1000);
    }
  };

  // Переключение единиц измерения
  const changeUnit = () => {
    setIsClickedMain(true)
    setUnit((prevUnit) => {
      if (prevUnit === "days") return "hours"
      if (prevUnit === "hours") return "mins";
      if (prevUnit === "mins") return "secs";
      return "days";
    });
  };

  useEffect(() => {
    // Устанавливаем начальное значение времени
    if(diff1<0){
      setIsTimeOut(true)
    }
    setTimeLeft(calculateTimeLeft());

    // Интервал обновления
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval); // Очищаем интервал при размонтировании
  }, []); // Выполняем только при первом рендере

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Ошибка воспроизведения:", err);
      });
    }
  }, []);
  return (
    <div className="main_parent">
        <div className={!isTimeOut? "main_content":"main_content_timeLeft"}>
        <div className={!isTimeOut? "top":"top_timeLeft"}>
          {!isTimeOut&&
          <div
            className="main_nums"
            id="mainNums"
            onClick={changeUnit} // Используем React-событие
          >
            <div className="nums_div">
              {isClickedMain?
              <p>
                {getTimeInUnit()} {unit}
              </p>
              :
              <p>Press here</p>
            }
            </div>
          </div>
          
          
        }
        </div>
        <div className="bot" onClick={()=>setIsClicked(true)}>
        {isTimeOut?
        <div className="kobancheg_div">
          <span>Привет кобанчик мой камчатский</span>
          {isClicked?
          <video 
            ref={videoRef}
          src="./koban.webm"
           autoPlay
           loop
            onError={() => console.error("Ошибка загрузки видео")}

            ></video>
            :
            <span>Нажми куда-нибудь</span>
          }

        </div>
        :
        <div className="bot_img_container">
          <img src="./pepega1.jpg"></img>
        </div>
        }
        </div>
      </div>
    </div>
  );
}

export default App;
