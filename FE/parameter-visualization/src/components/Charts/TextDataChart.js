import React from "react";
import Plot from "react-plotly.js";

/**
 * TextDataChart component renders a Plotly line chart for text sensor data.
 * @param {Object} props - Component props.
 * @param {Array} props.data - Array of chart data without filtering.
 * @param {Array} props.filteredData - Array of chart data filtered based on selected parameter.
 * @param {string} props.selectedParameter - Currently selected parameter for filtering.
 * @returns {JSX.Element} Text data chart component.
 */
const TextDataChart = ({ data, filteredData, selectedParameter }) => {
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

export default TextDataChart;
