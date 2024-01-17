import React from "react";
import { HashRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import {io} from 'socket.io-client';
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
import KanbanEB from "./Pages/EcoBiz/KanbanEB";
import DocumentUploadBS from "./Pages/BusinessSquad/DocumentUploadBS";
import DocumentUploadCog from "./Pages/Cognizance/DocumentUploadCog";
import DocumentUploadComm from "./Pages/Communiqa/DocumentUploadComm";
import DocumentUploadEB from "./Pages/EcoBiz/DocumentUploadEB";
import DocumentUploadG from "./Pages/Graffiti/DocumentUploadG";
import DocumentUploadIG from "./Pages/IgnitedMinds/DocumentUploadIG";
import DocumentUploadKR from "./Pages/KhelRatna/DocumentUploadKR";
import DocumentUploadMar from "./Pages/MarketMavens/DocumentUploadMar";
import DocumentUploadMon from "./Pages/MoneyMatrix/DocumentUploadMon";
import DocumentUploadN from "./Pages/Navrang/DocumentUploadN";
import DocumentUploadPix from "./Pages/Pixels/DocumentUploadPix";
import DocumentUploadPra from "./Pages/Prayaas/DocumentUploadPra";
import DocumentUploadSync from "./Pages/Synchronize/DocumentUploadSync";
import DocumentUploadTechno from "./Pages/Techno/DocumentUploadTechno";
import DocumentUploadYV from "./Pages/YouthVibes/DocumentUploadYV";
import DropZoneCombined from "./Pages/DeansCorner/DropZoneCombined/DropZoneCombined";
import FileListPage from "./Pages/DeansCorner/DropZoneCombined/FileListPage";
import EventCalendar from "../components/EventCalendar/EventCalendar";


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
  
  const socketForFiles = io.connect(`http://localhost:3001`);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

 

  return (
    <div>
      <Router>
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
          <Route path="/deanscorner" element={<DeansCorner socketForFiles={socketForFiles} />}/>
          <Route path="/aboutus" element={<AboutUs />}/>
          <Route path="/eventcalendar" element={<EventCalendar />}/>
          <Route path="/Business Squad" element={<BusinessSquad socketForFiles={socketForFiles} sessionKey='BusinessSquad'/>}/>
          <Route path="/Cognizance" element={<Cognizance socketForFiles={socketForFiles} sessionKey='Cognizance'/>}/>
          <Route path="/Communiqa" element={<Communiqa socketForFiles={socketForFiles} sessionKey='Communiqa'/>}/>
          <Route path="/EcoBiz" element={<EcoBiz socketForFiles={socketForFiles} sessionKey='EcoBiz'/>}/>
          <Route path="/Graffiti" element={<Graffiti socketForFiles={socketForFiles} sessionKey='Graffiti'/>}/> 
          <Route path="/Ignited Minds" element={<IgnitedMinds socketForFiles={socketForFiles} sessionKey='IgnitedMinds'/>}/> 
          <Route path="/Khel Ratna" element={<KhelRatna socketForFiles={socketForFiles} sessionKey='KhelRatna'/>}/>
          <Route path="/Market Mavens" element={<MarketMavens socketForFiles={socketForFiles} sessionKey='MarketMavens'/>}/>
          <Route path="/Money Matrix Club" element={<MoneyMatrix socketForFiles={socketForFiles} sessionKey='MoneyMatrix'/>}/>
          <Route path="/Navrang" element={<Navrang socketForFiles={socketForFiles} sessionKey='Navrang'/>}/>
          <Route path="/Pixel Club" element={<Pixels socketForFiles={socketForFiles} sessionKey='Pixels'/>}/>
          <Route path="/Prayaas" element={<Prayaas socketForFiles={socketForFiles} sessionKey='Prayaas'/>}/>
          <Route path="/Synchronize" element={<Synchronize socketForFiles={socketForFiles} sessionKey='Synchronize'/>}/>
          <Route path="/Techno Club" element={<Techno socketForFiles={socketForFiles} sessionKey='Techno'/>}/>
          <Route path="/Youth Vibes" element={<YouthVibes socketForFiles={socketForFiles} sessionKey='YouthVibes'/>}/>
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
          <Route path="/documentupload/BusinessSquad" element={<DocumentUploadBS />}/>
          <Route path="/documentupload/Cognizance" element={<DocumentUploadCog />}/>
          <Route path="/documentupload/Communiqa" element={<DocumentUploadComm />}/>
          <Route path="/documentupload/EcoBiz" element={<DocumentUploadEB />}/>
          <Route path="/documentupload/Graffiti" element={<DocumentUploadG />}/>
          <Route path="/documentupload/IgnitedMinds" element={<DocumentUploadIG />}/>
          <Route path="/documentupload/KhelRatna" element={<DocumentUploadKR />}/>
          <Route path="/documentupload/MarketMavens" element={<DocumentUploadMar />}/>
          <Route path="/documentupload/MoneyMatrix" element={<DocumentUploadMon />}/>
          <Route path="/documentupload/Navrang" element={<DocumentUploadN />}/>
          <Route path="/documentupload/Pixels" element={<DocumentUploadPix />}/>
          <Route path="/documentupload/Prayaas" element={<DocumentUploadPra />}/>
          <Route path="/documentupload/Synchronize" element={<DocumentUploadSync />}/>
          <Route path="/documentupload/Techno" element={<DocumentUploadTechno />}/>
          <Route path="/documentupload/YouthVibes" element={<DocumentUploadYV />}/>
          <Route path="/documentupload" element={<DropZoneCombined socketForFiles={socketForFiles} />}/>
          <Route path="/files/:sessionKey" element={<FileListPage socketForFiles={socketForFiles} />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
