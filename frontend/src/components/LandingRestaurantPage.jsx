import React from 'react'
import CommonCard from '../common/CommonCard'
import CustomCarousal from '../common/CustomCarousal'
import biriyani from '../images/biriyani.jpeg'
import chowmin from '../images/chowmin.jpeg'
import chicken_tandoori from '../images/chicken_tandoori.jpeg'
import fried_rice from '../images/fried_rice.jpeg'

const LandingRestaurantPage = () => {

  const dummyData = [
    {
      img: biriyani,
      itemName: 'Chicken Biriyani',
      price: 200,
    },
    {
      img: chowmin,
      itemName: 'Mixed Chowmin',
      price: 100,
    },
    {
      img: chicken_tandoori,
      itemName: 'Chicken Tandoori',
      price: 250,
    },
    {
      img: fried_rice,
      itemName: 'Fried Rice',
      price: 120,
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
      <p className='text-2xl font-bold my-3'>{`Some restaurants recommended for you`}</p>
      <CustomCarousal>
        {dummyData && dummyData.length > 0 && dummyData?.map((foodName, idx) =>
          <div key={idx}>
            <CommonCard
              extracls={'w-full w-fit'}
              img={foodName?.img}
              itemName={foodName?.itemName}
              border
              itemtext
              text1={"Very good"}
              showamount
              amount={foodName?.price}
            />
          </div>
        )}
      </CustomCarousal>
    </div>
  )
}

export default LandingRestaurantPage