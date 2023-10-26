import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, Tooltip, LinearScale, CategoryScale, BarElement } from "chart.js";
import { useData } from "../DashboardComponent/DashboardData";


const ActivityChart = () => {
  
  const { activityList } = useData();

  
  const {duration, running, swimming, boxing, cycling, yoga } = useData()


  Chart.register(LinearScale, CategoryScale, BarElement, Tooltip);

  const data = {
    labels: ["Yoga", "Running", "Cycling", "Swimming", "Boxing"],
    datasets: [
      {
        label: "time(s)",
        data: [yoga.length, running.length, cycling.length, swimming.length, boxing.length],
        backgroundColor: [
          "#EB57A2",
          "#FFDB58",
          "#ff9b05",
          "#53D8B9",
          "#4B9FC9",
          "#A04FF7"

        ],
        hoverOffset: 16,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "center",
        labels: {
          generateLabels: function (chart) {
            const data = chart.data.datasets[0].data;
            const total = data.reduce((acc, value) => acc + value, 0);

            return data.map((value, index) => ({
              text: `${chart.data.labels[index]} - ${(
                (value / total) * 100
              ).toFixed(10)}%`,
              class: "bold-label",
            }));
          },
        },
      },
      
      tooltip: {
        callbacks: {},
        titleFont: {
          weight: 900,
          size: 20,
        },
        bodyFont: {
          weight: 900,
          size: 20,
        },
      },
    },

    animation: { // Change to lowercase "animation"
      easing: "linear",
      duration: 1000, // Animation duration in milliseconds
    },
    responsesive: false,
    maintainAspectRatio:true,


    scales: {
      x: {
        ticks: {
          font: {
            size: 20,
            weight: 700,
          },
        },
      },
      y: {
        display:false,
        ticks: {
          font: {
            size: 20,
            weight: 800,
          },
        },
      },
    },
  };

  return (
    <div className="min-w-full">
      <Bar data={data} options={options} />
      {console.log("check  " + running.length)}
      {console.log("check 2 " + duration.running)}
    </div>
  );
};

export default ActivityChart;
