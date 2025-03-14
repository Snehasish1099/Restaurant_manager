import React from 'react'
import { useSelector } from 'react-redux'

const CustomerReview = (props) => {

    const userData = useSelector((state) => state.auth.userDetail)

    return (
        <div className={`customerReviewMain`}>
            <div className={`flex items-center gap-4 border-b-[1px] border-b-[#EBEBEB] p-4`}>
                <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center text-white text-3xl font-bold">
                    {userData?.username?.[0]}
                </div>
                <div className={`flex flex-col items-start`}>
                    <p className={`text-[#434343] text-xl`}>{userData?.username}</p>
                    <p className={`text-[#43434399] text-base`}>{userData?.phone_number}</p>
                </div>
            </div>
        </div>
    )
}

export default CustomerReview