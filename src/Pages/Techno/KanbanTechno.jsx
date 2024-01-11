import React from "react";
import { SessionProvider } from "../../../components/Kanban/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanTechno = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="Techno" />
      </SessionProvider>
    </div>
  );
};

export default KanbanTechno;
