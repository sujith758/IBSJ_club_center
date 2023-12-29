import React from "react";
import { SessionProvider } from "../../../components/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanPix = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="Pixels" />
      </SessionProvider>
    </div>
  );
};

export default KanbanPix;
