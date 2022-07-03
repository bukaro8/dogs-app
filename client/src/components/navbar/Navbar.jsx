import React from 'react';
import SearchBar from '../searchBar/Searchbar.jsx'
import {nav, navbarLeft, navbarRight } from './navbar.module.css'

const Navbar=()=>{

  return(
    <nav className={nav}>
      <div className={navbarLeft}> 
        <h1>Henry Dogs</h1>
      </div>
      <div className={navbarRight}>
        <SearchBar/>
        
      </div>
    </nav>
)
}

export default Navbar