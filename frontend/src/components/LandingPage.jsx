import React, { useEffect } from 'react'
import { LandingPageHooks } from '../containers/hooks'
import Banner from './Banner'
import LandingMenuItems from './LandingMenuItems'
import LandingRestaurantPage from './LandingRestaurantPage'
import ContactUs from './ContactUs'

const LandingPage = () => {
  const { getRestaurantsApiCall, getMenuApiCall, handleSearchChange,
    searchString, getOrdersApiCall } = LandingPageHooks()

  useEffect(() => {
    getRestaurantsApiCall()
    getMenuApiCall()
  }, [searchString])

  useEffect(() => {
    localStorage.getItem('token') && getOrdersApiCall()
  }, [])


  return (
    <div>
      <Banner
        handleChange={handleSearchChange}
      />
      <LandingMenuItems />
      <LandingRestaurantPage />
      <ContactUs />
    </div>
  )
}

export default LandingPage