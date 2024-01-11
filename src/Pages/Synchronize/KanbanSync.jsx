import React from "react";
import { SessionProvider } from "../../../components/Kanban/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanSync = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="Synchronize" />
      </SessionProvider>
    </div>
  );
};

export default KanbanSync;
