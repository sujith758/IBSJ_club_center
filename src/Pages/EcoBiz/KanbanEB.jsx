import React from "react";
import { SessionProvider } from "../../../components/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanEB = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="EcoBiz" />
      </SessionProvider>
    </div>
  );
};

export default KanbanEB;
