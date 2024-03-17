import React from "react";

/**
 * ParameterSelect component renders a dropdown menu to select a parameter.
 * @param {Object} props - Component props.
 * @param {Array} props.uniqueParameters - Array of unique parameters to populate the dropdown options.
 * @param {string} props.selectedParameter - Currently selected parameter.
 * @param {function} props.handleChange - Function to handle parameter selection change.
 * @returns {JSX.Element} Parameter selection dropdown menu.
 */
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
