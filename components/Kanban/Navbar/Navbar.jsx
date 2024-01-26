import React, { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar(props) {
  const [isEmitting, setIsEmitting] = useState(false);


  const handleResetClick = () => {
    const isConfirmed = window.confirm('Are you sure you want to reset the data?');
    if (isConfirmed) {
      props.resetData();
    }
  };

  const handleEmitNow = () => {
    // Set isEmitting to true to initiate the emitting process
    setIsEmitting(true);
    // Call the emitDataToServer function from props
    props.emitDataToServer();
  };

  useEffect(() => {
    // This useEffect will be triggered when isEmitting changes
    if (isEmitting) {
      setIsEmitting(false);
    }
  }, [isEmitting]);

  return (
    <div className="navbar">
      <h2>Kanban Board</h2>
      <div className="navbar__buttons">
      <button
        onClick={handleResetClick}
        className="reset-button"
        aria-label="Reset Board Data"
      >
        Reset
      </button>
      <button
        onClick={handleEmitNow}
        className="update-button"
        disabled={isEmitting} // Disable the button during emitting process
        aria-label="Emit Now"
      >
        {isEmitting ? "Emitting..." : "Update"}
      </button>
        </div>
    </div>
  );
}
