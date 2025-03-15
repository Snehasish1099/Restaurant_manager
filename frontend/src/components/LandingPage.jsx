import React, { useEffect } from 'react'
import { LandingPageHooks } from '../containers/hooks'
import Banner from './Banner'
import LandingMenuItems from './LandingMenuItems'
import LandingRestaurantPage from './LandingRestaurantPage'
import ContactUs from './ContactUs'

const LandingPage = () => {
  const { getRestaurantsApiCall, getMenuApiCall } = LandingPageHooks()

  useEffect(() => {
    getRestaurantsApiCall()
    getMenuApiCall()
  }, [])

  return (
    <div>
      <Banner/>
      <LandingMenuItems/>
      <LandingRestaurantPage/>
      <ContactUs/>
    </div>
  )
}

export default LandingPage