import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    users: [],
    userDetail: {},
    loading: false,
    error: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        allUsersReducer: (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.error = false;
        },
        userDetailsReducer: (state, action) => {
            state.userDetail = action.payload;
            state.loading = false;
            state.error = false;
        },
    }
})

export const { allUsersReducer, userDetailsReducer } = authSlice.actions;
export default authSlice.reducer;