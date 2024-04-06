import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import chart.js

const CurrentPricevsEffectivePriceChart = ({ tradeData }) => {
  const [selectedCoin, setSelectedCoin] = useState("All");
  const uniqueCoins = [
    ...new Set(tradeData.map((trade) => trade["Cryptocurrency Name"])),
  ];
  const chartRef = useRef(null);

  const filteredData = tradeData.filter(
    (entry) => entry["Cryptocurrency Name"] === selectedCoin
  );

  const dates = filteredData.map((entry) => entry.Date);
  const prices = filteredData.map((entry) => entry.Price);
  const avgPrices = filteredData.map((entry) => entry["Average Buying Price"]);
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `${selectedCoin} Price`,
        data: prices,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        fill: true,
      },
      {
        label: `Effective Price`,
        data: avgPrices,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
        fill: true,
      },
    ],
  };

  const handleChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  const options = {
    scales: {
      x: {
        grid: {
          color: "grey", // Grey color for x-axis grid lines
        },
        ticks: {
          color: "grey", // Grey color for x-axis ticks
        },
      },
      y: {
        grid: {
          color: "grey", // Grey color for y-axis grid lines
        },
        ticks: {
          color: "grey", // Grey color for y-axis ticks
        },
      },
    },
  };

  return (
    <div style={{ fontFamily:"sans-serif", fontWeight:"bold", color:"grey"}}>
      <h2>Cryptocurrency Price Time Series</h2>
      <select value={selectedCoin} onChange={handleChange}>
        <option value="">Select a Cryptocurrency</option>
        {uniqueCoins.map((coin) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </select>
      <div>
        {chartData.labels && (
          <Line data={chartData} ref={chartRef} options={options} />
        )}
      </div>
    </div>
  );
};

export default CurrentPricevsEffectivePriceChart;
