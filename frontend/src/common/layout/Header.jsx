import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthHooks } from '../../containers/authentication/hooks'

const Header = () => {

    const navigate = useNavigate()

    // const { logoutApiCall } = AuthHooks()

    return (
        <div className='bg-blue-700 h-10 w-full flex justify-between items-center pl-[4.6%] pr-[5%] '>
            <div>
                <div className={`flex gap-4 items-center cursor-pointer`}>
                    <p className={`font-medium text-white text-xs leading-5 capitalize tracking-[0.15px]`}>{"Help | Contact"}</p>
                </div>
            </div>
            <div className={`flex items-center`}>
                <div className={`border-l mx-5 border-solid border-orange-700 h-6`}></div>
                {localStorage.getItem('token') ?
                    <div onClick={() => {localStorage.removeItem('token'); navigate('/login')}} className={`font-medium text-white text-xs leading-5 cursor-pointer tracking-[0.15px] flex gap-2`}>
                        <p>{"Logout"}</p>
                    </div>
                    :
                    <div className='flex gap-4'>
                        <div onClick={() => navigate('/register')} className={`font-medium text-white text-xs leading-5 cursor-pointer tracking-[0.15px] flex gap-2`}>
                            <p>{"Register"}</p>
                        </div>
                        <div onClick={() => navigate('/login')} className={`font-medium text-white text-xs leading-5 cursor-pointer tracking-[0.15px] flex gap-2`}>
                            <p>{"Login"}</p>
                        </div>
                    </div>
                }
            </div>
        </div>

    )
}

export default Header