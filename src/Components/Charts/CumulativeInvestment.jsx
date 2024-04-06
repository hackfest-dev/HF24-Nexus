import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const CumulativeInvestmentChart = ({ tradeData }) => {
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
        backgroundColor: "lightgrey", // Changed background color to light grey
        borderColor: "grey",
         // Changed border color to grey
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

  return <Line data={data} options={options} />;
};

export default CumulativeInvestmentChart;
