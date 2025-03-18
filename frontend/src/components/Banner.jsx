import React from 'react'
import foodbanner from '../images/FoodBanner.png'
import TextFieldInput from '../common/formfields/TextFieldInput'
import { SearchOutlined } from '@mui/icons-material'

const Banner = (props) => {

  return (
    <div className='flex justify-center items-center bg-[#343434] relative'>
      <img src={foodbanner} alt="foodbanner" content='fill' />
      <div className='absolute left-36 top-28 flex flex-col items-start justify-start'>
        <p className='text-3xl font-bold text-white text-start w-1/2'>{"Search your favourite food you want to order now!!"}</p>
        <TextFieldInput
          // fullWidth={true}
          startAdornment={<SearchOutlined/>}
          textnewclass={'bg-white w-[20em]'}
          handleChange={props.handleChange}
        />
      </div>
    </div>
  )
}

export default Banner