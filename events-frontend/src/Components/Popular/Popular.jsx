import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import './Popular.css';


const Popular = () => {

  const [popularProducts,setPopularProducts] = useState([]);

  useEffect(()=>{
    fetch('https://events-website.onrender.com/popularinwomen')
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
  },[])

  return (
    <div className="popular">
        <h1>Popular In Nairobi</h1>
        <hr/>
        <div className="popular-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} location_det={item.location_det} date_det={item.date_det}/>
            })}
            
        </div>

    </div>
  )
}

export default Popular