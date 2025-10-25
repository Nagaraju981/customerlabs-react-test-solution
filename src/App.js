import React, { useState } from "react";
import "./App.css";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app-container">
      <button className="open-btn" onClick={() => setShowModal(true)}>
        Save segment
      </button>

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
