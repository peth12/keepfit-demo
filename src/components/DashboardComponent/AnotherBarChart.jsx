import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  ArcElement,
  BarElement,
} from "chart.js";
import { useData } from "../DashboardComponent/DashboardData";
import { Tooltip } from "chart.js";

const DurationChart = () => {
  const { activityList } = useData();
  const { duration, running, swimming, boxing, cycling, yoga } = useData();

  ChartJS.register(LinearScale, CategoryScale, ArcElement, Tooltip, BarElement);
  const data = {
    labels: ["Yoga", "Running", "Cycling", "Swimming", "Boxing"],
    datasets: [
      {
        label: "time(s)",
        data: [
          yoga.length,
          running.length,
          cycling.length,
          swimming.length,
          boxing.length,
          boxing.length,
        ],
        backgroundColor: [
          "#EB57A2",
          "#FFDB58",
          "#ff9b05",
          "#53D8B9",
          "#4B9FC9",
          "#A04FF7",
        ],
        hoverOffset: 16,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        fullSize: true,
        position: "center",
        labels: {
          generateLabels: function (chart) {
            const data = chart.data.datasets[0].data;
            const total = data.reduce((acc, value) => acc + value, 0);

            return data.map((value, index) => ({
              text: `${chart.data.labels[index]} - ${(
                (value / total) *
                100
              ).toFixed(2)}%`,
              class: "bold-label",
            }));
          },
        },
      },
      tooltip: {
        callbacks: {},
        titleFont: {
          weight: 700,
          size: 40,
        },
        bodyFont: {
          weight: 700,
          size: 30,
        },
      },
    },
    scales: {
      x: {
        ticks: {

          font: {
            size: 20,
            weight: 1000,
          },
        },
      },
      y: {
        
        display: true,
        ticks: {
          stepSize:1,
          font: {
            size: 24,
            weight: 900,
          },
        },
      },
      xAxes: [ {
        type: 'time',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date'
        },
        ticks: {
          major: {
            fontStyle: 'bold',
            fontColor: '#FF0000'
          }
        }
      } ],
      yAxes: [ {
        type:"",
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      } ]
    },
    responsive: false,
    maintainAspectRatio: true,
    animation: {
      // Change to lowercase "animation"
      easing: "easeOutQuad",
      duration: 1000, // Animation duration in milliseconds
    },
  };

  return (
    <div className="pl-10">
      <Bar data={data} options={options} height="650px" width="900px" />
    </div>
  );
};

export default DurationChart;
