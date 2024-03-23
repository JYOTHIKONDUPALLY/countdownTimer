import styles from "./InputTarget.module.css";
import {useContext} from "react";
import { DataContext} from "../dataContext/dataContext";
const InputTarget = ({onSubmit}) => {
    const {targetDate, setTargetDate, targetEvent, setTargetEvent}=useContext(DataContext);

    const handleDateChange=(e)=>{
        const date=e.target.value;
        const currentDate=new Date();
        const selectedDate=new Date(date);
        const difference= Math.floor((selectedDate-currentDate)/(1000*60*60*24))
        if(selectedDate>currentDate && difference<=99){
            setTargetDate(date);
            localStorage.setItem('targetDate', date)
        }else if(selectedDate<currentDate){
            alert("Invalid date.Selected date is not valid to set timer")
        }
        else if(selectedDate>difference){
            alert("please select the date from the next 100 days ")
        }
       
    }
    const handleEventChange=(e)=>{
        const eventName=e.target.value;
        setTargetEvent(eventName);
        localStorage.setItem("targetEvent", eventName)
    }
    const handleSubmit=()=>{
        if(targetDate==="" && targetEvent===""){
            alert("please enter the event and date")
        }
        else if(targetDate===""){
            alert("enter the date")
        }
        else if(targetEvent===""){
            alert("please enter the event name like meeting, aniversary ....")
        }
        else{
            onSubmit();
        }

    }

  return (
    <div className={styles.container}>
        <form className={styles.form}>
        <lable htmlFor="targetDate">Enter Target Date and time:</lable>
        <input id="event" className={styles.input} type="text" placeholder="enter event name" value={targetEvent} onChange={handleEventChange}/>
        <input className={styles.input} type="datetime-local"
        id="targetDate"
        value={targetDate}
        onChange={handleDateChange}
        />
        <button className={styles.button} onClick={handleSubmit}>Submit</button>
    </form>
    </div>
  )
}

export default InputTarget