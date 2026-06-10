import React from 'react'
import "./styles/Navbar.css"

const Navbar = ({toggleDarkMode, darkmode, onHomeClick }) => {
  return (
    <div className='navbar'>
      <h1 className='logo' onClick={onHomeClick} >Recipe Finder</h1>
      <button className='darkmode' onClick={toggleDarkMode} >
        {
          darkmode ? "Light Mode" : "Dark Mode"
        }
        </button>
    </div>
  )
}

export default Navbar