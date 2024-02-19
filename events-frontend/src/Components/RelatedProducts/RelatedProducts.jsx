import React from 'react'
import data_product from '../Assets/data'
import Item from '../Item/Item'
import './RelatedProducts.css'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className="relatedproducts-item">
            {data_product.map((item,i)=> {
                return <Item key={i} id={item.id} name={item.name} image={item.image} location_det={item.location_det} date_det={item.date_det}/>
            })}

        </div>
    </div>
  )
}

export default RelatedProducts