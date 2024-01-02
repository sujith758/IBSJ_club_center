import React from "react";
import { SessionProvider } from "../../../components/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanIG = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="IgnitedMinds" />
      </SessionProvider>
    </div>
  );
};

export default KanbanIG;
