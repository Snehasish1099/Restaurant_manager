import React, { useEffect } from 'react'
import Header from '../common/layout/Header'
import Footer from '../common/layout/Footer'
import { LandingPageHooks } from '../containers/hooks'

const LandingPage = () => {
  const { getRestaurantsApiCall, getMenuApiCall } = LandingPageHooks()

  useEffect(() => {
    getRestaurantsApiCall()
    getMenuApiCall()
  }, [])

  return (
    <div>
      <Header />
      LandingPage
      <Footer />
    </div>
  )
}

export default LandingPage