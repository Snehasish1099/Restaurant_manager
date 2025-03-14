import { doGetApiCall, doPostApiCall, doPutApiCall } from '../utils/ApiConfig'
import { useDispatch } from 'react-redux'
import { menuGetReducer, orderGetReducer, restaurantGetReducer, reviewGetReducer, singleMenuItemReducer, singleOrderGetReducer, singleRestaurantReducer } from './reducerSlice'
import { useLocation, useParams } from 'react-router'
import { useState } from 'react'

export const LandingPageHooks = () => {
    const dispatch = useDispatch()

    const searchUrl = useLocation()
    const params = useParams()

    const [writeReview, setWriteReview] = useState(false)
    const handleReview = () => {
        setWriteReview(!writeReview)
    }

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
    // const createRestaurantApiCall = async (formData) => {
    //     let data = {
    //         url: `${process.env.REACT_APP_BASE_URL}/restaurants/`,
    //         bodyData: {
    //             name: formData?.name,
    //             address: formData?.addresss,
    //             // image: 
    //         }
    //     }
    //     let res = await doPostApiCall(data)
    //     console.log(res, "# post rest res")
    //     if (res?.status === 201) {
    //         getRestaurantsApiCall()
    //     } else {

    //     }
    // }

    /**
    * @method PUT
    * @description - Update Restaurant data by id
    */
    // const updateRestaurantApiCall = async (formData, id) => {
    //     let data = {
    //         url: `${process.env.REACT_APP_BASE_URL}/restaurants/${id}/`,
    //         bodyData: {
    //             name: formData?.name,
    //             address: formData?.addresss,
    //             // image: 
    //         }
    //     }
    //     let res = await doPutApiCall(data)
    //     console.log(res, "# put rest res")
    //     if (res?.status === 201) {
    //         getSingleRestaurantsApiCall(id)
    //         getRestaurantsApiCall()
    //     } else {

    //     }
    // }

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

    /**
   * @method GET
   * @description - Gets menu items by id
   */
    const getMenuByIdApiCall = async (id) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/menu/${id}/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(singleMenuItemReducer(res?.data))
        } else {
            dispatch(singleMenuItemReducer(null))
        }
    }

    // ------------------------------------------- Orders ---------------------------------------------

    const createOrderApiCall = async (formData) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/restaurants/`,
            bodyData: {
                items: formData?.items,
                total_price: formData?.total_price,
                customer: localStorage.getItem('userId')
            }
        }
        let res = await doPostApiCall(data)
        console.log(res, "# post order res")
        if (res?.status === 200) {
            getOrdersApiCall()
        } else {
            
        }
    }

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

    //------------------------------- Reviews ----------------------------------------------

    /**
     * 
     * @param {*} formData 
     * @method POST
     * @description - Create new review
     */
    const postReviewApiCall = async (formData) => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/reviews/`,
            bodyData: {
                "user": parseInt(localStorage.getItem('userId')),
                "rating": parseFloat(formData?.rating),
                "review_text": formData?.writereview,
            }
        }
        if (searchUrl?.pathname?.includes('food_item_details')) {
            data.bodyData.menu_item = parseInt(params?.id)
        } else {
            data.bodyData.restaurant = parseInt(params?.id)
        }
        let res = await doPostApiCall(data)
        if (res?.status === 200) {
            getReviewApiCall()
            setWriteReview(false)
        } else {

        }
    }

    /**
    * 
    * @method GET
    * @description - Gets all the reviews
    */
    const getReviewApiCall = async () => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/reviews/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            dispatch(reviewGetReducer(res?.data))
        } else {
            dispatch(reviewGetReducer([]))
        }
    }

    return {
        getRestaurantsApiCall,
        // createRestaurantApiCall,
        // updateRestaurantApiCall,
        getSingleRestaurantsApiCall,

        getMenuApiCall,
        getMenuByIdApiCall,

        getOrdersApiCall,
        getSingleOrdersApiCall,
        createOrderApiCall,

        postReviewApiCall,
        getReviewApiCall,
        writeReview,
        handleReview
    }
}