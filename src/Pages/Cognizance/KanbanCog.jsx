import React from "react";
import { SessionProvider } from "../../../components/Kanban/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanCog = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="Cognizance" />
      </SessionProvider>
    </div>
  );
};

export default KanbanCog;
