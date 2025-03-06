import { useState } from "react";
import { useNavigate } from "react-router";
import { doGetApiCall, doPostApiCall, doPutApiCall } from "../../utils/ApiConfig";
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
            getUserByIdApiCall(res?.userId)
            navigate(`/user_profile/${res?.userId}`)
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
     * @description - gets all the registered data
     */
    const getAllUsersApiCall = async () => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/users/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            const newData = res?.data?.filter((user) => user?.id !== 1)     // To filter the data without admin data, might need to modify further later on
            dispatch(allUsersReducer(newData))
        } else {
            dispatch(allUsersReducer([]))
        }
    }

    /**
     * @method GET
     * @description - gets user details by id
     */
    const getUserByIdApiCall = async (userId) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/users/${userId}/`,
        }
        let res = await doGetApiCall(data)
        console.log(res, '# res')
        if (res?.status === 200) {
            dispatch(userDetailsReducer(res?.data))
        } else {
            dispatch(userDetailsReducer(null))
        }
    }

    /**
     * @method PUT
     * @description - Updates the details of an registered user
     */
    const updateUserByIdApiCall = async (formData, userId) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/users/${userId}/`,
            bodyData: {
                username: formData?.userName,
                phone_number: formData?.phone_number,
                address: formData?.address,
            }
        }
        let res = await doPutApiCall(data)
        if (res?.status === 201) {
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
        getUserByIdApiCall,
        updateUserByIdApiCall
    }
}