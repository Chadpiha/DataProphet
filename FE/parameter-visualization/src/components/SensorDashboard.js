import React, { useState, useEffect } from "react";
import axios from "axios";
import NumericDataChart from "./Charts/NumericDataChart";
import TextDataChart from "./Charts/TextDataChart";
import ParameterSelect from "./Charts/chartHelpers/ParameterSelect";

const SensorDashboard = () => {
  const [chartNumericData, setNumericChartData] = useState([]);
  const [chartTextData, setTextChartData] = useState([]);
  const [selectedNumericParameter, setSelectedNumericParameter] = useState("");
  const [selectedTextParameter, setSelectedTextParameter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Function to fetch data from the API and update state variables.
   */
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/all-data");
      setNumericChartData(formatChartData(response.data, "numeric"));
      setTextChartData(formatChartData(response.data, "text"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /**
   * Function to format raw data fetched from the API into chart data format.
   * @param {Object} data - Raw sensor data fetched from the API.
   * @param {string} filterType - Type of data to filter (numeric or text).
   * @returns {Array} Formatted chart data.
   */
  const formatChartData = (data, filterType) => {
    const datasets = Object.entries(data).map(([device, entries]) => {
      const deviceData = entries
        .filter((entry) => entry.type === filterType)
        .map((entry) => ({
          x: new Date(entry.timestamp).getTime(),
          y: entry.type === "numeric" ? parseFloat(entry.value) : entry.value,
          label: entry.parameter, // Include label for each point
        }));

      return {
        x: deviceData.map((point) => point.x),
        y: deviceData.map((point) => point.y),
        text: deviceData.map((point) => point.label), // Set text to display label on hover
        mode: "markers",
        name: device,
        type: "scatter",
      };
    });

    return datasets;
  };

  const handleNumericParameterChange = (e) => {
    setSelectedNumericParameter(e.target.value);
  };

  const handleTextParameterChange = (e) => {
    setSelectedTextParameter(e.target.value);
  };

  /**
   * Function to filter chart data based on selected parameter and data type.
   * @param {Array} chartData - Original chart data.
   * @param {string} selectedParameter - Selected parameter to filter.
   * @param {string} dataType - Type of data (numeric or text).
   * @returns {Array} Filtered chart data.
   */
  const filterChartData = (chartData, selectedParameter) => {
    return chartData.map((dataset) => ({
      ...dataset,
      x: dataset.x.filter(
        (_, index) => dataset.text[index] === selectedParameter
      ),
      y: dataset.y.filter(
        (_, index) => dataset.text[index] === selectedParameter
      ),
      text: dataset.text.filter((label) => label === selectedParameter),
    }));
  };

  // Usage:
  const filteredNumericData = filterChartData(
    chartNumericData,
    selectedNumericParameter
  );
  const filteredTextData = filterChartData(
    chartTextData,
    selectedTextParameter
  );

  /**
   * Function to get unique parameters from chart data.
   * @param {Array} chartData - Original chart data.
   * @returns {Array} Array of unique parameters.
   */
  const getUniqueParameters = (chartData) => {
    return chartData.length > 0 ? Array.from(new Set(chartData[0].text)) : [];
  };

  const uniqueNumericParameters = getUniqueParameters(chartNumericData);
  const uniqueTextParameters = getUniqueParameters(chartTextData);

  return (
    <div className="dashboard-container">
      <h1>Sensor Data Dashboard</h1>
      <ParameterSelect
        uniqueParameters={uniqueNumericParameters}
        selectedParameter={selectedNumericParameter}
        handleChange={handleNumericParameterChange}
      />
      <NumericDataChart
        data={chartNumericData}
        filteredData={filteredNumericData}
        selectedParameter={selectedNumericParameter}
      />
      <ParameterSelect
        uniqueParameters={uniqueTextParameters}
        selectedParameter={selectedTextParameter}
        handleChange={handleTextParameterChange}
      />
      <TextDataChart
        data={chartTextData}
        filteredData={filteredTextData}
        selectedParameter={selectedTextParameter}
      />
    </div>
  );
};

export default SensorDashboard;
