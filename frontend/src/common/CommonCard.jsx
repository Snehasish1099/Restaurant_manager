import React from 'react'
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material'
import NoContentPage from './layout/NoContentPage';

const CommonCard = (props) => {

    return (
        <div className={`border w-full rounded-md bg-white shadow shadow-gray-500/20 group/item mb-5 duration-500 ${props.extracls} cursor-pointer min-h-[20em]`} onClick={props.cardOnClick}>

            {props.img ? (
                <img src={props.img} alt='img' />
            )
                : props.noContentImg ?
                    <div className={`${props.noContentCls} relative`}>
                        <NoContentPage
                            NoContentMainDiv={`pt-10`}
                            text2={`There are no images`}
                        />
                    </div>
                    :
                    null
            }


            <div className={`flex justify-between items-center px-3 py-3  text-sm relative`}>
                <div className={`flex items-center gap-1`}>
                    <div className={`flex flex-col pr-5`}>
                        <p className={`text-base font-semibold text-black`}>{props.itemName}</p>

                        {props.ratingForItem ? (
                            <div className='flex'>
                                <div className={`flex items-center mr-4`}>
                                    <img src={"ratingicon"} alt='rating icon' height={15} width={15} />
                                    <p className={`pt-1 pl-1  text-[13px] text-[#434343]/[.6]`}>{props.ratingvalue} out of 5</p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className=''>
                    {props.Shareicon && (
                        <img src={"Shareicon"} alt="Shareicon" height={30} width={30} className={`cursor-pointer pl-4`} />
                    )}
                </div>
            </div>

            {props.itemtext ? (
                <div className={`cursor-pointer`}>
                    <Tooltip title={props.text1}>
                        <p className='px-3 pt-2 text-sm font-semibold break-word w-[13em] truncate'>{props.text1}</p>
                    </Tooltip>
                    <Tooltip title={props.text2}>
                        <p className='px-3 pb-2 text-xs truncate break-word text-deepgray-4 w-[10rem]'>{props.text2}</p>
                    </Tooltip>
                </div>
            )
                :
                null
            }

            {props.border ? (
                <div className={`border border-gray-1.1 mt-5`}></div>
            )
                :
                null
            }


            <div className={`px-3 py-3 cursor-pointer`}>
                {props.phone ? (
                    <div className={`flex pb-[4%]`}>
                        <img src={"phone"} alt="phone" />
                        <p className={`pl-2 text-deepgrey-3 text-[13px] `}>{props.phonetext}</p>
                    </div>
                )
                    :
                    null
                }

                <div className={`flex justify-between w-full`}>
                    {props.showamount ? (
                        <>
                            <p className={`text-deepgrey-5 text-lg  ${(props.offerpercentage || props.offerprice) && 'line-through'}`}>{'Rs.'}&nbsp;{props.amount}</p>
                            {props.offerpercentage ?
                                <p className={``}>{'Rs.'}&nbsp;{props.amount}</p>
                                :
                                props.offerprice &&
                                <p className={``}>{'Rs.'}&nbsp;{props.amount}</p>
                            }
                        </>
                    )
                        :
                        null
                    }
                </div>
            </div>
        </div>

    )
}

// eslint-disable-next-line react/no-typos
CommonCard.propTypes = {
    img: PropTypes.bool,
    noContentImg: PropTypes.bool,
    itemName: PropTypes.string,
    ratingForItem: PropTypes.bool,
    ratingvalue: PropTypes.any,
    phone: PropTypes.bool,
    phonetext: PropTypes.string,

}

export default CommonCard