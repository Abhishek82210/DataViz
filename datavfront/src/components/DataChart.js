import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import './DataChart.css'; // Import the CSS

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const DataChart = ({ datasetName }) => {
  const [chartType, setChartType] = useState('line');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the GET endpoint that accepts datasetName as a path variable
        const response = await axios.get(`https://wandering-jackelyn-my-backend-b9f6cca0.koyeb.app/${datasetName}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [datasetName]);

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [{
      label: datasetName,
      data: data.map(item => item.value),
      backgroundColor: [
        'rgba(52, 152, 219, 0.7)',
        'rgba(155, 89, 182, 0.7)',
        'rgba(26, 188, 156, 0.7)',
        'rgba(241, 196, 15, 0.7)'
      ],
      borderColor: [
        'rgba(52, 152, 219, 1)',
        'rgba(155, 89, 182, 1)',
        'rgba(26, 188, 156, 1)',
        'rgba(241, 196, 15, 1)'
      ],
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        padding: 12,
        usePointStyle: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="chart-section">
      <h2>{datasetName} Analysis Dashboard</h2>
      
      <div className="chart-type-selector">
        <button 
          className={chartType === 'line' ? 'active' : ''}
          onClick={() => setChartType('line')}
        >
          Line Chart
        </button>
        <button 
          className={chartType === 'bar' ? 'active' : ''}
          onClick={() => setChartType('bar')}
        >
          Bar Chart
        </button>
        <button 
          className={chartType === 'pie' ? 'active' : ''}
          onClick={() => setChartType('pie')}
        >
          Pie Chart
        </button>
      </div>

      <div className="chart-container">
        {chartType === 'line' && <Line data={chartData} options={chartOptions} />}
        {chartType === 'bar' && <Bar data={chartData} options={chartOptions} />}
        {chartType === 'pie' && <Pie data={chartData} options={chartOptions} />}
      </div>

      {data.length > 0 && (
        <div className="data-table">
          <h3>Raw Data</h3>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataChart;
