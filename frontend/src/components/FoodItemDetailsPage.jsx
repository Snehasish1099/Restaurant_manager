import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { LandingPageHooks } from '../containers/hooks'
import CommonDetailsPage from '../common/ui_components/CommonDetailsPage'

const FoodItemDetailsPage = () => {

  const { getSingleRestaurantsApiCall, getMenuByIdApiCall, postReviewApiCall, getReviewApiCall } = LandingPageHooks()
  const params = useParams()

  const foodDetails = useSelector((state) => state?.dataReducer?.menuItem)

  useEffect(() => {
    getMenuByIdApiCall(params?.id)
    foodDetails && foodDetails?.restaurant && getSingleRestaurantsApiCall(foodDetails?.restaurant)
  }, [params?.id, foodDetails?.restaurant])

  const restaurantDetails = useSelector((state) => state?.dataReducer?.singleRestaurant)

  const navigate = useNavigate()

  return (
    <CommonDetailsPage
      details={foodDetails}
      shop={restaurantDetails}
      postReviewApiCall={postReviewApiCall}
      getReviewApiCall={getReviewApiCall}
      goToShopPageFunc={() => navigate(`/restaurant_details/${restaurantDetails?.id}`)}
      // addToCartClick={() => }
    />
  )
}

export default FoodItemDetailsPage