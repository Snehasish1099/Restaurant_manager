import React from 'react'
import ButtonField from '../../common/formfields/ButtonField'
import { Controller, useForm } from 'react-hook-form';
import TextFieldInput from '../../common/formfields/TextFieldInput';
import PhoneInputField from '../../common/formfields/PhoneInputField';

const EditUserForm = (props) => {

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            userName: props.userData?.username ? props.userData?.username : '',
            phone_number: props.userData?.phone_number ? props.userData?.phone_number : '',
            address: props.userData?.address ? props.userData?.address : ''
        }
    });

    const onSubmit = (data) => {
        props.updateUserByIdApiCall(data, localStorage.getItem('userId'))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
            <div>
                <Controller name={"userName"}
                    control={control}
                    render={({ field: { onChange, value }, formState: { error } }) => {
                        return (
                            (<TextFieldInput
                                onlyValue
                                textnewclass={`w-full text-sm `}
                                floatingLabel='Username'
                                value={(value)}
                                onChange={onChange}
                            />)
                        )
                    }}
                    rules={{
                        required: true, pattern: /^[a-zA-Z][a-zA-Z ]*/i
                    }}
                />
                {errors.userName && errors.userName.type === "required" && (
                    <span className="error-message text-red-400 text-xs">Required</span>
                )}
                {errors.userName && errors.userName.type === "pattern" && (
                    <span className="error-message text-red-400 text-xs">Not Valid</span>
                )}
            </div>

            <div className=''>
                <Controller name={"phone_number"}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                            <PhoneInputField
                                defaultCountry={'us'}
                                placeholder={'*Enter Phone no'}
                                label={'*Enter Phone Number'}
                                containerClass={'!w-full'}
                                extraCls={`!w-full text-sm mt-[0.45rem]`}
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
            </div>

            <div>
                <Controller name={"address"}
                    control={control}
                    render={({ field: { onChange, value }, formState: { error } }) => {
                        return (
                            (<TextFieldInput
                                onlyValue
                                textnewclass={`w-full text-sm `}
                                floatingLabel='Address'
                                value={(value)}
                                onChange={onChange}
                            />)
                        )
                    }}
                    rules={{
                        required: true
                    }}
                />
                {errors.address && errors.address.type === "required" && (
                    <span className="error-message text-red-400 text-xs">Required</span>
                )}
            </div>

            {/* Buttons  */}
            <div className="mt-4 flex justify-end space-x-2">
                <ButtonField
                    variant="outlined"
                    onClick={props.HandleCloseForm}
                    buttonName={'Cancel'}
                    buttonextracls={'!border !border-red-500 !text-red-500'}
                />

                <ButtonField
                    type='submit'
                    variant={'contained'}
                    buttonName={"Update"}
                    buttonextracls={`px-2 py-2 text-white ${props.loading === true && 'bg-grey-300'} bg-orange-600 text-sm w-full hover:bg-blue-400 hover:text-black`}
                    loading={props.loading}
                    disabled={props.loading === true ? true : false}
                    onClick={handleSubmit(onSubmit)}
                />
            </div>

        </form>
    )
}

export default EditUserForm