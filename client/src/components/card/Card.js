import React from 'react';
import "./Card.css";

export default function Card({ dog, detalle }) {
  
  
  return (
    <div className='card'>
        {
            dog.img ? <img src={dog.img} alt="Dog Picture" /> : null
        }
        <p>{dog.name}</p>
        <p>{dog.temperament}</p>
        <p>{dog.height} Kgs</p>
        {
            detalle ? (<div>
                <p>{dog.weight} centimetros</p>
                <p>{dog.life_span} años de vida aprox.</p>
            </div>
            ) : null
        }
    </div>
  )
}
