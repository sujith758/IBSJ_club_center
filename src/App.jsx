import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from "react";
import Homepage from "./Pages/Homepage/Homepage";
import DeansCorner from "./Pages/DeansCorner/DeansCorner";
import BusinessSquad from "./Pages/BusinessSquad/BusinessSquad";
import Cognizance from "./Pages/Cognizance/Cognizance";
import Communiqa from "./Pages/Communiqa/Communiqa";
import EcoBiz from "./Pages/EcoBiz/EcoBiz";
import Graffiti from "./Pages/Graffiti/Graffiti"; 
import IgnitedMinds from "./Pages/IgnitedMinds/IgnitedMinds";
import KhelRatna from "./Pages/KhelRatna/KhelRatna";
import MarketMavens from "./Pages/MarketMavens/MarketMavens"; 
import MoneyMatrix from "./Pages/MoneyMatrix/MoneyMatrix";
import Navrang from "./Pages/Navrang/Navrang";
import Pixels from "./Pages/Pixels/Pixels";
import Prayaas from "./Pages/Prayaas/Prayaas";
import Synchronize from "./Pages/Synchronize/Synchronize";
import Techno from "./Pages/Techno/Techno";
import YouthVibes from "./Pages/YouthVibes/YouthVibes"; 
import Kanban from "../components/Kanban/Kanban";
import AboutUs from "./Pages/Homepage/AboutUs/AboutUs";
import Gallery from "./Pages/Homepage/Gallery/Gallery";
import KanbanCombined from "./Pages/DeansCorner/KanbanCombined/KanbanCombined";
import KanbanBS from "./Pages/BusinessSquad/KanbanBS";
import KanbanCog from "./Pages/Cognizance/KanbanCog";
import KanbanComm from "./Pages/Communiqa/KanbanComm";
import KanbanEB from "./Pages/EcoBiz/KanbanEB"
import KanbanG from "./Pages/Graffiti/KanbanG";
import KanbanIG from "./Pages/IgnitedMinds/KanbanIG"
import KanbanKR from "./Pages/KhelRatna/KanbanKR";
import KanbanMar from "./Pages/MarketMavens/KanbanMar";
import KanbanMon from "./Pages/MoneyMatrix/KanbanMon";
import KanbanN from "./Pages/Navrang/KanbanN";
import KanbanPix from "./Pages/Pixels/KanbanPix";
import KanbanPra from "./Pages/Prayaas/KanbanPra";
import KanbanSync from "./Pages/Synchronize/KanbanSync";
import KanbanTechno from "./Pages/Techno/KanbanTechno";
import KanbanYV from "./Pages/YouthVibes/KanbanYV";

const LargeScreenContent = () => {
  return (
    <div>
      <Homepage />
    </div>
  );
};

const SmallScreenContent = () => {
  return (
    <div>
      <h1>Sorry we are still under development for mobile phones, Kindly use your laptop.</h1>
    </div>
  );
};

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route
            path="/"
            element={
              window.innerWidth >= 1200 ? (
                <LargeScreenContent />
              ) : (
                <SmallScreenContent />
              )
            }
          />
          <Route path="/deanscorner" element={<DeansCorner />}/>
          <Route path="/aboutus" element={<AboutUs />}/>
          <Route path="/businesssquad" element={<BusinessSquad />}/>
          <Route path="/cognizance" element={<Cognizance />}/>
          <Route path="/communiqa" element={<Communiqa />}/>
          <Route path="/ecobiz" element={<EcoBiz />}/>
          <Route path="/graffiti" element={<Graffiti />}/>
          <Route path="/ignitedminds" element={<IgnitedMinds />}/>
          <Route path="/khelratna" element={<KhelRatna />}/>
          <Route path="/marketmavens" element={<MarketMavens />}/>
          <Route path="/moneymatrix" element={<MoneyMatrix />}/>
          <Route path="/navrang" element={<Navrang />}/>
          <Route path="/pixels" element={<Pixels />}/>
          <Route path="/prayaas" element={<Prayaas />}/>
          <Route path="/synchronize" element={<Synchronize />}/>
          <Route path="/techno" element={<Techno />}/>
          <Route path="/youthvibes" element={<YouthVibes />}/>
          <Route path="/kanban/:sessionKey" element={<Kanban />}/>
          <Route path="/gallery" element={<Gallery />}/>
          <Route path="/kanbancombined" element={<KanbanCombined />} />
          <Route path="/kanban/BusinessSquad" element={<KanbanBS />}/>
          <Route path="/kanban/Cognizance" element={<KanbanCog />}/>
          <Route path="/kanban/Communiqa" element={<KanbanComm />}/>
          <Route path="/kanban/EcoBiz" element={<KanbanEB />}/>
          <Route path="/kanban/Graffiti" element={<KanbanG />}/>
          <Route path="/kanban/IgnitedMinds" element={<KanbanIG />}/>
          <Route path="/kanban/KhelRatna" element={<KanbanKR />}/>
          <Route path="/kanban/MarketMavens" element={<KanbanMar />}/>
          <Route path="/kanban/MoneyMatrix" element={<KanbanMon />}/>
          <Route path="/kanban/Navrang" element={<KanbanN />}/>
          <Route path="/kanban/Pixels" element={<KanbanPix />}/>
          <Route path="/kanban/Prayaas" element={<KanbanPra />}/>
          <Route path="/kanban/Synchronize" element={<KanbanSync />}/>
          <Route path="/kanban/Techno" element={<KanbanTechno />}/>
          <Route path="/kanban/YouthVibes" element={<KanbanYV />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
