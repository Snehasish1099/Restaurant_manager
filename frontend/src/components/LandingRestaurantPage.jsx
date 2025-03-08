import React from 'react'
import CommonCard from '../common/CommonCard'
import CustomCarousal from '../common/CustomCarousal'
// import biriyani from '../images/biriyani.jpeg'
// import chowmin from '../images/chowmin.jpeg'
// import chicken_tandoori from '../images/chicken_tandoori.jpeg'
// import fried_rice from '../images/fried_rice.jpeg'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const LandingRestaurantPage = () => {

  const navigate = useNavigate()

  // const dummyData = [
  //   {
  //     img: biriyani,
  //     itemName: 'Arsalan',
  //     address: "Hatibagan, Kolkata-06, West Bengal",
  //     rating: 5,
  //   },
  //   {
  //     img: chowmin,
  //     itemName: 'Aminia',
  //     address: "Shyambazar, Kolkata-06, West Bengal",
  //     rating: 4.6,
  //   },
  //   {
  //     img: chicken_tandoori,
  //     itemName: 'New Malancha',
  //     address: "Hatibagan, Kolkata-06, West Bengal",
  //     rating: 3.7,
  //   },
  //   {
  //     img: fried_rice,
  //     itemName: 'Sutanuti Jn.',
  //     address: "Hatibagan, Kolkata-06, West Bengal",
  //     rating: 4.4,
  //   },
  // ]

  const restaurantData = useSelector(((state) => state?.dataReducer?.restaurant))

  return (
    <div className='p-4'>
      <p className='text-2xl font-bold my-3'>{`Some restaurants recommended for you`}</p>
      <CustomCarousal>
        {restaurantData && restaurantData.length > 0 && restaurantData?.map((restau, idx) =>
          <div key={idx}>
            <CommonCard
              extracls={'!w-48'}
              // img={restau?.imgage}
              noContentImg={restau?.image ? false : true}
              itemName={restau?.name}
              itemtext
              text2={restau?.address}
              ratingForItem
              ratingValue={restau?.rating ? restau?.rating : 1}
              ratingPrecision={0.1}
              ratingSize={"small"}
              cardOnClick={() => navigate(`/restaurant_details/${restau?.id}`)}
            />
          </div>
        )}
      </CustomCarousal>
    </div>
  )
}

export default LandingRestaurantPage