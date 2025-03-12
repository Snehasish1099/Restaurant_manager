import React, { useState } from 'react'
import ButtonField from '../formfields/ButtonField'
import RatingField from '../formfields/RatingField'
import CommonCard from '../CommonCard'
import { useNavigate } from 'react-router'
import CommonReviews from './CommonReviews'
import CustomCarousal from '../CustomCarousal'
import CustomerReview from './CustomerReview'
import RatingReviewForm from './RatingReviewForm'

const CommonDetailsPage = (props) => {

    const navigate = useNavigate()

    const [writeReview, setWriteReview] = useState(false)
    const handleReview = () => {
        setWriteReview(true)
    }

    return (
        <div className={``}>
            {/* This is the main div of this component  */}
            <div className={`px-[5%]`}>
                <div className={`w-full justify-between items-center py-5`}>
                    <p className={`text-deepgray-5 text-2xl font-bold`}>{props.details?.name}</p>
                    <RatingField
                        size="small"
                        precision={0.1}
                        value={4.5}
                        readOnly={true}
                    />
                </div>
                <div className={`flex w-full justify-between gap-20`}>
                    <div className={`w-1/2 flex flex-col`}>
                        <div className={`w-full h-[20em] flex justify-center items-center border rounded border-slate-600`}>
                            <p className={`text-[2em]`}>{'No Image Available'}</p>
                        </div>
                    </div>

                    <div className={`w-2/5 flex flex-col justify-between`}>
                        {props.isRestaurant ?
                            <div className={`flex flex-col gap-5 mb-10`}>
                                <div className={`flex`}>
                                    <p className={`w-1/3 text-black text-sm`}>{"Address"}</p>
                                    <p className={`w-2/3 text-grey-600 text-sm`}>{props.details?.address}</p>
                                </div>
                                <div className={`flex`}>
                                    <p className={`w-1/3 text-black text-sm`}>{"Phone no."}</p>
                                    <p className={`w-2/3 text-grey-600 text-sm`}>{props.details?.phoneNo}</p>
                                </div>
                                <div className={`flex`}>
                                    <p className={`w-1/3 text-black text-sm`}>{"Email"}</p>
                                    <p className={`w-2/3 text-Active100 text-sm`}>{props.details?.email}</p>
                                </div>
                            </div>
                            :
                            <div className={`flex flex-col gap-5 mb-10`}>
                                <div className={`flex`}>
                                    <p className={`w-1/3 text-black text-sm`}>{"Shop name"}</p>
                                    <p className={`w-2/3 text-blue-600 text-sm underline cursor-pointer`} onClick={() => props.goToShopPageFunc()}>{props.shop?.name}</p>
                                </div>

                                <div className={`flex`}>
                                    <p className={`w-1/3 text-black text-sm`}>{"Shop address"}</p>
                                    <p className={`w-2/3 text-grey-600 text-sm`}>{props.shop?.address}</p>
                                </div>
                            </div>
                        }
                        <div className={`flex flex-col gap-4`}>
                            <div className={`!bg-white p-5 border`}>
                                <p className={`text-base text-black pb-5`}>{"Description"}</p>
                                <p className={`text-sm text-grey-600`}>{props.details?.description ? props.details?.description : "No Description Found"}</p>
                            </div>
                        </div>

                        {!props.isRestaurant &&
                            <ButtonField
                                variant={'outlined'}
                                onClick={props.addToCartClick}
                                buttonName={"Add to Cart"}
                                buttonextracls={`px-2 py-2 text-white ${props.loading === true && 'bg-grey-300'} bg-orange-600 text-sm w-1/2 hover:bg-blue-400 hover:text-black`}
                                loading={props.loading}
                                disabled={props.loading === true ? true : false}
                            />
                        }
                    </div>
                </div>

                {/* Scrollable tabs where cards are called */}
                {props.isRestaurant &&
                    <div>
                        <p className={`text-xl my-[2%]`}>{`We are famous for`}</p>
                        <CustomCarousal>
                            <div className={`flex w-full gap-6`}>
                                {props?.dataToMap?.length > 0 && props?.dataToMap?.map((item, idx) =>
                                    <div key={idx} className={``}>
                                        <CommonCard
                                            extracls={'!w-60 !h-[25rem]'}
                                            // img={item?.image}
                                            noContentImg
                                            itemName={item?.name}
                                            itemtext
                                            text2={item?.address ? item?.address : item?.description ? item?.description : null}
                                            showamount={item?.price ? true : false}
                                            amount={item?.price ? item?.price : null}
                                            ratingForItem
                                            ratingValue={4.5}
                                            ratingPrecision={0.1}
                                            ratingSize={"small"}
                                            cardOnClick={() => navigate(`/food_item_details/${item?.id}`)}
                                        />
                                    </div>
                                )}
                            </div>
                        </CustomCarousal>
                    </div>
                }

                <div className={`border border-b my-10`}></div>

                <div className={`flex justify-between w-full mb-5`}>
                    <div className={`w-1/2`}>
                        <p className={`text-black text-xl mb-4`}>{"Reviews"}</p>
                        <CommonReviews
                            reviewDate={props.reviewDate}
                        // mainDivCls={`flex flex-col justify-between items-center bg-white`}
                        // subDivCls={`px-0 py-6`}
                        />
                    </div>
                    <div className={`w-2/5`}>
                        <p className={`text-black text-xl`}>{"Customer Review"}</p>
                        <CustomerReview details={props.details} />
                        {writeReview === true ?
                            <RatingReviewForm setWriteReview={setWriteReview} />
                            :
                            localStorage?.getItem('token') &&
                            <div className={`cursor-pointer rounded border flex justify-center my-4`}>
                                <ButtonField
                                    buttonName='Write a Review'
                                    buttonextracls={`rounded-md border bg-white py-3 w-full`}
                                    buttonnamecls={`text-sm capitalize`}
                                    outerBtnCls={`w-full`}
                                    onClick={() => handleReview()}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommonDetailsPage