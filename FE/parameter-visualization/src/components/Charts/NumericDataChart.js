import React from "react";
import Plot from "react-plotly.js";

/**
 * NumericDataChart component renders a Plotly line chart for numeric sensor data.
 * @param {Object} props - Component props.
 * @param {Array} props.data - Array of chart data without filtering.
 * @param {Array} props.filteredData - Array of chart data filtered based on selected parameter.
 * @param {string} props.selectedParameter - Currently selected parameter for filtering.
 * @returns {JSX.Element} Numeric data chart component.
 */
const NumericDataChart = ({ data, filteredData, selectedParameter }) => {
  return (
    <div>
      <Plot
        data={selectedParameter ? filteredData : data}
        layout={{
          width: 800,
          height: 400,
          title: "Sensor Data Over Time",
          xaxis: {
            title: "Time",
            type: "date",
          },
          yaxis: {
            title: "Value",
          },
        }}
      />
    </div>
  );
};

export default NumericDataChart;
