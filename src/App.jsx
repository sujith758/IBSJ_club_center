import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";



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


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}/>
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
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
