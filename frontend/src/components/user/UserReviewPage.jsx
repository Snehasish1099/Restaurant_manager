import React from 'react'
import RatingField from '../../common/formfields/RatingField'
import NoContentPage from '../../common/layout/NoContentPage'
import noImage from '../../images/No_Image_Available.jpg'
import { Tooltip } from '@mui/material'


const UserReviewPage = (props) => {
    return (
        <div className={`flex flex-col justify-between items-center p-1 bg-white border border-gray-300 shadow-sm rounded-md my-5`}>
            {props.reviewData && props.reviewData?.length > 0 ?
                <div className={`w-full`}>
                    {props.reviewData?.map((item) =>
                        <div className={`flex flex-col gap-4 border-b-[1px] border-b-[#EBEBEB] p-4 w-full h-full`}>
                            {/*Header section */}
                            <div className={`w-full flex flex-col sm:flex-row justify-between`}>
                                <div className={`flex items-center justify-start gap-3`}>
                                    <div className="w-16 h-16 rounded-full border flex items-center justify-center">
                                        <img
                                            src={item?.menu_item && item?.menu_item?.image !== null ? `http://127.0.0.1:8000/${item?.menu_item?.image}`
                                                : item?.restaurant && item?.restaurant?.image !== null ? `http://127.0.0.1:8000/${item?.restaurant?.image}`
                                                    : noImage}
                                            alt="img"
                                            className='w-fit'
                                        />
                                    </div>
                                    <div className={`flex flex-col items-start`}>
                                        <p className={`text-[#434343] text-lg font-semibold`}>{item?.menu_item ? item?.menu_item?.name : item?.restaurant ? item?.restaurant?.name : '--'}&nbsp;<span className='text-xs'>{item?.menu_item ? "(Food)" : item?.restaurant && "(Restaurant)"}</span></p>
                                        <Tooltip title={item?.menu_item ? item?.menu_item?.description : item?.restaurant ? item?.restaurant?.address : '--'}>
                                            <p className={`text-[#43434399] text-sm truncate w-40`}>{item?.menu_item ? item?.menu_item?.description : item?.restaurant ? item?.restaurant?.address : '--'}</p>
                                        </Tooltip>
                                        <RatingField
                                            size="small"
                                            value={item?.rating}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                                <div className={`h-full`}>
                                    <p className={`text-[#43434399] text-xs flex items-start mt-1`}>{new Date(item?.created_at).toLocaleString()}</p>
                                </div>

                            </div>

                            {/*body section */}
                            <div className={`flex flex-col items-start justify-between gap-6`}>
                                <p className={`text-[#7D7D7D] text-sm`}>{item?.review_text}</p>
                            </div>
                        </div>)
                    }
                </div>
                :
                <NoContentPage
                    // noContentMainDiv={`h-[50vh]`}
                    text2={`There are no reviews`}
                />
            }
        </div>
    )
}

export default UserReviewPage