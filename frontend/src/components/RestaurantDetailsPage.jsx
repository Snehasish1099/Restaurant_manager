import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { LandingPageHooks } from '../containers/hooks'
import CommonDetailsPage from '../common/ui_components/CommonDetailsPage'
import { useSelector } from 'react-redux'

const RestaurantDetailsPage = () => {

  const { getSingleRestaurantsApiCall, postReviewApiCall, getReviewApiCall, writeReview, handleReview } = LandingPageHooks()
  const params = useParams()

  useEffect(() => {
    getSingleRestaurantsApiCall(params?.id)
  }, [params?.id])

  const restaurantDetails = useSelector((state) => state?.dataReducer?.singleRestaurant)
  const reviewDataForRestau = useSelector((state) => state?.dataReducer?.reviews)?.filter((item) => item?.restaurant?.id === parseInt(params?.id))

  return (
    <CommonDetailsPage
      isRestaurant
      details={restaurantDetails}
      dataToMap={restaurantDetails?.menu_items}

      writeReview={writeReview}
      handleReview={handleReview}
      postReviewApiCall={postReviewApiCall}
      getReviewApiCall={getReviewApiCall}
      reviewData={reviewDataForRestau}
      avgRating={reviewDataForRestau?.[0]?.avg_restaurant_rating}
    />
  )
}

export default RestaurantDetailsPage