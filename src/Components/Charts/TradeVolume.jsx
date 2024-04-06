import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const TradeVolumeChart = ({ tradeData }) => {
  const [selectedCoin, setSelectedCoin] = useState("All");

  const uniqueCoins = [
    ...new Set(tradeData.map((trade) => trade["Cryptocurrency Name"])),
  ];

  const filteredData =
    selectedCoin === "All"
      ? tradeData
      : tradeData.filter(
          (trade) => trade["Cryptocurrency Name"] === selectedCoin
        );

  // Bin the trade data by date
  const binnedData = filteredData.reduce((acc, trade) => {
    const date = trade.Date.split(" ")[0]; // Split the date and time
    if (!acc[date]) {
      acc[date] = { date, amount: 0 };
    }
    acc[date].amount += trade.Amount;
    return acc;
  }, {});

  const labels = Object.values(binnedData).map((item) => item.date);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Trade Volume",
        data: Object.values(binnedData).map((item) => item.amount),
        backgroundColor: "rgba(192, 75, 192, 0.6)", // Changed background color to a shade of purple
        borderColor: "rgba(192, 75, 192, 1)", // Changed border color to a shade of purple
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (USD)", // Adjusted y-axis title
        },
        grid: {
          color: "lightgrey", // Changed y-axis grid color to light grey
        },
        ticks: {
          color: "grey", // Changed y-axis ticks color to grey
        },
      },
      x: {
        title: {
          display: true,
          text: "Date", // Adjusted x-axis title
        },
        grid: {
          color: "lightgrey", // Changed x-axis grid color to light grey
        },
        ticks: {
          color: "grey", // Changed x-axis ticks color to grey
        },
      },
    },
  };

  return (
    <div style={{ color:"grey",fontFamily:"sans-serif", fontWeight:"bold"}}>
      <select
        value={selectedCoin}
        onChange={(e) => setSelectedCoin(e.target.value)}
      >
        <option value="All">All Coins</option>
        {uniqueCoins.map((coin) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </select>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TradeVolumeChart;
