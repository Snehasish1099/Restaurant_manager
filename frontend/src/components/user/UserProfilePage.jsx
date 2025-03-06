import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AuthHooks } from '../../containers/authentication/hooks'

const UserProfilePage = () => {

  const { getUserByIdApiCall } = AuthHooks()

  useEffect(() => {
    getUserByIdApiCall(localStorage.getItem('userId'))
  }, [localStorage.getItem('userId')])


  const userData = useSelector((state) => state.auth.userDetail)

  console.log(userData, "# userData")

  return (
    <div>
      UserProfilePage
    </div>
  )
}

export default UserProfilePage