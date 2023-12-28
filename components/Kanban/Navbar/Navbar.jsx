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
      <div>
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          style={{ transition: "all 200ms" }}
          onChange={props.switchTheme}
        />

        <label for="checkbox" class="label">
          <i className="fas fa-moon fa-sm"></i>
          <i className="fas fa-sun fa-sm"></i>
          <div className="ball" />
        </label>
      </div>
      <button onClick={handleResetClick} className="reset-button">
        Reset
      </button>
    </div>
  );
}
