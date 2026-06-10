import React from 'react'
import "./App.css"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useState } from 'react'

const App = () => {
  const[darkMode,setDarkMode] = useState(false)
  const[resetHome,setResetHome] = useState(false)
  const toggleDarkMode = ()=>{
    const newMode = !darkMode
    setDarkMode(newMode);
    document.body.classList.toggle("dark",newMode)
  }
  const handleHome = ()=>{
    setResetHome((prev)=> !prev)
  }
  return (
    <div>
       <Navbar toggleDarkMode={toggleDarkMode}  darkmode={darkMode}  onHomeClick={handleHome} />
      <Home resetHome = {resetHome} />
      
    </div>
  )
}

export default App