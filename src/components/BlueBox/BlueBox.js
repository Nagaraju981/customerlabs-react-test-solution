import React from "react";
import "./BlueBox.css";
import SchemaRow from "../SchemaRow/SchemaRow";

const BlueBox = ({
  schemaOptions,
  selectedSchemas,
  setSelectedSchemas,
  currentSchema,
  setCurrentSchema,
  handleAddSchema,
}) => {
  const availableOptions = schemaOptions.filter(
    (opt) => !selectedSchemas.some((sel) => sel.value === opt.value)
  );

  const getFilteredOptions = (index) => {
    const usedValues = selectedSchemas
      .filter((_, i) => i !== index)
      .map((schema) => schema.value);
    return schemaOptions.filter((opt) => !usedValues.includes(opt.value));
  };

  const handleSchemaChange = (index, newValue) => {
    const newSchemas = [...selectedSchemas];
    const newOption = schemaOptions.find((opt) => opt.value === newValue);
    newSchemas[index] = newOption;
    setSelectedSchemas(newSchemas);
  };

  return (
    <div className="blue-box">
      {selectedSchemas.map((schema, index) => (
        <SchemaRow
          key={index}
          schema={schema}
          index={index}
          getFilteredOptions={getFilteredOptions}
          handleSchemaChange={handleSchemaChange}
          setSelectedSchemas={setSelectedSchemas}
          selectedSchemas={selectedSchemas}
        />
      ))}

      <div className="schema-row">
        <select
          value={currentSchema}
          onChange={(e) => setCurrentSchema(e.target.value)}
          className="dropdown"
        >
          <option value="">Add schema to segment</option>
          {availableOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <button className="add-link" onClick={handleAddSchema}>
        + Add new schema
      </button>
    </div>
  );
};

export default BlueBox;
