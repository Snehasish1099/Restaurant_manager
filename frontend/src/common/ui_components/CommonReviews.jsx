import React from 'react'
import NoContentPage from '../layout/NoContentPage'
import RatingField from '../formfields/RatingField'

const CommonReviews = (props) => {
    return (
        <div className={`flex flex-col justify-between items-center p-4 bg-white border border-gray-300 shadow-sm rounded-md mb-5`}>
            {props.reviewData && props.reviewData?.length > 0 ?
                <div className={`w-full`}>
                    {props.reviewData?.map((item) =>
                        <div className={`flex flex-col gap-4 border-b-[1px] border-b-[#EBEBEB] p-4 w-full h-full`}>
                            {/*Header section */}
                            <div className={`w-full flex justify-between`}>
                                <div className={`flex items-center justify-start gap-3`}>
                                    <div className={`w-16 h-16`}>
                                        <img src={""} alt="userProfile" />
                                    </div>
                                    <div className={`flex flex-col items-start`}>
                                        <p className={`text-[#434343] text-xl`}>{item?.user?.name}</p>
                                        <p className={`text-[#43434399] text-base`}>{item?.user?.email}</p>
                                        <RatingField
                                            SendRating={true}
                                            size="small"
                                            value={item?.rate}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                                {props.reviewDate === true ?
                                    <div className={`h-full`}>
                                        <p className={`text-[#43434399] text-xs flex items-start mt-1`}>{'01.01.1111'}</p>
                                    </div>
                                    :
                                    null
                                }
                            </div>

                            {/*body section */}
                            <div className={`flex flex-col items-start justify-between gap-6`}>
                                <p className={`text-[#7D7D7D] text-sm`}>{item?.description}</p>
                            </div>
                        </div>)
                    }
                </div>
                :
                <NoContentPage
                    noContentMainDiv={`h-[50vh]`}
                    text2={`There are no reviews`}
                />
            }
        </div>
    )
}

export default CommonReviews