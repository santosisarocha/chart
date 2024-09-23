import { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { UserData } from '../Data';

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ selectedDay }) {
  const chartRef = useRef(null);

  const filterByDayOfWeek = (data, dayOfWeek) => {
    return data.filter((entry) => {
      const date = new Date(entry.datetime);
      return date.getDay() === dayOfWeek;
    });
  };

  const calculateRealQuantidade = (data) => {
    const groupedData = {};

    data.forEach((entry) => {
      const [datePart, timePart] = entry.datetime.split(' ');
      const [hour, minute] = timePart.split(':');
      const roundedMinute = Math.floor(minute / 10) * 10;
      const timeKey = `${hour}:${roundedMinute.toString().padStart(2, '0')}`;

      if (!groupedData[timeKey]) {
        groupedData[timeKey] = { totalQuantidade: 0, count: 0 };
      }

      groupedData[timeKey].totalQuantidade += entry.quantidade;
      groupedData[timeKey].count += 1;
    });

    const resultData = Object.keys(groupedData).map((timeKey) => {
      const avgQuantidade = groupedData[timeKey].totalQuantidade / groupedData[timeKey].count;
      return {
        datetime: timeKey,
        quantidade: avgQuantidade,
      };
    });

    return resultData;
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "Quantidade de Pessoas nas Filas",
      data: [],
      backgroundColor: [],
      borderColor: 'transparent',
      borderRadius: 50,
    }]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const filteredData = filterByDayOfWeek(UserData, selectedDay);
      const realData = calculateRealQuantidade(filteredData);

      const chart = chartRef.current;
      const ctx = chart?.ctx;

      if (ctx) {
        const gradientColors = realData.map(() => {
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(125,131,137,1)'); // Cor clara no topo
          gradient.addColorStop(1, 'rgba(46,48,51,1)');   // Cor escura no final
          return gradient; // Retorna o gradiente para cada barra
        });

        setChartData({
          labels: realData.map((data) => data.datetime),
          datasets: [{
            label: "Quantidade de Pessoas nas Filas",
            data: realData.map((data) => data.quantidade),
            backgroundColor: gradientColors,
            borderColor: 'transparent',
            borderRadius: 5,
          }]
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedDay]);

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Quantidade de Pessoas nas Filas x Horário',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawOnChartArea: false,
          color: 'rgba(200, 200, 200, 0.2)',
          tickLength: 5,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
        },
      },
      y: {
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
        },
        beginAtZero: true,
      }
    },
    layout: {
      backgroundColor: '#2e2e2e',
    },
  };

  return <Bar ref={chartRef} data={chartData} options={chartOptions} />;
}

export default BarChart;
