import React from "react";
import { Link } from "react-router-dom";
import "./DeansCorner.css";
const DeansCorner = ({ socketForFiles }) => {
  return (
    <div className="deans-corner">
           <button><Link to="/homepage" className="home-link-dean">Home</Link></button> 

      <div className="deans-main-div">
        <div className="kanban-combined">
        <Link to="/kanbancombined">Kanban Boards</Link>
      </div>
      <div className="document-combined">
        <Link to="/documentupload">Document Zone</Link>
      </div>
      </div>
    </div>
  );
};

export default DeansCorner;
