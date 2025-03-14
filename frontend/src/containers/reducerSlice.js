import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    customer: [],
    menu: [],
    menuItem: {},
    restaurant: [],
    singleRestaurant: {},
    order: [],
    singleOrder: {},
    reviews: [],
    loading: false,
    error: false,
};

export const mainSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        customerGetReducer: (state, action) => {
            state.customer = action.payload;
            state.loading = false;
            state.error = false;
        },

        // Menu 
        menuGetReducer: (state, action) => {
            state.menu = action.payload;
            state.loading = false;
            state.error = false;
        },
        singleMenuItemReducer: (state, action) => {
            state.menuItem = action.payload;
            state.loading = false;
            state.error = false;
        },

        // Restaurant 
        restaurantGetReducer: (state, action) => {
            state.restaurant = action.payload;
            state.loading = false;
            state.error = false;
        },
        singleRestaurantReducer: (state, action) => {
            state.singleRestaurant = action.payload;
            state.loading = false;
            state.error = false;
        },

        // Order 
        orderGetReducer: (state, action) => {
            state.order = action.payload;
            state.loading = false;
            state.error = false;
        },
        singleOrderGetReducer: (state, action) => {
            state.singleOrder = action.payload;
            state.loading = false;
            state.error = false;
        },

        //Reviews
        reviewGetReducer: (state, action) => {
            state.reviews = action.payload;
            state.loading = false;
            state.error = false;
        }
    }
})

export const { customerGetReducer, menuGetReducer, restaurantGetReducer, orderGetReducer, singleMenuItemReducer, singleOrderGetReducer, singleRestaurantReducer, reviewGetReducer } = mainSlice.actions;
export default mainSlice.reducer;