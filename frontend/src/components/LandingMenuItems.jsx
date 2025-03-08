import React from 'react'
import CommonCard from '../common/CommonCard'
import CustomCarousal from '../common/CustomCarousal'
import biriyani from '../images/biriyani.jpeg'
import chowmin from '../images/chowmin.jpeg'
import chicken_tandoori from '../images/chicken_tandoori.jpeg'
import fried_rice from '../images/fried_rice.jpeg'
import { useNavigate } from 'react-router'

const LandingMenuItems = () => {
  const navigate = useNavigate()

  const dummyData = [
    {
      img: biriyani,
      itemName: 'Chicken Biriyani',
      price: 200,
      restaurant_name: "Utsav",
      location: "Hatibagan area, Kolkata-70006, West Bengal"
    },
    {
      img: chowmin,
      itemName: 'Mixed Chowmin',
      price: 100,
      restaurant_name: "New Malancha",
      location: "Hatibagan area, Kolkata-70006, West Bengal"
    },
    {
      img: chicken_tandoori,
      itemName: 'Chicken Tandoori',
      price: 250,
      restaurant_name: "Arsalan",
      location: "Hatibagan area, Kolkata-70006, West Bengal"
    },
    {
      img: fried_rice,
      itemName: 'Fried Rice',
      price: 120,
      restaurant_name: "Sutanuti Jn.",
      location: "Hatibagan area, Kolkata-70006, West Bengal"
    },
    {
      img: biriyani,
      itemName: 'Biriyani',
      price: 200,
    },
    {
      img: biriyani,
      itemName: 'Biriyani',
      price: 200,
    },
    {
      img: biriyani,
      itemName: 'Biriyani',
      price: 200,
    },
    {
      img: biriyani,
      itemName: 'Biriyani',
      price: 200,
    },
    {
      img: biriyani,
      itemName: 'Biriyani',
      price: 200,
    },
    {
      img: biriyani,
      itemName: 'Biriyani',
      price: 200,
    },
    {
      img: biriyani,
      itemName: 'Biriyani',
      price: 200,
    },
    {
      img: biriyani,
      itemName: 'Biriyani',
      price: 200,
    },
  ]

  return (
    <div className='p-4'>
      <p className='text-2xl font-bold my-3'>{'Food Items that are available for you'}</p>
      <CustomCarousal>
        {dummyData && dummyData.length > 0 && dummyData?.map((foodName, idx) =>
          <div key={idx}>
            <CommonCard
              extracls={'!w-48'}
              img={foodName?.img}
              itemName={foodName?.itemName}
              border
              itemtext
              text1={foodName?.restaurant_name}
              text2={foodName?.location}
              showamount
              amount={foodName?.price}
              cardOnClick={() => navigate(`/food_item_details/${idx + 1}`)}
              ratingForItem
              ratingValue={4.5}
              ratingPrecision={0.1}
              ratingSize={"small"}
            />
          </div>
        )}
      </CustomCarousal>
    </div>
  )
}

export default LandingMenuItems