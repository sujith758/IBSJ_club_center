import React from "react";
import { SessionProvider } from "../../../components/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanComm = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="Communiqa" />
      </SessionProvider>
    </div>
  );
};

export default KanbanComm;
