import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    userDetail: {},
    loading: false,
    error: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getAuthDetails: (state, action) => {
            state.userDetail = action.payload;
            state.loading = true;
            state.error = false;
        },
    }
})

export const { getAuthDetails } = authSlice.actions;
export default authSlice.reducer;