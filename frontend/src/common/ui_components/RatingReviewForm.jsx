import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import ButtonField from '../formfields/ButtonField';
import RatingField from '../formfields/RatingField';
import TextFieldInput from '../formfields/TextFieldInput'

const RatingReviewForm = (props) => {

    const {
        handleSubmit,
        control,
        reset
    } = useForm({
        defaultValues: {
            rating: 0,
            writereview: ''
        }
    });

    const onSubmit = (data) => {
        props.setWriteReview(false)
        reset({
            rating: 0,
            writereview: ''
        })
    };

    return (
        <div className={`pt-[4%]`}>
            <form onSubmit={handleSubmit(onSubmit, reset)}>
                <div className={`w-full`}>
                    <div className={`mb-[4%]`}>
                        <p className={`text-base`}>{'Overall rating'}</p>
                        <div className={`border w-full p-5`}>
                            <Controller name={"rating"}
                                control={control}
                                render={({ field: { onChange, value }, formState: { error } }) => {
                                    return (
                                        <RatingField
                                            name="rating"
                                            size='large'
                                            SendRating={true}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                }}
                                rules={{
                                    required: true
                                }}
                            />
                        </div>
                    </div>
                    <div className={`w-full`}>
                        <p className={`text-base`}>{'Write Review'}</p>
                        <Controller name={"writereview"}
                            control={control}
                            render={({ field: { onChange, value }, formState: { error } }) => {
                                return (
                                    <TextFieldInput
                                        textinputname="writereview"
                                        multiline={true}
                                        minRows={8}
                                        onlyValue
                                        textnewclass={`w-full text-sm`}
                                        placeholder='Please write something'
                                        value={(value)}
                                        onChange={onChange}
                                    />
                                )
                            }}
                            rules={{
                                required: true, minLength: 3
                            }}
                        />
                    </div>
                    <div className={`flex justify-end mt-5`}>
                        <ButtonField
                            buttonName={"cancel"}
                            buttonInsidecls={`gap-2`}
                            alt='backArrow'
                            type='reset'
                            buttonextracls={`!px-6 !py-2 !text-black !bg-gray-200 mr-5`}
                            onClick={() => props.setWriteReview(false)}
                        />
                        <ButtonField
                            buttonName={`Post Review`}
                            alt='rightArrow'
                            type='submit'
                            buttonInsidecls={`!flex-row-reverse gap-2 `}
                            buttonextracls={`!px-6 !py-2 !text-white !bg-blue-600`}
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RatingReviewForm