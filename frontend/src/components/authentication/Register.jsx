import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import TextFieldInput from '../../common/formfields/TextFieldInput';
import PhoneInputField from '../../common/formfields/PhoneInputField';
import ButtonField from '../../common/formfields/ButtonField';
import { Icon, IconButton, InputAdornment } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import logo from '../../images/Logo.jpg'


const Register = (props) => {

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data, '# data');
    props.RegistrationApiCall(data)
  };

  const [showPassword, setShowPassword] = useState(true)
  const [showCPassword, setShowCPassword] = useState(true)
  const navigate = useNavigate()

  return (
    <div className='w-full flex justify-center items-center'>
      <div className="w-full max-w-lg flex flex-col justify-center items-center bg-white p-5 rounded-lg shadow-md mt-5">
        <img src={logo} alt='logo' onClick={() => navigate('/')} className={`cursor-pointer h-14 w-28`} />
        <h2 className="text-2xl font-bold my-4 text-center">{"Register"}</h2>

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
                    defaultCountry={'in'}
                    placeholder={'*Enter Phone no'}
                    label={'*Enter Phone Number'}
                    containerClass={'w-full'}
                    extraCls={`w-full text-sm mt-[0.45rem]`}
                    inputCls={`w-full h-[3.3rem] cursor-default`}
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

          <div className={`pb-[2%]`}>
            <Controller
              name={"password"}
              control={control}
              rules={{
                minLength: 2,
                maxLength: 30,
                required: true
              }}
              render={({ field: { onChange, value } }) => (
                <TextFieldInput
                  onlyValue
                  textnewclass={`w-full text-sm`}
                  typePassword={showPassword}
                  floatingLabel="Password"
                  onChange={onChange}
                  value={value}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        <Icon className="text-20" color="action" tabIndex={-1}>
                          {showPassword ?
                            <VisibilityOffIcon sx={{ color: '#747774' }} />
                            :
                            <RemoveRedEyeIcon sx={{ color: '#747774' }} />}
                        </Icon>
                      </IconButton>
                    </InputAdornment>}
                />
              )}
            />
            {errors.password && errors.password.type === "required" && (
              <span className={""}>Please enter your password</span>
            )}
          </div>

          <div className={`pb-[2%]`}>
            <Controller
              name={"confirm_pass"}
              control={control}
              rules={{
                required: true,
                validate: (value) => value === getValues("password")
              }}
              render={({ field: { onChange, value } }) => (
                <TextFieldInput
                  onlyValue
                  textnewclass={`w-full text-sm`}
                  floatingLabel="Confirm password"
                  typePassword={showCPassword}
                  onChange={onChange}
                  value={value}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCPassword(!showCPassword)}
                        tabIndex={-1}
                      >
                        <Icon className="text-20" color="action" tabIndex={-1}>
                          {showCPassword ?
                            <VisibilityOffIcon sx={{ color: '#747774' }} />
                            :
                            <RemoveRedEyeIcon sx={{ color: '#747774' }} />}
                        </Icon>
                      </IconButton>
                    </InputAdornment>}
                />
              )}
            />
            {errors.confirm_pass && errors.confirm_pass.type === "validate" && (
              <span className={""}>Doesn't match</span>
            )}
          </div>

          <ButtonField
            type='submit'
            variant={'outlined'}
            buttonName={"Register"}
            buttonextracls={`!px-2 !py-2 !text-white ${props.loading === true && 'bg-grey-300'} !bg-orange-600 !text-sm !w-full hover:!bg-blue-400 hover:!text-black`}
            loading={props.loading}
            disabled={props.loading === true ? true : false}
            onClick={handleSubmit(onSubmit)}
          />
        </form>

        <p className='text-black text-xs'>{"Already have an account?"}&nbsp;<span onClick={() => navigate('/login')} className='text-blue-600 cursor-pointer underline'>{"Login"}</span></p>
      </div>
    </div>
  )
}

export default Register