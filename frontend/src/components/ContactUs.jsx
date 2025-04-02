import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import DraftsIcon from '@mui/icons-material/Drafts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneInputField from '../common/formfields/PhoneInputField';
import ButtonField from '../common/formfields/ButtonField';
import TextFieldInput from '../common/formfields/TextFieldInput';
import { Controller, useForm } from 'react-hook-form';


const ContactUS = (props) => {

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data, '# data');
    };

    return (
        <div className={`flex flex-col-reverse md:flex-row text-white border`} id="contact">

            {/* contact left  */}
            <div className={`w-full md:w-1/3 bg-[#000] flex flex-col justify-evenly items-start gap-4 py-[2%] md:py-0 px-[2%]`}>
                {/* contact header  */}
                <div className={`mb-4`}>
                    <p className={`text-white font-bold text-xl md:text-2xl lg:text-4xl`}>Contact Us</p>
                    <p className={`text-[#bbb] font-semibold text-base`}>Want To Get In Touch? We'd Love To Hear From You...</p>
                </div>
                {/* contact body  */}
                <div className={`flex flex-col gap-6`}>
                    <div className={`flex items-start gap-4`}>
                        <CallIcon />
                        <div>
                            <p className='text-[#888]'>Call Us Directly</p>
                            <a href="tel:209-981-0200" className='text-[#ccc] text-lg font-[PoppinsSemibold]'>+91 9876543210</a>
                        </div>
                    </div>

                    <div className={`flex items-start gap-4`}>
                        <DraftsIcon />
                        <div>
                            <p className='text-[#888]'>Email</p>
                            <a href='mailto:info@wallview.net' className='text-[#ccc] text-lg font-[PoppinsSemibold]'>a@a.a</a>
                        </div>
                    </div>

                    <div className={`flex items-start gap-4`}>
                        <LocationOnIcon />
                        <div>
                            <p className='text-[#888]'>Location</p>
                            <p className='text-[#ccc] text-lg font-[PoppinsSemibold]'>Kokata, West Bengal, India</p>
                        </div>
                    </div>
                </div>
                {/* contact footer  */}
                <div className='flex gap-6'>
                    <FacebookIcon />
                    <InstagramIcon />
                    <LinkedInIcon />
                    <TwitterIcon />
                </div>
            </div>

            {/* contact right  */}
            <div className={`w-full md:w-2/3 flex flex-col gap-5 justify-center items-start px-[4%] mb-[3%]`}>
                <p className='text-black font-bold text-xl md:text-2xl lg:text-4xl pt-[4%]'>{"Get In Touch"}</p>
                <form className={`flex flex-col w-full md:w-2/3 gap-5`} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={"name"}
                        control={control}
                        render={({ field: { onChange, value }, formState: { error } }) => {
                            return (
                                (<TextFieldInput
                                    onlyValue
                                    textnewclass={`!w-full text-sm `}
                                    floatingLabel='Name'
                                    value={(value)}
                                    onChange={onChange}
                                />)
                            )
                        }}
                        rules={{
                            required: true, pattern: /^[a-zA-Z][a-zA-Z ]*/i
                        }}
                    />
                    {errors.name && errors.name.type === "required" && (
                        <span className="error-message text-red-400 text-xs">Required</span>
                    )}

                    <Controller
                        name={"email"}
                        control={control}
                        render={({ field: { onChange, value }, formState: { error } }) => {
                            return (
                                (<TextFieldInput
                                    onlyValue
                                    textnewclass={`w-full text-sm `}
                                    floatingLabel='Email'
                                    value={(value)}
                                    onChange={onChange}
                                />)
                            )
                        }}
                        rules={{
                            required: true, pattern: /^[a-zA-Z][a-zA-Z ]*/i
                        }}
                    />
                    {errors.email && errors.email.type === "required" && (
                        <span className="error-message text-red-400 text-xs">Required</span>
                    )}

                    <Controller name={"phone_number"}
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => {
                            return (
                                <PhoneInputField
                                    defaultCountry={'in'}
                                    placeholder={'*Enter Phone no'}
                                    label={'*Enter Phone Number'}
                                    containerClass={'!w-full'}
                                    extraCls={`!w-full text-sm mt-[0.45rem] !text-black`}
                                    inputCls={`!w-full h-[3.3rem] cursor-default`}
                                    onChange={(value) => { onChange(value) }}
                                    value={value}
                                    enableSearch={true}
                                />
                            )
                        }}
                        rules={{
                            required: true,
                            pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
                        }}
                    />
                    {/* phone error msg  */}
                    {errors.phone_number && errors.phone_number.type === "required" && (
                        <span className="error-message text-red-400 text-xs">{"Required"}</span>
                    )}
                    {errors.phone_number && errors.phone_number.type === "pattern" && (
                        <span className="error-message text-red-400 text-xs">{"Wrong Pattern"}</span>
                    )}

                    <Controller
                        name={"desc"}
                        control={control}
                        render={({ field: { onChange, value }, formState: { error } }) => {
                            return (
                                (<TextFieldInput
                                    onlyValue
                                    textnewclass={`w-full text-sm `}
                                    floatingLabel='Description'
                                    value={(value)}
                                    multiline
                                    minRows={5}
                                    onChange={onChange}
                                />)
                            )
                        }}
                        rules={{
                            required: true, pattern: /^[a-zA-Z][a-zA-Z ]*/i
                        }}
                    />
                    {errors.desc && errors.desc.type === "required" && (
                        <span className="error-message text-red-400 text-xs">Required</span>
                    )}

                    <ButtonField
                        type="submit"
                        variant={'contained'}
                        buttonName={"Send"}
                        buttonextracls={`px-2 py-2 text-white ${props.loading === true && 'bg-grey-300'} bg-orange-600 text-sm hover:bg-blue-400 hover:text-black`}
                        onClick={handleSubmit(onSubmit)}
                    />
                </form>
            </div>
        </div>
    )
}

export default ContactUS