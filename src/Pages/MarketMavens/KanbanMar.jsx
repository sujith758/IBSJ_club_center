import React from "react";
import { SessionProvider } from "../../../components/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanMar = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="MarketMavens" />
      </SessionProvider>
    </div>
  );
};

export default KanbanMar;
