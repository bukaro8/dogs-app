import React from 'react';
import {input, inputContainer, inputLabel} from './searchBar.module.css'
import {BsSearch} from 'react-icons/bs'

const SearchBar =()=>{

  return(
    <div className={inputContainer}>
      <span className={inputLabel}>Find Breed</span>
      <input className={input} type="text" />
      <BsSearch/>
    </div>
)
}

export default  SearchBar