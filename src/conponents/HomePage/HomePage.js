import React ,{useState}from 'react';
import InputTarget from "../InputTarget/InputTarget";
import Counter from "../counter/Counter";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [inputFormVisible, setinputFormVisible]=useState(true);
  const [counterVisible, setCounterVisible]=useState(false);

  const handleInputFormSubmit=()=>{
    setinputFormVisible(false);
    setCounterVisible(true);
  }

  const handleCounterCancel=()=>{
    setinputFormVisible(true);
    setCounterVisible(false);
  }
  return (
    <div className={styles.container}>
        <h1 className={styles.font}>Countdown timer</h1>
        {inputFormVisible && <InputTarget onSubmit={handleInputFormSubmit}/>}
        {counterVisible && <Counter onReset={handleCounterCancel}/>}
    </div>
  )
}

export default HomePage