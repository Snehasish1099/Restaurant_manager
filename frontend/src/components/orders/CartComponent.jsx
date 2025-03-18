import React from 'react'
import { LandingPageHooks } from '../../containers/hooks'
import { useSelector } from 'react-redux'
import ButtonField from '../../common/formfields/ButtonField'

const CartComponent = () => {

    const { createOrderApiCall, totalPrice } = LandingPageHooks()

    const orderData = useSelector((state) => state.order)

    return (
        <div>
            {orderData?.items && orderData?.items?.length > 0 &&
                orderData?.items?.map((data, idx) =>
                    <div key={idx} className='flex flex-col gap-2'>
                        <p className='text-base text-blue-700 font-medium'>{data?.item_name}</p>
                        <img src={data?.item_image} alt="img" height={150} width={150} />
                        <p className='text-sm font-medium'>Quantity: {data?.quantity}</p>
                        <p className='text-base font-semibold'>Total Price: {`${data?.quantity} x ${data?.item_price} = Rs. ${data?.quantity * data?.item_price}`}</p>
                        <div className='border'></div>
                    </div>
                )
            }

            {orderData?.items?.length > 0 &&
                <div className='my-4 flex flex-col gap-4 items-end'>
                    <p>Total Billing Price: Rs. {totalPrice}</p>
                    <ButtonField
                        variant={'contained'}
                        onClick={() => createOrderApiCall()}
                        buttonName={"Order"}
                        buttonextracls={`px-2 py-2 text-white !bg-orange-600 text-sm hover:bg-blue-400 hover:text-black`}
                    />
                </div>
            }
        </div>
    )
}

export default CartComponent