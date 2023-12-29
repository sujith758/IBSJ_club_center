import React from 'react'
import Kanban from '../../../components/Kanban/Kanban'
import { Link } from 'react-router-dom';

const NavbarCog = () => {
  return (
    <div>
      <div className='navbar__container'>
        <img src='../Assets/EcoBiz.png' alt='ecobiz logo' />
        <ul className='navbar__list'>
          <li>Home</li>
          <li>Gallery</li>
          <li>
            <Link to='/kanban/session1'>Deans Corner</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavbarCog;