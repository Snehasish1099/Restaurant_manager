import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    open: false,
    result: {}
};
const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        snackbarOpen: (state, action) => {
            state.result = action.payload;
            state.open = true;
        },
        snackbarClose: (state) => {
            state.open = false;
        },
    },
});
export const { snackbarOpen, snackbarClose } = snackbarSlice.actions;
export default snackbarSlice.reducer;