import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { LinearScale, CategoryScale, ArcElement, Tooltip } from "chart.js";
import { useData } from "../DashboardComponent/DashboardData";

Chart.register(LinearScale, CategoryScale, ArcElement, Tooltip);

const DurationChart = () => {
  const { duration } = useData();

  const data = {
    labels: ["Yoga", "Running", "Cycling", "Swimming", "Boxing"],
    datasets: [
      {
        data: [
          duration.yoga,
          duration.running,
          duration.cycling,
          duration.swimming,
          duration.boxing,
        ],
        backgroundColor: [
          "#EB57A2",
          "#FFDB58",
          "#ff9b05",
          "#53D8B9",
          "#4B9FC9",
        ],
        hoverOffset: 14,
      },
    ],
  };

  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "center",
        labels: {
          generateLabels: function (chart) {
            return data.labels.map((label, index) => ({
              text: `${data.labels[index]}`,
              color: data.datasets[0].backgroundColor[index], // Color for the block
              class: "bold-label",
            }));
          },
        },
      },
      tooltip: {
        callbacks: {},
        titleFont: {
          weight: 700,
          size: 30,
        },
        bodyFont: {
          weight: 700,
          size: 30,
        },
      },
    },
    animation: {
      easing: "easeOutQuad",
      duration: 2000,
    },
  };

  const percentageData = data.datasets[0].data.map(
    (value) => ((value / total) * 100).toFixed(2) + "%"
  );

  return (
    <div>
      <Doughnut data={data} options={options} width={"full"} />
      <div className="flex flex-col space-y-4 mt-4">
        {percentageData.map((percentage, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center">
              <div
              className=" rounded-full"
                style={{
                  display: "inline-block",
                  width: "30px", // Adjust the width of the color block
                  height: "30px", // Adjust the height of the color block
                  backgroundColor: data.datasets[0].backgroundColor[index],
                  marginRight: "5px", // Adjust the spacing between the block and label
                }}
              ></div>
              <div>{data.labels[index]}</div>
            </div>

            <div className=" text-end">{percentage}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DurationChart;
