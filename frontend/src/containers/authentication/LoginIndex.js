import React from 'react'
import { AuthHooks } from './hooks'
import LoginPage from '../../components/authentication/Login'
import SnackBarComponent from '../../common/ui_components/SnackBarComponent'

const LoginIndex = () => {

    const {
        handleName,
        handlePassword,
        Login,
    } = AuthHooks()

    return (
        <div>
            <LoginPage
                Login={() => Login()}
                setName={(e) => handleName(e)}
                setPassword={(e) => handlePassword(e)}
            />
            <SnackBarComponent/>
        </div>
    )
}

export default LoginIndex