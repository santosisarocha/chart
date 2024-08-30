import { useState, useEffect } from "react";
import BarChart from "./components/BarChart.jsx";
import { UserData } from "./Data";
import './App.css';

function App() {
  const situacaoColors = {
    'vermelho': 'rgba(0, 0, 0, 1)', // Vermelho sólido
    'amarelo': 'rgba(0, 0, 0, 1)', // Amarelo sólido
    'verde': 'rgba(0, 0, 0, 1)'    // Verde sólido
  };

  const getSituacaoValue = (situacao) => {
    switch (situacao) {
      case 'vermelho': return 3;
      case 'amarelo': return 2;
      case 'verde': return 1;
      default: return 0;
    }
  };

  const filterByDayOfWeek = (data, dayOfWeek) => {
    return data.filter((entry) => {
      const date = new Date(entry.datetime);
      return date.getDay() === dayOfWeek;
    });
  };

  const calculateAverageSituacao = (data) => {
    const groupedData = {};
    
    data.forEach((entry) => {
      const [datePart, timePart] = entry.datetime.split(' ');
      const [hour, minute] = timePart.split(':');
      const roundedMinute = Math.floor(minute / 30) * 30;
      const timeKey = `${datePart} ${hour}:${roundedMinute.toString().padStart(2, '0')}`;

      if (!groupedData[timeKey]) {
        groupedData[timeKey] = { total: 0, count: 0 };
      }

      groupedData[timeKey].total += getSituacaoValue(entry.situacao);
      groupedData[timeKey].count += 1;
    });

    const averagedData = Object.keys(groupedData).map((timeKey) => {
      const avgValue = groupedData[timeKey].total / groupedData[timeKey].count;
      const roundedAvgValue = Math.round(avgValue);
      const situacao = Object.keys(situacaoColors).find(key => getSituacaoValue(key) === roundedAvgValue);
      return {
        datetime: timeKey,
        situacao: situacao || 'verde', // Fallback para 'verde' caso a média seja entre valores
      };
    });

    return averagedData;
  };

  const [selectedDay, setSelectedDay] = useState(1); // 1 = Segunda-feira
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "Gráfico Pessoas nas filas x Horário",
      data: [],
      backgroundColor: [],
      borderColor: 'rgba(0, 0, 0, 1)', // Preto sólido para a linha
      borderWidth: 1,
      fill: false,
    }]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const filteredData = filterByDayOfWeek(UserData, selectedDay);
      const averagedData = calculateAverageSituacao(filteredData);

      setChartData({
        labels: averagedData.map((data) => data.datetime),
        datasets: [{
          label: "Gráfico Pessoas nas filas x Horário",
          data: averagedData.map((data) => getSituacaoValue(data.situacao)),
          backgroundColor: averagedData.map((data) => situacaoColors[data.situacao]),
          borderColor: 'rgba(0, 0, 0, 1)', // Preto sólido para a linha
          borderWidth: 1,
          fill: false,
        }]
      });
    }, 3000); // Atualiza a cada 3 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [selectedDay]);

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
      <div className="chart-container">
        <BarChart chartData={chartData} />
      </div>
    </div>
  );
}

export default App;
