import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { LandingPageHooks } from '../containers/hooks'

const RestaurantDetailsPage = () => {

  const { getSingleRestaurantsApiCall } = LandingPageHooks()
  const params = useParams()

  useEffect(() => {
    getSingleRestaurantsApiCall(params?.id)
  }, [params?.id])

  return (
    <div>RestaurantDetailsPage</div>
  )
}

export default RestaurantDetailsPage