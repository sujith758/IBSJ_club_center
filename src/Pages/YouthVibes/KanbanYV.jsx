import React from "react";
import { SessionProvider } from "../../../components/Kanban/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanYV = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="YouthVibes" />
      </SessionProvider>
    </div>
  );
};

export default KanbanYV;
