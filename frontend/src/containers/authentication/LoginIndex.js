import React from 'react'
import { AuthHooks } from './hooks'
import LoginPage from '../../components/authentication/Login'

const LoginIndex = () => {

    const {
        handleName,
        handlePassword,
        loginError,
        Login,
    } = AuthHooks()

    return (
        <LoginPage
            Login={() => Login()}
            setName={(e) => handleName(e)}
            setPassword={(e) => handlePassword(e)}
            loginError={loginError}
        />
    )
}

export default LoginIndex