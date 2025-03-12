import React from 'react'

const CustomerReview = (props) => {

    return (
        <div className={`customerReviewMain`}>
            <div className={`flex items-center gap-4 border-b-[1px] border-b-[#EBEBEB] p-4`}>
                <div className={`w-16 h-16`}>
                    <img
                        crossOrigin='anonymous'
                        src={null}
                        alt="defaultprofile"
                        className={`w-16 h-16 ${props.dataObject?.logo?.key !== null && 'rounded-full border'}`}
                    />
                </div>
                <div className={`flex flex-col items-start`}>
                    <p className={`text-[#434343] text-xl`}>{'Test name'}</p>
                    <p className={`text-[#43434399] text-base`}>{'+91 9876543210'}</p>
                </div>
            </div>
        </div>
    )
}

export default CustomerReview