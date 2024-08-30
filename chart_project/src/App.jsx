import { useState } from "react";
import BarChart from "./components/BarChart.jsx";
import LayoutGraphic from "./components/layout.jsx";
import './App.css';

function App() {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="App">
      

      <div className="day-selector">
        <label>Selecione o dia da semana:</label>
        <select value={selectedDay} onChange={(e) => setSelectedDay(parseInt(e.target.value))}>
          <option value={1}>Segunda-feira</option>
          <option value={2}>Terça-feira</option>
          <option value={3}>Quarta-feira</option>
          <option value={4}>Quinta-feira</option>
          <option value={5}>Sexta-feira</option>
          <option value={6}>Sábado</option>
        </select>
      </div>
      <div className="chart-layout-container">
        <LayoutGraphic />
        <div className="chart-container">
          <BarChart selectedDay={selectedDay} />
        </div>
      </div>
    </div>
  );
}

export default App;
