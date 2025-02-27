import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    customer: [],
    menu: [],
    restaurant: [],
    order: [],
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
        menuGetReducer: (state, action) => {
            state.menu = action.payload;
            state.loading = false;
            state.error = false;
        },
        restaurantGetReducer: (state, action) => {
            state.restaurant = action.payload;
            state.loading = false;
            state.error = false;
        },
        orderGetReducer: (state, action) => {
            state.order = action.payload;
            state.loading = false;
            state.error = false;
        },
    }
})

export const { customerGetReducer, menuGetReducer, restaurantGetReducer, orderGetReducer } = mainSlice.actions;
export default mainSlice.reducer;