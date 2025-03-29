import React from 'react'
import TextFieldInput from '../common/formfields/TextFieldInput'
import { SearchOutlined } from '@mui/icons-material'
import CustomCarousel from '../common/ui_components/CustomCarousal'
import foodbanner from '../images/FoodBanner.png'
import foodBanner2 from '../images/foodBanner2.jpg'
import foodBanner5 from '../images/foodBanner5.jpg'
import foodBanner3 from '../images/foodBanner3.jpeg'
import foodBanner4 from '../images/foodBanner4.jpeg'

const Banner = (props) => {
  const images = [
    foodbanner,
    foodBanner5,
    foodBanner2,
    foodBanner3,
    foodBanner4
  ]

  return (
    <div className='flex justify-center items-center bg-[#343434] relative h-[500px] overflow-hidden'>
      <div className="absolute inset-0 w-full h-full z-0">
        <CustomCarousel
          images={images}
          autoPlay={true}
          interval={3000}
        />
      </div>
      <div className='absolute left-36 top-28 flex flex-col items-start justify-start z-10'>
        <p className='text-3xl font-bold text-white text-start w-1/2'>{"Search your favourite food you want to order now!!"}</p>
        <TextFieldInput
          // fullWidth={true}
          startAdornment={<SearchOutlined />}
          textnewclass={'bg-white w-[20em]'}
          handleChange={props.handleChange}
        />
      </div>
    </div>
  )
}

export default Banner