import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { UserData } from '../Data';

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ selectedDay }) {
  const situacaoColors = {
    'vermelho': 'rgba(0, 0, 0, 1)',
    'amarelo': 'rgba(0, 0, 0, 1)',
    'verde': 'rgba(0, 0, 0, 1)'
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
        situacao: situacao || 'verde',
      };
    });

    return averagedData;
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "Gráfico Pessoas nas filas x Horário",
      data: [],
      backgroundColor: [],
      borderColor: 'rgba(0, 0, 0, 1)',
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
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          fill: false,
        }]
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedDay]);

  return <Line data={chartData} />;
}

export default BarChart;
