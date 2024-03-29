import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'


const Item = (props) => {
  return (
    <div  className='item'>
      <Link to={`/product/${props.id}`}> <img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link> 
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                Location: {props.location_det}
            </div>
            <div className="item-price-old">
                Date: {props.date_det}
            </div>
        </div>
    </div>
  )
}

export default Item