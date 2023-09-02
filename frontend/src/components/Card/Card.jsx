import React from 'react'
import "./card.css"

const Card = ({title}) => {
  return (
    <>
      <div className='stockify__home-card'>
        <p class="heading">{title}</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci odio debitis, et facilis enim laudantium esse optio nulla dignissimos incidunt nobis</p>
      </div> 
    </>

  )
}

export default Card