import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import star_dull_icon from "../Assets/star_dull_icon.png";
import star_icon from "../Assets/star_icon.png";
import './ProductDisplay.css';

const ProductDisplay = (props) => {
    const { product } = props;
    const {addToCart} = useContext(ShopContext);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-price">
                    <div className="productdisplay-right-price-old">Date {product.date_det}</div>
                    <div className="productdisplay-right-price-new">location {product.location_det}</div>
                </div>
                <div className="productdisplay-right-description">
                    Come celebrate life with us, life os for the living.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Ticket</h1>
                    <div className="productdisplay-right-sizes">
                        <div>R</div>
                        <div>VIP</div>
                        <div>VVIP</div>
                        <div>Boss</div>
                        <div>Bazu</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>Book now</button>
                <p className="productdisplay-right-category"><span>Category :</span>VIP,VVIP, Regular</p>
                <p className="productdisplay-right-category"><span>Tags :</span>Model, Latest</p>
            </div>
        </div>
    );
};

export default ProductDisplay;

