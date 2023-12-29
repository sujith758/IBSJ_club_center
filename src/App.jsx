import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from "react";

import Homepage from "./Pages/Homepage/Homepage";
import DeansCorner from "./Pages/DeansCorner/DeansCorner";
import BusinessSquad from "./Pages/BusinessSquad/BusinessSquad";
import Cognizance from "./Pages/Cognizance/Cognizance";
import Communiqa from "./Pages/Communiqa/Communiqa";
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
      <h1>This is the heading for screens less than 1200 pixels.</h1>
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
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
