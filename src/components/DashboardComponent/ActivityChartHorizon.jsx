import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, scales } from "chart.js";
import { LinearScale, CategoryScale, BarElement } from "chart.js";
import { useData } from "../ActivityComponent/ActivityData";
import { Tooltip } from "chart.js";

const ActivityChartHorizon = () => {

  Chart.register(LinearScale, CategoryScale, BarElement, Tooltip);

  const data = {
    labels: ["Yoga", "Running", "Cycling", "Swimming", "Boxing"],
    datasets: [
      {
        axis:'y',
        label: "minute(s)",
        data: [30, 20, 30, 40, 30],
        backgroundColor: [
          "#EB57A2",
          "#FFDB58",
          "#ff9b05",
          "#53D8B9",
          "#4B9FC9",
        ],
        hoverBackgroundColor: [
          "#EB57A2",
          "#FFDB58",
          "#ff9b05",
          "#53D8B9",
          "#4B9FC9",
        ],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    indexAxis:'y',
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          generateLabels: function (chart) {
            const data = chart.data.datasets[0].data;
            const total = data.reduce((acc, value) => acc + value, 0);

            return data.map((value, index) => ({
              text: `${chart.data.labels[index]} - ${(
                (value / total) * 100
              ).toFixed(10)}%`,
            }));
          },
        },
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          const value = data.datasets[0].data[tooltipItem.index];
          return `${label}: ${value}%`;
        },
      },
    },
    categorySpacing: 10,
    scales: {
      x: {
        ticks: {
          font: {
            size: 20,
            weight: 900,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 20,
            weight: 900,
          },
        },
      },
    },
  };

  return (
    <div className=" px-3 h-full">
      <Bar data={data} options={options} height={"400"}/>
    </div>
  );
};

export default ActivityChartHorizon;
