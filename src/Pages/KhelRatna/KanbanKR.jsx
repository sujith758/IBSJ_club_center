import React from "react";
import { SessionProvider } from "../../../components/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanKR = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="KhelRatna" />
      </SessionProvider>
    </div>
  );
};

export default KanbanKR;
