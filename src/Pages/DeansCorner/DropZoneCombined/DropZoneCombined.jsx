import React from "react";
import "./DropZoneCombined.css";
import { Link } from "react-router-dom";

const DropZoneCombined = ({socketForFiles}) => {
  return (
    <div>
      
      <ul>

        <li>
          <Link to="/files/BusinessSquad">BusinessSquad</Link>
        </li>
        <li>
          <Link to="/files/Cognizance">Cognizance</Link>
        </li>
        <li>
          <Link to="/files/Communiqa">Communiqa</Link>
        </li>
        <li>
          <Link to="/files/EcoBiz">EcoBiz</Link>
        </li>
        <li>
          <Link to="/files/Graffiti">Graffiti</Link>
        </li>
        <li>
          <Link to="/files/IgnitedMinds">IgnitedMinds</Link>
        </li>
        <li>
          <Link to="/files/KhelRatna">KhelRatna</Link>
        </li>
        <li>
          <Link to="/files/MarketMavens">MarketMavens</Link>
        </li>
        <li>
          <Link to="/files/MoneyMatrix">MoneyMatrix</Link>
        </li>
        <li>
          <Link to="/files/Navrang">Navrang</Link>
        </li>
        <li>
          <Link to="/files/Pixels">Pixels</Link>
        </li>
        <li>
          <Link to="/files/Prayaas">Prayaas</Link>
        </li>
        <li>
          <Link to="/files/Synchronize">Synchronize</Link>
        </li>
        <li>
          <Link to="/files/Techno">Techno</Link>
        </li>
        <li>
          <Link to="/files/YouthVibes">YouthVibes</Link>
        </li>
      </ul>
    </div>
  );
};

export default DropZoneCombined;
