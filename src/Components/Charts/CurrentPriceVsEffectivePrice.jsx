import React, { useState, useEffect, useRef, Fragment } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import chart.js

const CurrentPricevsEffectivePriceChart = ({ data, loc }) => {
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [chartData, setChartData] = useState({});
  const chartRef = useRef(null);

  const handleChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredData = data.filter(
          (entry) => entry["Cryptocurrency Name"] === selectedCrypto
        );

        const dates = filteredData.map((entry) => entry.Date);
        const prices = filteredData.map((entry) => entry.Price);
        const avgPrices = filteredData.map(
          (entry) => entry["Average Buying Price"]
        );

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${selectedCrypto} Price`,
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
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedCrypto) {
      fetchData();
    } else {
      setChartData({});
    }
  });

  return (
    <div>
      <h2>Cryptocurrency Price Time Series</h2>
      <select value={selectedCrypto} onChange={handleChange}>
        <option value="">Select a cryptocurrency</option>
        {loc.map((coin, index) => (
          <option value={coin}>{coin}</option>
        ))}
      </select>
      <div>{chartData.labels && <Line data={chartData} ref={chartRef} />}</div>
    </div>
  );
};

export default CurrentPricevsEffectivePriceChart;
