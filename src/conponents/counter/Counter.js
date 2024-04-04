import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../dataContext/dataContext';
import styles from "./counter.module.css";
import SandClock from "../../utils/Animation - 1711074928067.gif";
import notificationSound from "../../utils/simple-notification-152054.mp3";
const Counter = ({onReset}) => {
    const { targetDate , targetEvent} = useContext(DataContext);
    const [isRunning, setIsRunning] = useState(true);
    const [timeleft, setTimeleft] = useState({ day: 0, hours: 0, minutes: 0, seconds: 0 });
    const [playNotification, setPlayNotification]=useState(false);

    const calculateTimeleft = () => {
        const difference = new Date(targetDate) - new Date();
        let timeleft = { day: 0, hours: 0, minutes: 0, seconds: 0 };
        if (difference > 0) {
            timeleft = {
                day: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeleft;
    };

    const playNotificationSound = () => {
      const audio = new Audio(notificationSound);
      audio.play();
  };
    useEffect(() => {
        if (targetDate && isRunning) {
            const timer = setInterval(() => {
                const newTimeLeft = calculateTimeleft();
                setTimeleft(newTimeLeft);
                localStorage.setItem("timeLeft", JSON.stringify(newTimeLeft));
                if (newTimeLeft.day === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
                    handleComplete();
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isRunning, targetDate]);

    const handleComplete = () => {
        alert("Task completed")
        setIsRunning(false);
        setPlayNotification(true);
        playNotificationSound();
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeleft({ day: 0, hours: 0, minutes: 0, seconds: 0 });
        onReset();
    };

    const formateTragetDate=(dateString)=>{
      const date= new Date(dateString);
      const year=date.getFullYear();
      const month=date.getMonth();
      const day=date.getDate();
      const hours=date.getHours();
      const minutes=date.getMinutes();
      return `${day}-${month}-${year}--${hours}:${minutes}`;
    }
    return (
        <div className={styles.container}>
            <img className={styles.img} src={SandClock} alt="animation" />
            <h2 className={styles.font}>{targetEvent}:<span className={styles.date}>{formateTragetDate(targetDate)}</span></h2>
<br/>
            <h2 className={styles.font}>Time Left:</h2>
            <div className={styles.CardContainer}>
              <div className={styles.card}>{timeleft.day} days</div>
              <div className={styles.card}>{timeleft.hours} hours</div>
              <div className={styles.card}> {timeleft.minutes} minutes</div>
              <div className={styles.card}> {timeleft.seconds} seconds</div>
            </div>
            <p> </p>
            <button className={styles.button} onClick={toggleTimer}>{isRunning ? "Pause" : "Resume"}</button>
            <button className={styles.button} onClick={resetTimer}>Reset</button>
        </div>
    );
};

export default Counter;
