import { doGetApiCall, doPostApiCall, doPutApiCall } from '../utils/ApiConfig'
import { useDispatch, useSelector } from 'react-redux'
import { menuGetReducer, orderGetReducer, restaurantGetReducer, reviewGetReducer, singleMenuItemReducer, singleOrderGetReducer, singleRestaurantReducer } from './reducerSlice'
import { useLocation, useParams } from 'react-router'
import { useState } from 'react'
import _ from "lodash";
import { addItem, clearOrder } from './orderSlice'
import { snackbarOpen } from './snackbarReducerSlice'

export const LandingPageHooks = () => {
    const dispatch = useDispatch()

    const searchUrl = useLocation()
    const params = useParams()

    const [writeReview, setWriteReview] = useState(false)
    const handleReview = () => {
        setWriteReview(!writeReview)
    }

    const [searchString, setSearchString] = useState("")

    const debounceSearch = _.debounce((data) => {
        setSearchString(data)
    }, 500)

    const handleSearchChange = (e) => {
        debounceSearch(e.target.value)
    }

    //-----------------------------------Functions for storing data for order-------------------------------
    const [count, setCount] = useState(1);

    const increaseCount = () => setCount(count + 1);
    const decreaseCount = () => {
        if (count > 1) setCount(count - 1);
    };

    const foodDetails = useSelector((state) => state?.dataReducer?.menuItem)

    const handleAddToCart = () => {
        const payload = {
            item_id: params?.id,
            item_name: foodDetails?.name,
            item_image: foodDetails?.image,
            item_price: foodDetails?.price,
            quantity: count
        };

        dispatch(addItem(payload));
    };

    const orderData = useSelector((state) => state.order)

    const totalPrice = orderData?.items?.reduce((total, item) => total + parseFloat(item.item_price) * item.quantity,
        0
    );

    const userData = useSelector((state) => state.auth.userDetail)


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
        let data;
        if (searchString) {
            data = {
                url: `${process.env.REACT_APP_BASE_URL}/menu/?search=${searchString}`,
            }
        } else {
            data = {
                url: `${process.env.REACT_APP_BASE_URL}/menu/`,
            }
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

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    /**
     * @method POST
     * @description - Create new orders
     */
    const createOrderApiCall = async () => {
        let data = {
            url: `${process.env.REACT_APP_BASE_URL}/orders/`,
            bodyData: {
                customer: parseInt(localStorage.getItem('userId')),
                delivery_address: orderData?.address !== "" ? orderData?.address : userData?.address,
                items: orderData?.items?.map((item) => {        //  in form of array with objects { item_id: number, quantity: number }
                    return { item_id: item?.item_id, quantity: item?.quantity }
                }),
                total_price: totalPrice,
            }
        }
        let res = await doPostApiCall(data)
        if (res?.status === 201) {
            getOrdersApiCall()
            handleClose()
            dispatch(clearOrder())
            dispatch(snackbarOpen({ alertType: 'success', message: "Your order has been placed successfully" }))
        } else {
            dispatch(snackbarOpen({ alertType: 'error', message: "Error while placing order, please try after some time" }))
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
        if (res?.status === 201) {
            getReviewApiCall()
            setWriteReview(false)
            dispatch(snackbarOpen({ alertType: 'success', message: "Review posted successfully" }))
        } else {
            dispatch(snackbarOpen({ alertType: 'error', message: "Something went wrong while adding review, please try again." }))
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
        handleSearchChange,
        searchString,

        open,
        handleOpen,
        handleClose,
        increaseCount,
        decreaseCount,
        count,
        handleAddToCart,
        totalPrice,
        getOrdersApiCall,
        getSingleOrdersApiCall,
        createOrderApiCall,

        postReviewApiCall,
        getReviewApiCall,
        writeReview,
        handleReview
    }
}