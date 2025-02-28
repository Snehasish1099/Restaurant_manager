import React from 'react'
import Register from '../../components/authentication/Register'
import { AuthHooks } from './hooks'

const RegistrationIndex = () => {

  const { RegistrationApiCall } = AuthHooks()

  return (
    <Register
      RegistrationApiCall={RegistrationApiCall}
    />
  )
}

export default RegistrationIndex