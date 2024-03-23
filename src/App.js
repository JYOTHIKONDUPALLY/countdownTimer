import './App.css';
import Home from "./conponents/HomePage/HomePage";
import { DataProvider } from "./conponents/dataContext/dataContext";
function App() {
  return (
    <div className="App">
         <DataProvider>
         <Home/>
         </DataProvider>

    </div>
  );
}

export default App;
