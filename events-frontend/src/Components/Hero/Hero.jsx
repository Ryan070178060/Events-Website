import React from 'react';
import './Hero.css';
import arrow from '../Assets/arrow.png';

export const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <div>
          <div className="hero-hand-icon">
            <p>Latest</p>
          </div>
          <p>Events</p>
        </div>
        <div className="hero-latest-btn">
          <div>Upcoming Parties</div>
          <img src={arrow} alt="" />
        </div>
      </div>
      <div className="hero-right">
      </div>
    </div>
  );
};

