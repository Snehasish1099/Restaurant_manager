import React, { useState } from 'react'
import { LandingPageHooks } from '../../containers/hooks'
import { useSelector } from 'react-redux'

const CartComponent = () => {

    const { createOrderApiCall } = LandingPageHooks()

    const orderData = useSelector((state) => state.order)
    // const menuData = 

    return (
        <div>
            CartComponent
        </div>
    )
}

export default CartComponent