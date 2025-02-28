import React, { useEffect } from 'react'
import Header from '../common/layout/Header'
import Footer from '../common/layout/Footer'
import { LandingPageHooks } from '../containers/hooks'
import Banner from './Banner'
import LandingMenuItems from './LandingMenuItems'
import LandingRestaurantPage from './LandingRestaurantPage'

const LandingPage = () => {
  const { getRestaurantsApiCall, getMenuApiCall } = LandingPageHooks()

  useEffect(() => {
    getRestaurantsApiCall()
    getMenuApiCall()
  }, [])

  return (
    <div>
      <Header />
      <Banner/>
      <LandingMenuItems/>
      <LandingRestaurantPage/>
      <Footer />
    </div>
  )
}

export default LandingPage