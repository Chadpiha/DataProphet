import React from "react";
import Plot from "react-plotly.js";

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
