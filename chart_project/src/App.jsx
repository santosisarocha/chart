import { useState } from "react";
import BarChart from "./components/BarChart.jsx";
import LayoutGraphic from "./components/layout.jsx";
import './App.css';
import PieChart from './components/PieChart.jsx';


function App() {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="App">
      <div className="chart-layout-container">
        {/* <LayoutGraphic />
       
        <div className="chart-container">
        <h3>Quantidade de Pessoas nas Filas x Horário</h3>
         
          <BarChart selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </div> */}
         <PieChart />
      </div>
    </div>
  );
}

export default App;
