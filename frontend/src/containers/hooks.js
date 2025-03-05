import { doGetApiCall, doPostApiCall, doPutApiCall } from '../utils/ApiConfig'
import { useDispatch } from 'react-redux'
import { menuGetReducer, orderGetReducer, restaurantGetReducer, singleOrderGetReducer, singleRestaurantReducer } from './reducerSlice'

export const LandingPageHooks = () => {
    const dispatch = useDispatch()

    //------------------------------------------- Restaurants --------------------------------------------

    /**
     * @method GET
     * @description - Gets all the restaurants available
     */
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

    /**
    * @method POST
    * @description - Create new Restaurant data
    */
    const createRestaurantApiCall = async (formData) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/restaurants/`,
            bodyData: {
                name: formData?.name,
                address: formData?.addresss,
                // image: 
            }
        }
        let res = await doPostApiCall(data)
        console.log(res, "# post rest res")
    }

    /**
    * @method PUT
    * @description - Update Restaurant data by id
    */
    const updateRestaurantApiCall = async (formData, id) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/restaurants/${id}/`,
            bodyData: {
                name: formData?.name,
                address: formData?.addresss,
                // image: 
            }
        }
        let res = await doPutApiCall(data)
        console.log(res, "# put rest res")
    }

    /**
     * @method GET
     * @description - Gets restaurant data by id
     */
    const getSingleRestaurantsApiCall = async (id) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/restaurants/${id}/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(singleRestaurantReducer(res?.data))
        } else {
            dispatch(singleRestaurantReducer([]))
        }
    }

    // ------------------------------------------ Menu items ---------------------------------------

    /**
     * @method GET
     * @description - Gets all the menu items available
     */
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

    // ------------------------------------------- Orders ---------------------------------------------

    /**
     * @method GET
     * @description - Gets all the orders
     */
    const getOrdersApiCall = async () => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/orders/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(orderGetReducer(res?.data))
        } else {
            dispatch(orderGetReducer([]))
        }
    }

    /**
    * @method GET
    * @description - Gets order by id
    */
    const getSingleOrdersApiCall = async (id) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/orders/${id}/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(singleOrderGetReducer(res?.data))
        } else {
            dispatch(singleOrderGetReducer(null))
        }
    }

    return {
        getRestaurantsApiCall,
        createRestaurantApiCall,
        updateRestaurantApiCall,
        getSingleRestaurantsApiCall,

        getMenuApiCall,

        getOrdersApiCall,
        getSingleOrdersApiCall,
    }
}