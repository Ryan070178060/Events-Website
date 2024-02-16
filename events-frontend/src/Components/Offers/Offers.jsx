import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/suti.png'


const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Events For you</h1>
            <p>VIP only</p>
            <button>Check Now</button>
        

        </div>
        <div className="offer-right">
            <img src={exclusive_image} alt="" />
        </div>
    
    </div>
  )
}

export default Offers