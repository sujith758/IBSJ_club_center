import React from 'react'
import { Link } from 'react-router-dom';

const DeansCorner = ({socketForFiles}) => {
  return (
    <div>
    <Link to="/">Home</Link>
    <Link to='/kanbancombined'>Kanban Boards</Link>
    <Link to='/documentupload'>Document Upload</Link>
   </div>
  )
}

export default DeansCorner;