import React from 'react'
import CommonCard from '../common/CommonCard'
import CustomCarousal from '../common/CustomCarousal'
// import biriyani from '../images/biriyani.jpeg'
// import chowmin from '../images/chowmin.jpeg'
// import chicken_tandoori from '../images/chicken_tandoori.jpeg'
// import fried_rice from '../images/fried_rice.jpeg'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import NoContentPage from '../common/layout/NoContentPage'

const LandingMenuItems = () => {
  const navigate = useNavigate()

  // const dummyData = [
  //   {
  //     img: biriyani,
  //     itemName: 'Chicken Biriyani',
  //     price: 200,
  //     restaurant_name: "Utsav",
  //     location: "Hatibagan area, Kolkata-70006, West Bengal"
  //   },
  //   {
  //     img: chowmin,
  //     itemName: 'Mixed Chowmin',
  //     price: 100,
  //     restaurant_name: "New Malancha",
  //     location: "Hatibagan area, Kolkata-70006, West Bengal"
  //   },
  //   {
  //     img: chicken_tandoori,
  //     itemName: 'Chicken Tandoori',
  //     price: 250,
  //     restaurant_name: "Arsalan",
  //     location: "Hatibagan area, Kolkata-70006, West Bengal"
  //   },
  //   {
  //     img: fried_rice,
  //     itemName: 'Fried Rice',
  //     price: 120,
  //     restaurant_name: "Sutanuti Jn.",
  //     location: "Hatibagan area, Kolkata-70006, West Bengal"
  //   },
  //   {
  //     img: biriyani,
  //     itemName: 'Biriyani',
  //     price: 200,
  //   },
  //   {
  //     img: biriyani,
  //     itemName: 'Biriyani',
  //     price: 200,
  //   },
  //   {
  //     img: biriyani,
  //     itemName: 'Biriyani',
  //     price: 200,
  //   },
  //   {
  //     img: biriyani,
  //     itemName: 'Biriyani',
  //     price: 200,
  //   },
  //   {
  //     img: biriyani,
  //     itemName: 'Biriyani',
  //     price: 200,
  //   },
  //   {
  //     img: biriyani,
  //     itemName: 'Biriyani',
  //     price: 200,
  //   },
  //   {
  //     img: biriyani,
  //     itemName: 'Biriyani',
  //     price: 200,
  //   },
  //   {
  //     img: biriyani,
  //     itemName: 'Biriyani',
  //     price: 200,
  //   },
  // ]

  const menuData = useSelector(((state) => state?.dataReducer?.menu))

  return (
    <div className='p-4'>
      <p className='text-2xl font-bold my-3'>{'Food Items that are available for you'}</p>
      {menuData && menuData.length > 0 ?
        <CustomCarousal>
          {menuData?.map((foodName, idx) =>
            <div key={idx}>
              <CommonCard
                extracls={'!w-60 !h-[25rem]'}
                noContentCls={'h-fit'}
                itemName={foodName?.name}
                img={foodName?.image}
                border
                itemtext
                text2={foodName?.description}
                showamount
                amount={foodName?.price}
                ratingForItem
                ratingValue={4.5}
                ratingPrecision={0.1}
                ratingSize={"small"}
                cardOnClick={() => navigate(`/food_item_details/${foodName?.id}`)}
              />
            </div>
          )}
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

export default LandingMenuItems