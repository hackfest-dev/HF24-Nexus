import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const AssetDistributionChart = ({ holdingsData, listOfCoins }) => {
  const [tokenCounts, setTokenCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Wait for listOfCoins to be available
        await new Promise((resolve) => {
          if (listOfCoins) {
            resolve();
          } else {
            const interval = setInterval(() => {
              if (listOfCoins) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          }
        });

        const counts = holdingsData.reduce((acc, holding) => {
          const tokenName = holding.token_name;
          if (!acc[tokenName]) {
            acc[tokenName] = 0;
          }
          acc[tokenName] +=
            holding.quantity * listOfCoins[holding.token_symbol]?.price;
          return acc;
        }, {});

        setTokenCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [holdingsData, listOfCoins]);

  const data = {
    labels: Object.keys(tokenCounts),
    datasets: [
      {
        data: Object.values(tokenCounts),
        backgroundColor: [
          "red",
          "darkblue",
          "yellow",
          "orange",
          "green",
          "purple",
          "violet",
          "cyan"
          // Add more colors if you have more cryptocurrencies
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          // Add more border colors if you have more cryptocurrencies
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
  plugins: {
    title: {
      display: true,
      text: "Asset Distribution",
      font: {
        size: 24, // Adjust the font size as needed
        weight: 'bold' // You can also specify font weight if desired
      },
    },
  },
};


  return <Pie data={data} options={options} />;
};

export default AssetDistributionChart;
