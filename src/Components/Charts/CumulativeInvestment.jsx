import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const CumulativeInvestmentChart = () => {
  const [tradeData, setTradeData] = useState([]);

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

  // Sort the trade data by date
  const sortedTradeData = tradeData.sort(
    (a, b) => new Date(a.Date) - new Date(b.Date)
  );

  // Calculate the cumulative investment
  const cumulativeInvestment = sortedTradeData.reduce((acc, trade) => {
    const currentDate = trade.Date.split(" ")[0];
    const amount =
      trade["Transaction Type"] === "BUY" ? trade.Amount : -trade.Amount;
    if (!acc[currentDate]) {
      acc[currentDate] = { date: currentDate, amount: amount };
    } else {
      acc[currentDate].amount += amount;
    }
    return acc;
  }, {});

  const labels = Object.values(cumulativeInvestment).map((item) => item.date);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cumulative Investment",
        data: Object.values(cumulativeInvestment).map((item) => item.amount),
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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

  return <Line data={data} options={options} />;
};

export default CumulativeInvestmentChart;
