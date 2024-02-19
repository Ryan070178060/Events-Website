import React, { useState } from 'react';
import upload_area from '../../assets/upload_area.svg';
import './AddProduct.css';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    location_det: "",
    date_det: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    console.log('Submitting product details:', productDetails);
  
    let responseData;
    let product = { ...productDetails };
  
    let formData = new FormData();
    formData.append('product', image);
  
    try {
      const uploadResponse = await fetch('https://events-website.onrender.com/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
  
      responseData = await uploadResponse.json();
      console.log('Response from image upload:', responseData);
  
      if (responseData && responseData.success) {
        product.image = responseData.image_url;
        console.log('Updated product details:', product);
  
        const addProductResponse = await fetch('https://events-website.onrender.com/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
  
        const addProductData = await addProductResponse.json();
        console.log('Response from adding product:', addProductData);
  
        if (addProductData && addProductData.success) {
          alert("Product Added");
        } else {
          alert("Failed to add product");
        }
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      // Handle the error as needed, e.g., display an error message to the user
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };

  return (
    <div className='add-product'>
      <form onSubmit={handleSubmit}>
        <div className="addproduct-itemfield">
          <p>Product title</p>
          <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Date</p>
            <input value={productDetails.date_det} onChange={changeHandler} type="text" name='date_det' placeholder='Type here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Location Details</p>
            <input value={productDetails.location_det} onChange={changeHandler} type="text" name='location_det' placeholder='Type here' />
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
            <option value="women">Events</option>
            <option value="men">Parties</option>
            <option value="kid">Kids Events</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <div className="addproduct-itemfield">
          <button type="submit" className='addproduct-btn'>Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
