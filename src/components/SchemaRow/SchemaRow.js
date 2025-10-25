import React from "react";
import "./SchemaRow.css";

const SchemaRow = ({
  schema,
  index,
  getFilteredOptions,
  handleSchemaChange,
  setSelectedSchemas,
  selectedSchemas,
}) => (
  <div className="schema-row">
    <span
      className={`dot ${schema.type === "user" ? "user-dot" : "group-dot"}`}
    ></span>
    <select
      value={schema.value}
      onChange={(e) => handleSchemaChange(index, e.target.value)}
      className="dropdown"
    >
      {getFilteredOptions(index).map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <button
      className="remove-btn"
      onClick={() =>
        setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index))
      }
    >
      −
    </button>
  </div>
);

export default SchemaRow;
