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
                    <div className="productdisplay-right-price-old">Ksh {product.old_price}</div>
                    <div className="productdisplay-right-price-new">Ksh {product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight visually knitted pullover shirt with close fitting.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>Add To Cart</button>
                <p className="productdisplay-right-category"><span>Category :</span>Women, T-shirt, Crop top</p>
                <p className="productdisplay-right-category"><span>Tags :</span>Model, Latest</p>
            </div>
        </div>
    );
};

export default ProductDisplay;
