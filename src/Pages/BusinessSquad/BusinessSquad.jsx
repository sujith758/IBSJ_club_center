import React from 'react'
import Kanban from '../../../components/Kanban/Kanban';
import { SessionProvider } from '../../../components/SessionContext';

const BusinessSquad = () => {
  return (
    <div>
      <SessionProvider>
        <Kanban sessionKey="BusinessSquad" />
      </SessionProvider>
    </div>
  )
}

export default BusinessSquad;