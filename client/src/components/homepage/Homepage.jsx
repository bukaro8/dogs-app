import React from 'react';
import {silenceDog} from '../../assets/images'
import styles from './homepage.module.css'
const Homepage=()=>{
console.log(styles)
  return(
    <div className={styles.container}>
    <div style={{backgroundImage:`url(${silenceDog})`}} className={styles.picture1}></div>
    </div>
)
}

export default Homepage