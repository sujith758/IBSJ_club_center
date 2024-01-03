import React from "react";
import { SessionProvider } from "../../../components/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanMon = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="MoneyMatrix" />
      </SessionProvider>
    </div>
  );
};

export default KanbanMon;
