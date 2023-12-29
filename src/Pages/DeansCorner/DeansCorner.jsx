import React from 'react'
import KanbanCombined from './KanbanCombined/KanbanCombined';
import { Link } from 'react-router-dom';

const DeansCorner = () => {
  return (
    <div>
    <Link to="/">Home</Link>
    <Link to='/kanbancombined'>Kanban Boards</Link>
   </div>
  )
}

export default DeansCorner;