import React, { useState } from "react";
import "./Modal.css";
import BlueBox from "../BlueBox/BlueBox";

const Modal = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [currentSchema, setCurrentSchema] = useState("");

  const schemaOptions = [
    { label: "First Name", value: "first_name", type: "user" },
    { label: "Last Name", value: "last_name", type: "user" },
    { label: "Gender", value: "gender", type: "user" },
    { label: "Age", value: "age", type: "user" },
    { label: "Account Name", value: "account_name", type: "group" },
    { label: "City", value: "city", type: "user" },
    { label: "State", value: "state", type: "user" },
  ];

  const availableOptions = schemaOptions.filter(
    (opt) => !selectedSchemas.some((sel) => sel.value === opt.value)
  );

  const handleAddSchema = () => {
    if (!currentSchema) return;
    const selectedOption = schemaOptions.find(
      (opt) => opt.value === currentSchema
    );
    setSelectedSchemas([...selectedSchemas, selectedOption]);
    setCurrentSchema("");
  };

  const handleSubmit = async () => {
    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };

    try {
      const webhookURL = "https://webhook.site/57193a8e-effd-4a22-b6bd-2cbe1144332e";
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("Segment saved successfully!");
        onClose();
      } else {
        alert("Failed to send data!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending data!");
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Saving Segment</h3>
        </div>

        <div className="modal-body">
          <label className="input-label">Enter the Name of the Segment</label>
          <input
            type="text"
            className="input-field"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />

          <p className="info-text">
            To save your segment, you need to add the schemas to build the query
          </p>

          <div className="legend">
            <span className="dot user-dot"></span> User Traits
            <span className="dot group-dot"></span> Group Traits
          </div>

          <BlueBox
            schemaOptions={schemaOptions}
            selectedSchemas={selectedSchemas}
            setSelectedSchemas={setSelectedSchemas}
            currentSchema={currentSchema}
            setCurrentSchema={setCurrentSchema}
            handleAddSchema={handleAddSchema}
          />
        </div>

        <div className="modal-footer">
          <button className="save-btn" onClick={handleSubmit}>
            Save the Segment
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
