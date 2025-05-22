import React from 'react'
import CommonCard from '../common/CommonCard'
import CustomCarousal from '../common/CustomCarousal'
// import biriyani from '../images/biriyani.jpeg'
// import chowmin from '../images/chowmin.jpeg'
// import chicken_tandoori from '../images/chicken_tandoori.jpeg'
// import fried_rice from '../images/fried_rice.jpeg'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import NoContentPage from '../common/layout/NoContentPage'
import { snackbarOpen } from "../containers/snackbarReducerSlice"

const LandingRestaurantPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const restaurantData = useSelector(((state) => state?.dataReducer?.restaurant))

  const visitorNotLoggedIn = () => {
    dispatch(snackbarOpen({ alertType: 'warning', message: "Please Login to access the website" }));
    navigate('/login')
  }

  return (
    <div id="restaurant" className='p-4'>
      <p className='text-xl md:text-2xl font-bold my-3'>{`Some restaurants recommended for you`}</p>
      {restaurantData && restaurantData.length > 0 ?
        <CustomCarousal>
          {restaurantData?.map((restau, idx) =>
            <div key={idx}>
              <CommonCard
                extracls={'!w-60'}
                img={restau?.image}
                noContentImg={restau?.image ? false : true}
                noContentMainDiv="!bg-[#E9E9E9] !mb-5"
                itemName={restau?.name}
                itemtext
                text2={restau?.address}
                ratingForItem
                ratingValue={restau?.rating ? restau?.rating : 4.5}
                ratingPrecision={0.1}
                ratingSize={"small"}
                cardOnClick={() => localStorage?.getItem('token') ? navigate(`/restaurant_details/${restau?.id}`) : visitorNotLoggedIn()}
              />
            </div>)

          }
        </CustomCarousal>
        :
        <NoContentPage
          noContentMainDiv={`h-[40vh] w-full`}
          text1={'Oops!!'}
          text2={"It seems like there are data available"}
          noContent2ndText={'!text-base'}
        />
      }
    </div>
  )
}

export default LandingRestaurantPage