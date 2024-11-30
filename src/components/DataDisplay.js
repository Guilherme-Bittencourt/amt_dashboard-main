import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/dados");
        setData(response.data);
        console.log(data)
        setError(null);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  const processBarChartData = (data) => {
    const labels = [...new Set(data.map((row) => row.tipo_residuo || "Unknown"))];
    const totals = labels.map((label) => {
      return data.reduce((sum, row) => {
        return row.tipo_residuo === label ? sum + (row.valor || 0) : sum;
      }, 0);
    });

    return {
      labels,
      datasets: [
        {
          label: "Resíduos",
          data: totals,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    };
  };

  const processLineChartData = (data) => {
    const labels = [...new Set(data.map((row) => row.mes || "Unknown"))];
    const values = labels.map((month) => {
      return data.reduce((sum, row) => {
        return row.mes === month ? sum + (row.valor || 0) : sum;
      }, 0);
    });

    return {
      labels,
      datasets: [
        {
          label: "Evolução Mensal",
          data: values,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
      ],
    };
  };

  const processDoughnutChartData = (data) => {
    const labels = [...new Set(data.map((row) => row.tipo_residuo || "Unknown"))];
    const totals = labels.map((label) => {
      return data.reduce((sum, row) => {
        return row.tipo_residuo === label ? sum + (row.valor || 0) : sum;
      }, 0);
    });

    return {
      labels,
      datasets: [
        {
          label: "Proporção de Resíduos",
          data: totals,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
          ],
        },
      ],
    };
  };

  const barChartData = processBarChartData(data);
  const lineChartData = processLineChartData(data);
  const doughnutChartData = processDoughnutChartData(data);

  const total = data
  .filter(item => item.tipo_residuo === "TOTAL") // Filtra pelo tipo_residuo
  .reduce((sum, item) => {
    return sum + Object.entries(item)
      .filter(([key, value]) => !isNaN(parseFloat(value))) // Apenas valores numéricos
      .reduce((subSum, [key, value]) => subSum + parseFloat(value), 0);
  }, 0);


  return (
    
    <div className="p-6 font-sans">
      {error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Period Time */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-secondary text-sm font-outfit font-semibold lowercase">ano de coleta dos dados</h3>
            <p className="text-primary text-xl font-outfit">{data.ano}</p> 
          </div>
          {/* Total Count */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-secondary text-sm font-outfit font-semibold lowercase">Total de resíduos processados</h3>
            <p className="text-primary text-lg font-outfit">
              {total}
            </p>
          </div>
          {/* Bar Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-secondary text-sm font-outfit font-semibold lowercase">Gráfico de Barras</h3>
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>

          {/* Line Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-secondary text-sm font-outfit font-semibold lowercase">Gráfico de Linha</h3>
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-secondary text-sm font-outfit font-semibold lowercase">Gráfico de Rosca</h3>
            <Doughnut data={doughnutChartData} options={{ responsive: true }} />
          </div>
        </div>
      )}
    </div>
  );
};