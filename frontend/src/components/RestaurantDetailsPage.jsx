import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { LandingPageHooks } from '../containers/hooks'
import CommonDetailsPage from '../common/ui_components/CommonDetailsPage'
import { useSelector } from 'react-redux'

const RestaurantDetailsPage = () => {

  const { getSingleRestaurantsApiCall, postReviewApiCall, getReviewApiCall } = LandingPageHooks()
  const params = useParams()

  useEffect(() => {
    getSingleRestaurantsApiCall(params?.id)
  }, [params?.id])

  const restaurantDetails = useSelector((state) => state?.dataReducer?.singleRestaurant)

  return (
    <CommonDetailsPage
      isRestaurant
      details={restaurantDetails}
      dataToMap={restaurantDetails?.menu_items}
      postReviewApiCall={postReviewApiCall}
      getReviewApiCall={getReviewApiCall}
    />
  )
}

export default RestaurantDetailsPage