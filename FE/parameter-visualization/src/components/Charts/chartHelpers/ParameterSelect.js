import React from "react";

const ParameterSelect = ({
  uniqueParameters,
  selectedParameter,
  handleChange,
}) => {
  return (
    <div>
      <label>Select Parameter:</label>
      <select value={selectedParameter} onChange={handleChange}>
        <option value="">Filter by device</option>
        {uniqueParameters.map((label, index) => (
          <option key={index} value={label}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ParameterSelect;
