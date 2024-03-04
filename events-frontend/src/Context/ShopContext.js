import React, { createContext, useEffect, useState } from "react";

export const ShopContext=createContext(null);
const getDefaultCart= () =>{
    let cart= {} ;
    for (let index = 0; index <300+1; index++){
        cart[index]=0;
    }
    return cart;

};
const ShopContextProvider=(props) => {

    const [all_product,setAll_product] = useState([]);
    const [cartItems,setCartItems]= useState(getDefaultCart());

    useEffect(() => {
        fetch('https://events-website.onrender.com/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_product(data))
    
        if (localStorage.getItem('auth-token')) {
            fetch('https://events-website.onrender.com/getcart', {
                method: 'POST',
                headers: {
        Accept: 'application/json', // Corrected Accept header
        'auth-token': `${localStorage.getItem('auth-token')}`,
        'Content-Type': 'application/json',
    },
    body: "", // You might want to send a JSON payload if required
})
.then((response) => response.json())
                .then((data) => setCartItems(data));
        }
    }, [])
    


    const addToCart =(itemId) =>{
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}) );
        if (localStorage.getItem('auth-token')) {
            fetch('https://events-website.onrender.com/addtocart', {
                mode: 'no-cors',
              method: 'POST',
              headers: {
                Accept: 'application/formData',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ itemId: itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
          }
          

    }
    const removeFromCart =(itemId) =>{
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]-1}) )
        if(localStorage.getItem('auth-token')){
            fetch('https://events-website.onrender.com/removefromcart', {
            mode: 'no-cors',
              method: 'POST',
              headers: {
                Accept: 'application/formData',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ itemId: itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));

        }
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.location_det * cartItems[item];
            }
        }
        return totalAmount; // Move this line outside the loop
    };
    
    const getTotalCartItem = () =>{
        let totalItem=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem
    }




    const contextValue = {getTotalCartItem, getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};



    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;