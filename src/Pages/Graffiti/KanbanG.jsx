import React from "react";
import { SessionProvider } from "../../../components/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanG = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="Graffiti" />
      </SessionProvider>
    </div>
  );
};

export default KanbanG;
