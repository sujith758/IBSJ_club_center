import React from "react";
import { SessionProvider } from "../../../components/SessionContext";
import Kanban from "../../../components/Kanban/Kanban";

const KanbanPra = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="Prayaas" />
      </SessionProvider>
    </div>
  );
};

export default KanbanPra;
