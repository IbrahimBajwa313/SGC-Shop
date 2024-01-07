import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import Head from 'next/head'
import { useState, useEffect, createContext, useContext,oneMinusQty } from 'react'
import Headroom from 'react-headroom'

export const productInfo = createContext();

// using Context api to use functions in other files
export function MyContext() {
  return useContext(productInfo)  
}

// App Function
export default function App({ Component, pageProps }) {


  const [cart, setCart] = useState({})

  // Page will remain same after reload
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
      }
    }
    catch (error) {
      console.error(error)
      localStorage.clear()
    }
  }, [])

  const [subTotal, setSubTotal] = useState(0)

  // Save Cart Function to save the user's activity
  // also calculating subTotal
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))

    // calculating subTotal
    let subT = 0;
    let keys = Object.keys(myCart)

    for (let i = 0; i < keys.length; i++) {
      subT += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subT)

    localStorage.setItem("SubTotal", subT)
  }

  useEffect(() => {
    setSubTotal(localStorage.getItem("SubTotal"));

  }, [])
  // addToCart function to add items into the cart
  const addToCart = (itemCode, name, qty, price, size, variant,img ,description) => {
    let newCart = cart;
    
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { name, qty: 1, price, size, variant , img,description };
    }
    setCart(newCart);
    saveCart(newCart);
  }
   
  
  // oneMinusQty from Cart Function
  const oneMinusQty = (itemCode ) => {

    let newCart = cart;

    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - 1;
    }
    
    // Deleting specified item
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart);
    saveCart(newCart);
  }

  // oneAddQty from Cart Function
  const oneAddQty = (itemCode ) => {

    let newCart = cart;
    
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + 1;
    }
    setCart(newCart);
    saveCart(newCart);
  }

   
  // DeleteQty from Cart Function
  const delQty = (itemCode ) => {

    let newCart = cart;
     
    if (itemCode in cart) { 
      delete newCart[itemCode]
    }
    
    setCart(newCart);
    saveCart(newCart);
  }

  // Clear Cart Function
  const clearCart = () => {
    setCart({})
    saveCart({})
  }


  return (
    <>
      <Head />
      <Headroom >
        <Header cart={cart}/>
      </Headroom>

      <productInfo.Provider className={"dark"} value={{ cart, addToCart, oneMinusQty, clearCart, subTotal,oneAddQty,delQty }}  {...pageProps} >

        <Component />

      </productInfo.Provider>
      {/* <Wrapper> */}
      <Footer />
      {/* </Wrapper> */}

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />

    </>
  )
}
