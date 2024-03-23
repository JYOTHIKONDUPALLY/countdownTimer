import { createContext, useState } from "react";

export const DataContext=createContext();

export const DataProvider=({children})=>{
    const [targetDate, setTargetDate] = useState(localStorage.getItem('targetDate')||"");
    const [targetEvent, setTargetEvent] = useState('');
  
    return (
      <DataContext.Provider value={{ targetDate, targetEvent, setTargetDate, setTargetEvent }}>
        {children}
      </DataContext.Provider>
    );
}