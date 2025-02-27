import { doGetApiCall } from '../utils/ApiConfig'
import { useDispatch } from 'react-redux'
import { menuGetReducer, restaurantGetReducer } from './reducerSlice'

export const LandingPageHooks = () => {
    const dispatch = useDispatch()

    const getRestaurantsApiCall = async () => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/restaurants/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(restaurantGetReducer(res?.data))
        } else {
            dispatch(restaurantGetReducer([]))
        }
    }

    const getMenuApiCall = async () => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/menu/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(menuGetReducer(res?.data))
        } else {
            dispatch(menuGetReducer([]))
        }
    }

    return {
        getRestaurantsApiCall,
        getMenuApiCall,
    }
}