import { useState } from "react";
import { useNavigate } from "react-router";
import { doPostApiCall } from "../../utils/ApiConfig";

export const AuthHooks = () => {

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
            navigate('/')
        } else {
            setLoginError({
                code: "",
                error: true,
                message: "Login Failed"
            })
        }
    }

    // const logoutApiCall = async () => {

    //     if (!localStorage.getItem("token")) {
    //         console.error("No token found. User may already be logged out.");
    //         return;
    //     }

    //     let data = {
    //         url: `${process.env.REACT_APP_BASE_URL}/logout/`,
    //         bodyData: null
    //     }
    //     let res = await doPostApiCall(data)
    //     console.log(res, "# logout res")
    // }

    return {
        handleName,
        handlePassword,
        loginError,
        Login,
        // logoutApiCall,
        RegistrationApiCall
    }
}