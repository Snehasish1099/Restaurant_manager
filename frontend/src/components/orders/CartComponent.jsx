import React, { useState } from 'react'
import { LandingPageHooks } from '../../containers/hooks'
import { useDispatch, useSelector } from 'react-redux'
import ButtonField from '../../common/formfields/ButtonField'
import { addItem, removeItem } from '../../containers/orderSlice'

const CartComponent = () => {

    const { createOrderApiCall, totalPrice } = LandingPageHooks()
    const dispatch = useDispatch()

    const orderData = useSelector((state) => state.order)

    const [quantities, setQuantities] = useState(
        orderData.items.reduce((acc, item) => {
            acc[item.item_id] = item.quantity;
            return acc;
        }, {})
    );

    const increaseCount = (item) => {
        const newCount = (quantities[item.item_id] || 1) + 1;
        setQuantities((prev) => ({ ...prev, [item.item_id]: newCount }));

        // Dispatch updated item to Redux store
        dispatch(addItem({ ...item, quantity: newCount }));
    };

    const decreaseCount = (item) => {
        if (quantities[item.item_id] > 1) {
            const newCount = quantities[item.item_id] - 1;
            setQuantities((prev) => ({ ...prev, [item.item_id]: newCount }));

            // Dispatch updated item to Redux store
            dispatch(addItem({ ...item, quantity: newCount }));
        } else {
            // Remove item if quantity becomes 0
            dispatch(removeItem(item.item_id));
            setQuantities((prev) => {
                const newState = { ...prev };
                delete newState[item.item_id];
                return newState;
            });
        }
    };


    return (
        <div>
            {orderData?.items && orderData?.items?.length > 0 &&
                orderData?.items?.map((data, idx) =>
                    <div key={idx} className='flex flex-col gap-2'>
                        <p className='text-base text-blue-700 font-medium'>{data?.item_name}</p>
                        <img src={data?.item_image} alt="img" height={150} width={150} />
                        <p className='text-sm font-medium'>Quantity: {data?.quantity}</p>
                        <p className='text-base font-semibold'>Total Price: {`${data?.quantity} x ${data?.item_price} = Rs. ${data?.quantity * data?.item_price}`}</p>
                        <div className="flex gap-2">
                            <button 
                                className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700'
                                onClick={() => increaseCount(data)}
                            >
                                +
                            </button>
                            <button 
                                className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700'
                                onClick={() => decreaseCount(data)}
                            >
                                -
                            </button>
                        </div>
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