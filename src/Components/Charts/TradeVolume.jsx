import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const TradeVolumeChart = () => {
  const [tradeData, setTradeData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("All");

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        setTradeData(data);
      })
      .catch((error) => {
        console.error("Error fetching trade data:", error);
      });
  }, []);

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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
          text: "Amount",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div>
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
