import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ClickAwayListener, List, ListItem, ListItemButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CommonDrawer from '../ui_components/CommonDrawer';
import CartComponent from '../../components/orders/CartComponent';
import logo from '../../images/Logo.jpg'
import { LandingPageHooks } from '../../containers/hooks';

const Header = () => {

    const navigate = useNavigate()
    const routeLocation = useLocation()

    const { open, handleOpen, handleClose, } = LandingPageHooks()

    const [openDetails, setOpenDetails] = useState(false)

    const userProfileArr = [
        { name: 'User Profile', link: `/user_profile/${localStorage.getItem('userId')}`, logo: <AccountCircleIcon /> },
    ]

    const activeStyle = {
        backgroundColor: "#E8EFF5",
        fontFamily: 'Roboto-Regular',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '15px',
        margin: '0px',
        padding: '0px',
        paddingRight: '0px',
        color: '#585F71',
        borderRadius: '5px 5px 0px 0px',
    };
    const style = {
        color: '#585F71',
        fontFamily: 'Roboto-Regular',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '15px',
    }

    // Scroll to section when URL hash changes
    useEffect(() => {
        if (routeLocation?.hash) {
            let sectionId = routeLocation?.hash.substring(1); // Removes # from the url path
            let section = document.getElementById(sectionId);

            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [routeLocation]);

    return (
        <div className='bg-gradient-to-r from-red-400 to-blue-400 h-16 w-full flex justify-between items-center px-[3%]'>
            <img src={logo} alt="logo" className='cursor-pointer ' onClick={() => navigate('/')} height={50} width={50} />
            <div className='flex justify-center items-center'>
                <p className={`hidden md:block font-medium text-white text-sm leading-5 capitalize tracking-[0.15px] cursor-pointer hover:underline`} onClick={() => navigate("/#contact")}>{"Help | Contact"}</p>
                <div className={`flex items-center`}>
                    <div className={`hidden md:block border-l mx-5 border-solid border-orange-600 h-6`}></div>
                    <ShoppingCartIcon className='cursor-pointer' onClick={() => handleOpen()} />
                    <div className={`border-l mx-5 border-solid border-orange-600 h-6`}></div>

                    {localStorage.getItem('token') ?
                        <div className={`relative`}>
                            <div className={`flex items-center justify-center gap-4 w-32 cursor-pointer `} onClick={() => setOpenDetails(!openDetails)}>
                                <AccountCircleIcon />
                                <p className={`font-medium text-white text-sm leading-5 cursor-pointer tracking-[0.15px] flex gap-2`}>{"Profile"}</p>
                                <KeyboardArrowUpIcon className={openDetails === true ? null : `rotate-180`} />
                            </div>
                            {openDetails === true ?
                                <ClickAwayListener onClickAway={() => setOpenDetails(false)}>
                                    <div className={`bg-white shadow-md w-32 rounded-b absolute top-11 z-20`}>
                                        <div className={`h-fit overflow-hidden hover:overflow-y-auto`}>
                                            {userProfileArr.map((item, idx) =>
                                                <div
                                                    key={idx}
                                                    onClick={() => setOpenDetails(false)}
                                                >
                                                    <List sx={{ marginBottom: "0.5rem", marginTop: "0", paddingTop: 0, paddingBottom: 0, cursor: "pointer" }} >
                                                        <ListItem disablePadding>
                                                            <Link to={item?.link}
                                                                style={
                                                                    routeLocation?.pathname === item?.link ? activeStyle : style
                                                                }
                                                            >
                                                                <ListItemButton className='!px-2 gap-2 !w-32'>
                                                                    {item?.logo}
                                                                    <p className='text-black text-base'>{item?.name}</p>
                                                                </ListItemButton>
                                                            </Link>

                                                        </ListItem>
                                                    </List>
                                                </div>)
                                            }
                                            <div onClick={() => { localStorage.removeItem('token'); navigate('/login') }} className={`flex items-center gap-2 py-[5%] cursor-pointer px-2`}>
                                                <LogoutIcon />
                                                <p className={`text-black text-sm`}>{"Logout"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </ClickAwayListener>
                                :
                                null
                            }
                        </div>
                        :
                        <div className='flex gap-4'>
                            <div onClick={() => navigate('/register')} className={`font-medium text-white text-sm leading-5 cursor-pointer tracking-[0.15px] flex gap-2 hover:text-red-700`}>
                                <p>{"Register"}</p>
                            </div>
                            <div onClick={() => navigate('/login')} className={`font-medium text-white text-sm leading-5 cursor-pointer tracking-[0.15px] flex gap-2  hover:text-red-700`}>
                                <p>{"Login"}</p>
                            </div>
                        </div>
                    }

                    <CommonDrawer
                        open={open}
                        onClose={handleClose}
                        title="Add to Cart"
                    >
                        <CartComponent />
                    </CommonDrawer>
                </div>
            </div>
        </div>
    )
}

export default Header