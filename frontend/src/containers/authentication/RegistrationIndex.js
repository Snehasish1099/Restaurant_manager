import React from 'react'
import Register from '../../components/authentication/Register'
import { AuthHooks } from './hooks'
import SnackBarComponent from '../../common/ui_components/SnackBarComponent'

const RegistrationIndex = () => {

  const { RegistrationApiCall } = AuthHooks()

  return (
    <div>
      <Register
        RegistrationApiCall={RegistrationApiCall}
      />
      <SnackBarComponent />
    </div>
  )
}

export default RegistrationIndex