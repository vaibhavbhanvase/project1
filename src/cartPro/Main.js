import React from 'react'
import { CartProvider } from 'react-use-cart'
import Cart from './component/Cart'
import NavBar from './component/NavBar'

function Main() {
  return (
    <>
      <CartProvider>
        <NavBar />
        <Cart />
      </CartProvider>


    </>
  )
}

export default Main