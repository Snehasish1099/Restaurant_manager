import React from 'react'
import TextFieldInput from '../common/formfields/TextFieldInput'
import { SearchOutlined } from '@mui/icons-material'
import CustomImageCarousal from '../common/ui_components/CustomImageCarousal'
import foodbanner from '../images/FoodBanner.png'
import foodBanner2 from '../images/foodbanner 2.jpg'
import foodBanner5 from '../images/foodbanner 5.jpg'
import foodBanner3 from '../images/foodbanner3.jpg'
import foodBanner4 from '../images/foodbanner4.jpg'

const Banner = (props) => {
  const images = [
    foodbanner,
    foodBanner5,
    foodBanner2,
    foodBanner3,
    foodBanner4
  ]

  return (
    <div className='flex justify-center items-center bg-[#343434] relative h-[250px] md:h-[350px] lg:h-[500px] overflow-hidden'>
      <div className="absolute inset-0 w-full h-full z-0">
        <CustomImageCarousal
          images={images}
          autoPlay={true}
          interval={3000}
        />
      </div>
      <div className='absolute left-12 top-8 md:left-24 md:top-12 lg:left-36 lg:top-28 flex flex-col items-start justify-start z-10'>
        <p className='text-xl md:text-2xl lg:text-3xl font-bold text-white text-start w-2/3 md:w-1/2'>{"Search your favourite food you want to order now!!"}</p>
        <TextFieldInput
          // fullWidth={true}
          startAdornment={<SearchOutlined />}
          textnewclass={'bg-white w-[15em] md:w-[18em] lg:w-[20em]'}
          handleChange={props.handleChange}
        />
      </div>
    </div>
  )
}

export default Banner