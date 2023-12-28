import React from 'react'
import { SessionProvider } from '../../../components/SessionContext';
import Kanban from '../../../components/Kanban/Kanban';

const Cognizance = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="Cognizance" />
      </SessionProvider>

    </div>
  )
}

export default Cognizance;