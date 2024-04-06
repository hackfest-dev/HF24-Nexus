import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const TransactionTypeChart = ({ tradeData }) => {
  const transactionTypes = tradeData.reduce((acc, trade) => {
    const type = trade["Transaction Type"];
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type]++;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(transactionTypes),
    datasets: [
      {
        data: Object.values(transactionTypes),
        backgroundColor: [
          "green",
          "red",
          // Add more colors if you have more transaction types
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          // Add more border colors if you have more transaction types
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Transaction Types",
        font: {
          size: 24, // Adjust the font size as needed
          weight: 'bold' // You can also specify font weight if desired
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default TransactionTypeChart;
