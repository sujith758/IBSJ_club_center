import React from "react";
import { Link } from "react-router-dom";

const KanbanCombined = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/kanban/BusinessSquad">Business Squad</Link>
        </li>
        <li>
          <Link to="/kanban/Cognizance">Cognizance</Link>
        </li>
        <li>
          <Link to="/kanban/Communiqa">Communiqa</Link>
        </li>
        <li>
          <Link to="/kanban/EcoBiz">EcoBiz</Link>
        </li>
        <li>
          <Link to="/kanban/Graffiti">Graffiti</Link>
        </li>
        <li>
          <Link to="/kanban/IgnitedMinds">Ignited Minds</Link>
        </li>
        <li>
          <Link to="/kanban/KhelRatna">Khel Ratna</Link>
        </li>
        <li>
          <Link to="/kanban/MarketMavens">Market Mavens</Link>
        </li>
        <li>
          <Link to="/kanban/MoneyMatrix">Money Matrix</Link>
        </li>
        <li>
          <Link to="/kanban/Navrang">Navrang</Link>
        </li>
        <li>
          <Link to="/kanban/Pixels">Pixels</Link>
        </li>
        <li>
          <Link to="/kanban/Prayaas">Prayaas</Link>
        </li>
        <li>
          <Link to="/kanban/Synchronize">Synchronize</Link>
        </li>
        <li>
          <Link to="/kanban/Techno">Techno</Link>
        </li>
        <li>
          <Link to="/kanban/YouthVibes">Youth Vibes</Link>
        </li>
      </ul>
    </div>
  );
};

export default KanbanCombined;
