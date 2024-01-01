import React from "react";
import "./Navbar.css";
export default function Navbar(props) {

  const handleResetClick = () => {
    const isConfirmed = window.confirm('Are you sure you want to reset the data?');
    if (isConfirmed) {
      props.resetData();
    }
  };
  return (
    <div className="navbar">
      <h2>Kanban Board</h2>
      <button onClick={handleResetClick} className="reset-button">
        Reset
      </button>
    </div>
  );
}
