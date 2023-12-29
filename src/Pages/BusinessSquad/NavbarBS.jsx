import React from 'react'
import Kanban from '../../../components/Kanban/Kanban'

const NavbarBS = () => {
  return (
    <div>
      <div className='navbar__container'>
        <img src='../Assets/EcoBiz.png' alt='ecobiz logo' />
        <ul className='navbar__list'>
          <li>Home</li>
          <li>Gallery</li>
          <li>Kanban Board</li>
        </ul>
      </div>
    </div>
  )
}

export default NavbarBS;