import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import './NewCollections.css';

const NewCollections = () => {

  const [new_collection,setNew_collection] = useState([]);

  useEffect(()=>{
    fetch('https://events-website.onrender.com/newcollection')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));

  },[])


  return (
    <div className='new_collections'>
        <h1>New Events</h1>
        <hr/>
        <div className="collections">
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} location_det={item.location_det} date_det={item.date_det}/>
            })}

        </div>
    </div>
  )
}

export default NewCollections