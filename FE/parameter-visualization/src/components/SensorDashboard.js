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

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/all-data");
      setNumericChartData(formatChartData(response.data, "numeric"));
      setTextChartData(formatChartData(response.data, "text"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const filterChartData = (chartData, selectedParameter, dataType) => {
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
    selectedNumericParameter,
    "numeric"
  );
  const filteredTextData = filterChartData(
    chartTextData,
    selectedTextParameter,
    "text"
  );

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
