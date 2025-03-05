import { useState } from "react";
import { useNavigate } from "react-router";
import { doGetApiCall, doPostApiCall } from "../../utils/ApiConfig";
import { useDispatch } from "react-redux";
import { allUsersReducer, userDetailsReducer } from "./authReducer";

export const AuthHooks = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [loginError, setLoginError] = useState({
        code: "",
        error: false,
        message: ""
    })

    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    // Registration API call
    const RegistrationApiCall = async (formData) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/register/`,
            bodyData: {
                username: formData?.userName,
                password: formData?.password,
                phone_number: formData?.phone_number,
                address: formData?.address,
            }
        }
        let res = await doPostApiCall(data)
        // console.log(res, "# res regis")
        if (res?.status === 201) {
            navigate('/login')
        } else {
            console.log("# Registration failed")
        }
    }


    // Login API call 
    const Login = async () => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/login/`,
            bodyData: {
                username: name,
                password: password
            }
        }

        let res = await doPostApiCall(data)
        // console.log(res, '# res login')
        if (res?.status === 200) {
            localStorage.setItem('token', res?.token)
            localStorage.setItem('userId', res?.userId)
            navigate('/')
        } else {
            setLoginError({
                code: "",
                error: true,
                message: "Login Failed"
            })
        }
    }

    /**
     * @method GET
     * @description
     */
    const getAllUsersApiCall = async () => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/users/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(allUsersReducer(res?.data))
        } else {
            dispatch(allUsersReducer([]))
        }
    }

    /**
     * @method GET
     * @description
     */
    const getUserByIdApiCall = async (userId) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/users/${userId}/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(userDetailsReducer(res?.data))
        } else {
            dispatch(userDetailsReducer(null))
        }
    }

    return {
        handleName,
        handlePassword,
        loginError,
        Login,
        // logoutApiCall,
        RegistrationApiCall,

        getAllUsersApiCall,
        getUserByIdApiCall
    }
}