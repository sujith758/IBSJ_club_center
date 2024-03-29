import React from "react";
import { SessionProvider } from "../../../components/Kanban/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanBS = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="BusinessSquad" />
      </SessionProvider>
    </div>
  );
};

export default KanbanBS;
