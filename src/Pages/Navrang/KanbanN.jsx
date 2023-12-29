import React from "react";
import { SessionProvider } from "../../../components/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanN = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="Navrang" />
      </SessionProvider>
    </div>
  );
};

export default KanbanN;
